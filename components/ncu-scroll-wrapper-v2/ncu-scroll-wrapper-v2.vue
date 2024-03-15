<template>
	<!-- 
	 'calc(110vh - 120px)'
	 '82vh'
	 -->
	<swiper 
		class="ncu-scroll-wrapper-v2"
		:vertical="true"
		:style="{
			height: height,
		}"
		@transition="handleScroll"
		@animationfinish="animationfinish">
		<swiper-item>
			<scroll-view
				id="scrollview"
				scroll-y
				enable-flex="true"
				paging-enabled	
				refresher-default-style="none"
				:style="{
					height: height,
				}"
				:scroll-top="scrollTop"
				:refresher-threshold="5000"
				:refresher-enabled="true"
				:refresher-triggered="false"
				@scrolltolower="readyToBottom && $emit('scrolltolower')">
				<div class="content">
					<slot></slot>	
				</div>
			</scroll-view>
		</swiper-item>
	</swiper>
</template>

<script>
	/**
	 * @event {Function()} scrolltoupper 
	 * @event {Function()} scrolltolower
	 */
    export default {
		props: {
			height: {
				type: String,
				default: '96vh'
			},
			threshold: {
				type: Number,
				default: 80,
			},
			transition: {
				type: Boolean,
				default: false
			},
			itemClass: {
				type: String,
				default: 'scroll-item'
			},
			readyToBottom: {
				type: Boolean,
				default: true,
			}
		},
        data() {
            return {
				scrollTop: 0,
				scrollHeight: 0, // 记录上拉或下拉最大高度
				canTrigger: true, // 当正在上拉时下拉，会出现记录下拉高度情况，这种情况下不触发刷新效果
            }
        },
		methods: {
			handleScroll(e) {
				// 注册 transition 事件，在滑动过程中会返回滑动的距离
				this.transition && this.$emit('scroll', e.detail.dy)
				
				if(!this.canTrigger) return
				const height = e.detail.dy
				// 两者乘积为负，说明异号，下拉上拉在同时进行
				if(this.scrollHeight * height < 0) {
					this.canTrigger = false
					return
				}
				this.scrollHeight = Math.abs(this.scrollHeight) > Math.abs(height)
									? this.scrollHeight
									: height
			},
			animationfinish(e) {
				if(this.canTrigger) {
					// 高度小于临界值
					if(Math.abs(this.scrollHeight) >= this.threshold) {
						if(this.scrollHeight > 0) {
							this.$emit('scrolltolower')
						} else {
							this.$emit('scrolltoupper')
						}
					}
				}
				this.canTrigger = true
				this.scrollHeight = 0
				this.transition && this.$emit('scroll', 0)
			},
			scrollToBottom(that) {
				let query = uni.createSelectorQuery();
				query.in(that).selectAll(`.${this.itemClass}`).boundingClientRect();
				query.in(this).select('#scrollview').boundingClientRect();
				query.exec((res) => {
					let mitemHeight = 0;
					res[0].forEach((rect) => mitemHeight = mitemHeight + rect.height + 40)  
					if (mitemHeight > this.scrollTop) {
						this.scrollTop = (mitemHeight + 100)
					}
　　　　			})
			}
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-scroll-wrapper-v2 {
		
	}
	.content {
		vertical-align: top;
	}
</style>



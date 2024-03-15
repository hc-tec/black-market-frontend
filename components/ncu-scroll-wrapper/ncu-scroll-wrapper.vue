<template>
	<!-- 
	 @refresherrefresh="refresherrefresh"
	 @refresherrestore="refresherrestore"
	 @refresherabort="refresherabort"
	 -->
	<view 
		class="ncu-scroll-wrapper"
		:style="_style"
		:class="[soften ? 'soften' : '']">
		<scroll-view 
			scroll-y 
			enable-flex="true"
			paging-enabled	
			refresher-default-style="none"
			:style="{
				height: height,
			}"
			:refresher-threshold="threshold"
			:refresher-enabled="refresherEnabled"
			:refresher-triggered="refresherTriggered"
			@touchstart="touchstart"
			@scrolltolower="$emit('scrolltolower')">
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script>
	import { throttle } from '../../common/func.js'
	import GlobalData from '../../common/global.js'
    export default {
		name: 'ncu-scroll-wrapper',
		props: {
			threshold: {
				type: Number,
				default: () => 45000
			},
			refresherEnabled: {
				type: Boolean,
				default: () => false
			},
			_style: {
				type: String
			},
			height: {
				type: String,
				default: 'calc(96vh - 70px)'
			},
			soften: {
				type: Boolean,
				default: () => true
			},
		},
        data() {
            return {
				refresherTriggered: false,
				_refresherTriggered: false,
				originClientY: 0,
				touchstart: throttle(this._touchstart, 200, true),
            }
        },
		methods: {
			_touchstart(e) {
				
				const query = uni.createSelectorQuery().in(this);
				query.select('.ncu-scroll-wrapper').boundingClientRect(data => {
					// const offsetTop = data.top
					const { pageY } = e.changedTouches[0]
					
					const isSystemInfoExit = GlobalData.systemInfo
					if(!isSystemInfoExit) {
						GlobalData.getSystemInfo()
					}
					const systemInfo = GlobalData.systemInfo
					
					// 判断标签是否位于页面顶部，并且高度小于屏幕高度
					const isMouseYHighThanScreenHeight = (pageY+40) < systemInfo.screenHeight
					// const isMouseYHighThanScreenHeight = this.scrollTop < 30

					if(isMouseYHighThanScreenHeight) {
						this.$emit('change', true)
					} else {
						this.$emit('change', false)
					}
				}).exec();
			},
			refresherrefresh(){
				let _this = this;
				if (_this._refresherTriggered) {
					return;
				}
				_this._refresherTriggered = true;
				//界面下拉触发，triggered可能不是true，要设为true
				if (!_this.refresherTriggered) {
					_this.refresherTriggered = true;
				}
				this.loadStoreData();
			},
			refresherrestore(){
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			refresherabort(){
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			loadStoreData() {
				let _this = this;
				this.listData();
				setTimeout(() => {
					_this.refresherTriggered = false;//触发onRestore，并关闭刷新图标
					_this._refresherTriggered = false;
				}, 10)
			},
			listData() {
				let _this = this;
				//这里是调用后台接口的方法数据
			},
		},
		mounted() {
			
		}

    }
</script>

<style lang="scss" scoped>
	.ncu-scroll-wrapper {
		position: relative;
		
		
		
		// margin-top: 115rpx;
		// position: relative;
	}
	.soften {
		overflow: hidden;
		&::before,
		&::after {
			content: '';
			position: absolute;
			width: 100%;
			left: 0;
			box-shadow: var(--soften-shadow);
			z-index: 1;
		}
		&::before {
			top: 0;
			
		}
		&::after {
			bottom: 0;
		}
	}
</style>



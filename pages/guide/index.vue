<template>
	<div class="guide">
		<swiper
			class="swiper"
			:autoplay="false" 
			:current="activeIndex"
			@change="pageChange"
			>
			<swiper-item>
				<div class="guide-page page-1">
					<div class="guide-image-container">
						<image
							style="height: 60%;width: 75%;top: 50%;left: 50%;transform: translate(-50%, -50%);"
							mode="aspectFill" 
							src="/static/d7d796ef-f688-4359-9fcb-ae5b6733dd82-removebg-preview.png"></image>
						<image 
							style="width: 30%;top: 6%;left: 0;"
							mode="widthFix" 
							src="/static/guide-icon/12808-5-Bdicon_V1.0-msstyle__-removebg-preview.png">
						</image>
						<image
							style="width: 30%;top: 36%;left: 0;"
							mode="widthFix" 
							src="/static/guide-icon/6d32d7a6-ae69-49ca-aa32-f25adac6e1a2-removebg-preview.png">
						</image>
						<image
							style="width: 30%;top: 66%;left: 0;"
							mode="widthFix" 
							src="/static/guide-icon/7a1ca386814e5a569d0016f0e2f684dfdfeea7d20a67439d517fe9855b25c30a-removebg-preview.png">
						</image>
						<image
							style="width: 30%;right:0;top: 6%;"
							mode="widthFix" 
							src="/static/guide-icon/09d8487a-d207-400f-b773-f23c5261938c-removebg-preview.png">
						</image>
						<image
							style="width: 30%;right: 0;top: 36%;"
							mode="widthFix" 
							src="/static/guide-icon/38544c5e-1ebc-4a9b-8a1f-fc3af1f4a290-removebg-preview.png">
						</image>
						<image
							style="width: 30%;right: 0;top: 66%;"
							mode="widthFix" 
							src="/static/guide-icon/b77fb9da-becc-4215-b672-bea72564c14f-removebg-preview.png">
						</image>
						
						
					</div>
					<div class="guide-info" style="padding-top: 5px;">
						<div class="guide-title">
							<p>校园 Compus</p>
							<p>二手商城 Mall</p>
						</div>
						<div class="guide-intro">创造自己的校园生活</div>
						<ncu-button
							style="margin-top: 20px;float: right;"
							bgImage="black"
							shadow
							@click="nextGuide">
							下一步
							<span class="cuIcon-right">
							</span>
						</ncu-button>
					</div>	
				</div>
			</swiper-item>
			<swiper-item v-for="item in guideList" :key="item.img">
				<div class="guide-page page-2">
					<image 
						class="guide-image"
						mode="aspectFill" 
						:src="item.img"></image>
					<div class="guide-info">
						<div class="guide-title">
							<p>{{ item.title_1 }}</p>
							<p>{{ item.title_2 }}</p>
						</div>
						<div class="guide-intro">{{ item.intro }}</div>
						<ncu-button
							style="margin-top: 20px;float: right;"
							bgImage="black"
							shadow
							@click="nextGuide">
							{{ item.btnText }}
						</ncu-button>
					</div>	
				</div>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	export default {
	    data() {
	        return {
				activeIndex: 0,
				guideList: [
					{
						img: '/static/00038-992455206.png',
						title_1: '闲置物品',
						title_2: '快速上传',
						intro: '上传到自己的摊位里叭',
						btnText: '下一步',
					},
					{
						img: '/static/00505-sd_xl_refiner_1.0Champagne_gold_paper_data_icon,many_details,_octane_render,_transparent_glass_texture,frosted_glass,_transparent_technology_sens.png',
						title_1: '用户体验',
						title_2: 'AI赋能',
						intro: '给你最棒的用户体验',
						btnText: '下一步',
					},
					{
						img: '/static/5744835e-bf6f-4169-9bdc-91367c109c19.png',
						title_1: '校园热点',
						title_2: '都在论坛',
						intro: '发现与你同频的校园生活',
						btnText: '进入校园商城',
					},
					
				]
			}
		},
		methods: {
			pageChange(e) {
				this.activeIndex = e.detail.current			
			},
			nextGuide() {
				if (this.activeIndex < this.guideList.length) {
					this.activeIndex++
				} else {
					this.toMall()
				}
			},
			toMall() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		background-color: rgb(206,210,216);
		height: 100vh;
		
	}
	uni-swiper-item {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.guide-page {
		height: 100%;
		width: 100%;
		overflow: hidden;
		background-color: rgba(255, 255, 255, .65);
		// filter: blur(20px);
		backdrop-filter: blur(30px);
		box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
		// border-radius: 6%;
	}
	.guide-image {
		width:100%;
		height: 60%;
		margin-bottom: 15%;
		transform: translateX(40px) scale(1.3);
	}
	.guide-image-container {
		width:100%;
		height: 69%;
		background-color: rgb(181,196,222);
		position: relative;
		uni-image:not(:first-child) {
			position: absolute;
			animation: bounce-down 5s ease-in-out infinite;
		}
		@for $i from 2 through 6 {
		  uni-image:nth-child(#{$i}) {
		    animation-delay: $i * 0.3s;
		  }
		}
	}
	.guide-info {
		padding: 20px 30px;
	}
	.guide-title {
		font-size: 2.6rem;
		font-weight: bolder;
		font-family: HanYiQiHei;
		color: rgb(45,45,43);
		line-height: 48px;
	}
	.guide-intro {
		margin-top: 20px;
		font-size: 1.1rem;
		color: rgb(120,120,120);
		font-family: "宋体";
	}
	.page-1 {
		
		// color: rgba(255, 255, 255, 0.75);
	}
</style>
<template>
	<div 
		class="chat">
		<div 
			class="chat-bg"
			:style="{
				backgroundPosition: getPosition
			}">
			
		</div>
		<ncu-tabbar 
			ref="tabbar"
			:menuItems="tabbarMenuItems"
			:active="activeIndex"
			:percent="scrollPercent"
			@click="menuClick">
			<div class="ncu-search-content">
				<light-input
					class="ncu-search__input"
					placeholder="搜索"
					confirm-type="search"
					v-model="searchWords"
					@click="toSearch">
					<div
						slot="suffix"
						class="cuIcon-search">
					</div>
				</light-input>
			</div>
		</ncu-tabbar>
		
		<swiper
			class="swiper"
			:autoplay="false" 
			:current="getActiveIndex"
			@change="pageChange"
			@transition="handleScroll"
			@animationfinish="animationfinish"
			>
			<swiper-item>
				<chatList ref="chatList" v-if="loadCompMap[0]" />
			</swiper-item>
			<swiper-item>
				<friends 
					v-if="loadCompMap[1]"
					@toChatRoom="toChatRoom" />
			</swiper-item>
			
			<!-- <swiper-item>
				<person />
			</swiper-item> -->
		</swiper>
		
	</div>
</template>

<script>
	import chatList from './chatList'
	import friends from './friends'
	import globalData from '../../common/global.js'
    export default {
		components: {
			chatList,
			friends
		},
        data() {
            return {
				activeIndex: 0,
				scrollPercent: 0,
				screenWidth: null,
				searchWords: '',
				tabbarMenuItems: [
					{
						text: '消息',
					},
					{
						text: '好友',
					}
				],
				loadCompMap: {},
            }
        },
		computed: {
			getPosition() {
				const dis = 156 + 79
				if(this.activeIndex === 0) {
					return `${-79 + dis*this.scrollPercent}%`
				}
				return `${156 + dis*this.scrollPercent}%`
				
			},
			getActiveIndex() {
				return this.activeIndex
			},
		},
		methods: {
			pageChange(e) {
				this.loadCompMap[this.activeIndex] = 1
			},
			menuClick(index) {
				// this.activeIndex = index
			},
			toSearch() {
				setTimeout(() => {
					this.searchWords = ""
				}, 2000)
				uni.navigateTo({
					url: "/pages/chat/search"
				})
			},
			handleScroll(e) {
				const dis = e.detail.dx
				this.scrollPercent = dis / this.screenWidth
			},
			animationfinish(e) {
				this.activeIndex = e.detail.current
				this.scrollPercent = 0
			},
			toChatRoom(item) {
				this.$refs.chatList.toChatRoom(item)
			}
		},
		created() {
			this.loadCompMap[this.getActiveIndex] = 1
			globalData.getSystemInfo()
			this.screenWidth = globalData.systemInfo.screenWidth
		}
    }
</script>

<style lang="scss">
	.chat {
		position: relative;
		
		&-bg {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			opacity: .5;
			background-image: url(http://neumorphic.cn/static/a82c9435-038a-49fe-817b-71adb9556585.png);
				background-size: 162%;
				background-repeat: no-repeat;
				background-position: -79%;
		}
		
		.swiper {
			width: 100%;
			height: calc(100vh - 120px);
		}
		.ncu-search {
			&-content {
				padding: 0 0 10px 0;
				margin: 0 10px;
			}
			&__input {
				[class~=light-input] {
					opacity: .6;
					padding: 8px 40px !important;
					background-color: var(--main-bg-color) !important;
				}
			}
		}
		.cuIcon-search {
			position: absolute;
			left: 17px;
			top: 50%;
			font-size: 1.2em;
			transform: translateY(-50%);
			color: var(--main-light-color);
		}
	}
</style>



<template>
	<div class="container">
		
		<ncu-tabbar
			ref="tabbar"
			:menuItems="tabbarMenuItems"
			:active="tabbarActiveIndex"
			:percent="scrollPercent"
			@click="navItemClick">
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
				<mall v-if="loadCompMap[0]" />
			</swiper-item>
			<swiper-item>
				<shop v-if="loadCompMap[1]" />
			</swiper-item>
			<swiper-item>
				<forum v-if="loadCompMap[2]" />
			</swiper-item>
			<swiper-item>
				<person v-if="loadCompMap[3]" />
			</swiper-item>
		</swiper>
		<!-- <ncu-circle-nav 
			ref="navMenu"
			:navList="navMenu"
			:initActiveIndex="initActiveIndex()"
			@navItemClick="navItemClick">
		</ncu-circle-nav> -->
	</div>
</template>

<script>
	import mall from '../mall/index'
	import shop from '../shop/index.vue'
	import forum from '../forum/index'
	import person from '../person/index'
	import globalData from '../../common/global.js'
	import { autoLogin_api } from '../../common/api.js'
	import { httpGet } from '../../common/http.js'
    export default {
		components: {
			mall,
			shop,
			forum,
			person,
		},
        data() {
            return {
				tabbarActiveIndex: 0,
				scrollPercent: 0,
				screenWidth: null,
				tabbarMenuItems: [
					{
						href: 'mall',
						text: '商城'
					},
					{
						href: 'shop',
						text: '摊位'
					},
					{
						href: 'forum',
						text: '论坛'
					},
					{
						href: 'person',
						text: '我的'
					},
				],
				loadCompMap: {},
				globalData: globalData,
				isLoading: false,
			}
        },
		computed: {
			getActiveIndex() {
				let activeIndex = 0
				try {
					this.tabbarMenuItems.forEach((item, i) => {
						if(item.href === globalData.activeItem) {
							activeIndex = i
							this.loadCompMap[activeIndex] = 1
							throw new Error("")
						}
					})
				} catch {}
				this.loadCompMap[0] = 1
				return activeIndex
			}
		},
		methods: {
			handleScroll(e) {
				const dis = e.detail.dx
				this.scrollPercent = dis / this.screenWidth
			},
			animationfinish(e) {
				this.tabbarActiveIndex = e.detail.current
				this.scrollPercent = 0
			},
			navItemClick(index) {
				globalData.activeItem = this.tabbarMenuItems[index].href
			},

			async autoLogin() {
				if(!globalData.userInfo.isLogin) {
					this.isLoading = true
					let res, err
					try {
						[res, err] = await httpGet(autoLogin_api)
					
						setTimeout(() => {
							this.isLoading = false
						}, 2000)
						
						if(res.data?.detail) {
							setTimeout(() => {
								uni.showToast({
									title: '登录状态过期',
									duration: 3000,
									icon: 'none'
								})
							}, 1000)
							
							uni.redirectTo({
								url: '/pages/login/index'
							})
							return
						}
						
						globalData.userInfo = res.data[0]
						globalData.userInfo['isLogin'] = true
						globalData.focusUserInfo = {}
						
						globalData.login.noticeWatcher()
					} catch(e) {
						uni.showToast({
							title: '网络错误',
							duration: 5000,
							icon: 'error'
						})
						this.isLoading = false
						return
					}
				}
				
			},
			pageChange(e) {
				const activeIndex = e.detail.current				
				globalData.activeItem = this.tabbarMenuItems[activeIndex].href
			}
		},
		created() {
			this.tabbarActiveIndex = this.getActiveIndex
			this.autoLogin()
			globalData.getSystemInfo()
			this.screenWidth = globalData.systemInfo.screenWidth
		}
    }
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
	}
	.swiper {
		height: 88%;
	}
</style>



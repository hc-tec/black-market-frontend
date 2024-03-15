<template>
	<div class="ncu-mall">
		
		<!-- <ncu-custom-header
			:title="mallTitle"
			bgColor="transparent">
			<div 
				class="nav-bar-left" 
				slot="left"
				@click="schoolZoneItem.open=true">
				<span class="cuIcon-locationfill"></span>
				{{ schoolZones[goodsSchoolZone-1].label }}
			</div>
		</ncu-custom-header> -->
		
		<ncu-scroll-wrapper-v2
			height="calc(96vh - 100px)"
			@scrolltolower="getGoods(curPage)"
			@scrolltoupper="flushGoods">
			<!-- <div class="ncu-scroll-items-wrapper animate-move-in">
				<ncu-dance-words 
					words="Welcome"
					style="text-align: center;">
				</ncu-dance-words>
				<ncu-scroll-title
					:scrollItem="scrollItems"
					@click="scrollTitleClick">
				</ncu-scroll-title>
			</div> -->
			
			<ncu-category-item
				icon="cuIcon-locationfill"
				bgColor="rgb(94,140,251)"
				:text="`当前定位「${schoolZones[goodsSchoolZone-1].label}」`"
				hollowOut
				@click="schoolZoneItem.open=true">
			</ncu-category-item>
			
			<ncu-carousel
				class="goods-carousel"
				_style="width: 90%;height: 120px;"
				indicatorActiveColor="rgb(94,140,251)"
				:imgs="getCarouselImgs"
				@imgClick="carouselImgClick">
			</ncu-carousel>
			
			<div class="mall-nav">
				<ncu-radius-btn
					bgColor="rgb(253,127,136)"
					color="white"
					icon="cuIcon-presentfill"
					text="免费区"
					style="width: 25%;text-align: center;"
					:index="8"
					@click="toSpecialPriceGoods('free', $event)">
				</ncu-radius-btn>
				<ncu-radius-btn
					bgColor="rgb(42,220,202)"
					color="white"
					icon="cuIcon-evaluate_fill"
					text="特价区"
					style="width: 25%;text-align: center;"
					:index="9"
					@click="toSpecialPriceGoods('special', $event)">
				</ncu-radius-btn>
				<ncu-radius-btn
					bgColor="rgb(94,140,251)"
					color="white"
					icon="cuIcon-tagfill"
					text="商品类别"
					style="width: 25%;text-align: center;"
					:index="10"
					@click="toGoodsCategory">
				</ncu-radius-btn>
				<ncu-radius-btn
					bgColor="rgb(121,97,246)"
					color="white"
					icon="cuIcon-evaluate_fill"
					text="特价区"
					style="width: 25%;text-align: center;"
					:index="11"
					@click="toSpecialPriceGoods('special', $event)">
				</ncu-radius-btn>
				<!-- <ncu-zhhot-button 
					bgColor="rgb(212,240,254)"
					color="rgb(10,65,136)"
					icon="cuIcon-presentfill"
					text="免费区"
					style="width: 100%;margin-right: .5em;"
					:index="8"
					@click="toSpecialPriceGoods('free', $event)">
				</ncu-zhhot-button>
				<ncu-zhhot-button
					bgColor="rgb(200,246,235)"
					color="rgb(10,86,63)"
					icon="cuIcon-evaluate_fill"
					text="特价区"
					style="width: 100%;"
					:index="9"
					@click="toSpecialPriceGoods('special', $event)">
				</ncu-zhhot-button> -->
			</div>
			
			<ncu-goods 
				:goodsItems="goodsItems"
				@click="goodsCardClick"
				@avatarClick="toSellerInfo">
			</ncu-goods>
			
			<!-- <div class="ncu-mall-goods">
				<div class="ncu-mall-goods__left">
					<ncu-goods-card
						v-for="(goodsItem,index) in 
								goodsItems.slice(0, Math.ceil(goodsItems.length/2))"
						:key="goodsItem.goods_id"
						:index="index"
						:goods="goodsItem"
						@click="goodsCardClick"
						@avatarClick="toSellerInfo">
					</ncu-goods-card>
				</div>
				<div class="ncu-mall-goods__right">
					<ncu-goods-card
						v-for="(goodsItem,index) in 
								goodsItems.slice(Math.ceil(goodsItems.length/2))"
						:key="goodsItem.goods_id"
						:index="Math.ceil(goodsItems.length/2)+index"
						:goods="goodsItem"
						@click="goodsCardClick(Math.ceil(goodsItems.length/2)+index)"
						@avatarClick="toSellerInfo">
					</ncu-goods-card>
				</div>
			</div> -->
			<ncu-loading-part 
				type="bounce-stick"
				:active="isLoading">
			</ncu-loading-part>
			<ncu-no-data v-if="noData">
			</ncu-no-data>
		</ncu-scroll-wrapper-v2>
		
		<ncu-float-btn
			@click="toSearch">
			<span 
				:class="[`cuIcon-${urlParamsTag ? 'back' : 'search'}`]">
			</span>
		</ncu-float-btn>
		
		<ncu-modal 
			class="ncu-goods-details-card-wrapper"
			modalPadding="0"
			modalWidth="80%"
			:open="goodsDetailCardOpen"
			@layer-click="goodsDetailCardOpen=false"
			@lock-open="goodsDetailCardOpen=false">
			<ncu-goods-details-card
				:goodsDetails="selectGoodsDetails"
				@want-success="wantSuccess">
			</ncu-goods-details-card>
		</ncu-modal>
	
		<ncu-popup-select
			v-model="schoolZoneItem.school_zone"
			title="选择校区"
			direction="top"
			:open="schoolZoneItem.open"
			:items="schoolZones"
			@confirm="schoolZoneModifyConfirm"
			@cancel="schoolZoneItem.open=false"
			@layer-click="schoolZoneItem.open=false">
		</ncu-popup-select>
	</div>
</template>

<script>
	import { goodsView_api, searchGoods_api } from '../../common/api.js'
	import { httpGet } from '../../common/http.js'
	import { schoolZones } from '../../common/config.js'
	import GlobalData from '../../common/global.js'
    export default {
		onLoad(option) {
			this.urlParamsTag = option.tag
		},
        data() {
            return {
				goodsDetailCardOpen: false,
				mallTitle: '商城',
				urlParamsTag: '',
				schoolZones: schoolZones,
				selectGoodsDetails: {},
				carouselImgs: [
					{"seller":{"id":1,"user_name":"test3","school_zone":"前湖校区-医学部","avatar":"","qq":"2598772546"},"goodsInfo":{"goods_id":18,"goods_main_image":"https://neumorphic.cn/static/6c82b395-a5b5-4557-821e-e88e918f104a.jpg","goods_img":[],"goods_title":"蓝牙耳机","goods_price":20.0,"goods_tags":["九成新", "九成新", "九成新", "九成新", "九成新", "九成新"],"goods_desc":"x","goods_launch_time":"2021-07-31 14:26:27","goods_is_sold":false,"goods_wanted_person":1,"is_wanted_user":false}},
					{"seller":{"id":1,"user_name":"test3","school_zone":"前湖校区-医学部","avatar":"","qq":"2598772546"},"goodsInfo":{"goods_id":17,"goods_main_image":"https://neumorphic.cn/static/5934ac95-39c9-45ef-bc43-233f95282c17.jpg","goods_img":[],"goods_title":"蓝牙耳机","goods_price":20.0,"goods_tags":["可刀"],"goods_desc":"x","goods_launch_time":"2021-07-31 14:24:02","goods_is_sold":false,"goods_wanted_person":1,"is_wanted_user":false}},
					{"seller":{"id":1,"user_name":"test3","school_zone":"前湖校区-医学部","avatar":"","qq":"2598772546"},"goodsInfo":{"goods_id":16,"goods_main_image":"https://neumorphic.cn/static/7c00dfa3-8d05-4b2c-bf14-c80786bb8dc2.jpg","goods_img":[],"goods_title":"test","goods_price":1.0,"goods_tags":["九成新"],"goods_desc":"x","goods_launch_time":"2021-07-31 14:16:52","goods_is_sold":false,"goods_wanted_person":1,"is_wanted_user":true}},
					{"seller":{"id":1,"user_name":"test3","school_zone":"前湖校区-医学部","avatar":"","qq":"2598772546"},"goodsInfo":{"goods_id":15,"goods_main_image":"https://neumorphic.cn/static/6c82b395-a5b5-4557-821e-e88e918f104a.jpg","goods_img":[],"goods_title":"test","goods_price":1.0,"goods_tags":["九成新"],"goods_desc":"s","goods_launch_time":"2021-07-31 14:12:29","goods_is_sold":false,"goods_wanted_person":1,"is_wanted_user":false}}
				],
				scrollItems: [
					{
						text: '书籍',
						link: '#'
					},
					{
						text: '鼠标',
						link: '#'
					},
					{
						text: '键盘',
						link: '#'
					},
					{
						text: '文具',
						link: '#'
					},
					{
						text: '盒',
						link: '#'
					},
					{
						text: '图书',
						link: '#'
					},
					{
						text: '洗衣液',
						link: '#'
					},
					{
						text: '包',
						link: '#'
					},
					{
						text: '衣架',
						link: '#'
					},
				],
				goodsItems: [
					/*
					// {
					// 	seller: {
					// 		id: 0,
					// 		user_name: '卖家',
					// 		school_zone: '青山湖校区',
					// 		avatar: '',
					// 	},
					// 	goodsInfo: {
					// 		goods_id : 0,
					// 		goods_main_image: 'https://img11.360buyimg.com/seckillcms/s280x280_jfs/t1915/193/1773849739/92841/1e46f9e3/56da836bN8241f9c4.png.webp',
					// 		goods_img: ['https://img11.360buyimg.com/seckillcms/s280x280_jfs/t1915/193/1773849739/92841/1e46f9e3/56da836bN8241f9c4.png.webp'],
					// 		goods_title: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
					// 		goods_price: 10.24,
					// 		goods_tags: ['可刀'],
					// 	}
						
					// },
					*/
				],
				schoolZoneItem: {
					school_zone: 0,
					open: false
				},
				goodsSchoolZone: 1,
				isLoading: false,
				curPage: 1,
				noData: false,
			}
        },
		computed: {
			getCarouselImgs() {
				const imgs = []
				this.carouselImgs.map(goods => {
					imgs.push(goods.goodsInfo.goods_main_image)
				})
				return imgs
			}
		},
		methods: {
			carouselImgClick(index) {
				this.selectGoodsDetails = this.carouselImgs[index]
				this.goodsDetailCardOpen = true
			},
			flushGoods() {
				this.goodsItems = []
				this.curPage = 1
				this.noData = false
				this.getGoods(0)
			},
			toGoodsCategory() {
				uni.navigateTo({
					url: '/pages/mall/category'
				})
			},
			toSpecialPriceGoods(area, e) {
				const params = JSON.stringify(e)
				uni.navigateTo({
					url: `/pages/mall/special-area?params=${params}`
				})
			},
			scrollTitleClick(index) {
				const tag = this.scrollItems[index].text
				if(this.urlParamsTag) {
					uni.redirectTo({
						url: `/pages/mall/index?tag=${tag}`
					})
					return
				}
				uni.navigateTo({
					url: `/pages/mall/index?tag=${tag}`
				})
				// this.goodsItems = []
				// this.curPage = 1
				// this.noData = false
				// this.urlParamsTag = tag
				// this.getGoods()
			},
			goodsCardClick(index) {
				this.selectGoodsDetails = this.goodsItems[index]
				this.goodsDetailCardOpen = true
			},
			schoolZoneModifyConfirm() {
				const isChange = this.schoolZoneItem.school_zone !== this.goodsSchoolZone
				this.schoolZoneItem.open = false
				if(!this.schoolZoneItem.school_zone || !isChange) return
				this.goodsSchoolZone = this.schoolZoneItem.school_zone
				this.init()
				this.getGoods()
			},
			init() {
				this.isLoading = false
				this.curPage = 1
				this.noData = false
				this.goodsItems = []
			},
			toSellerInfo(index) {
				const goods = this.goodsItems[index]
				uni.navigateTo({
					url: `/pages/person/index?id=${goods.seller.id}`
				})
			},
			toSearch() {
				if(this.urlParamsTag) {
					uni.navigateBack()
					return
				}
				uni.navigateTo({
					url: '/pages/mall/search'
				})
			},
			async getGoodsByTime(page) {
				if(this.isLoading) return
				this.isLoading = true
				const [res, err] = await httpGet(goodsView_api, {
					page: page || 1,
					school_zone: this.goodsSchoolZone,
				})
				this.isLoading = false
				this.noData = res.data.detail
				if(this.noData) {
					return
				}
				this.curPage ++
				const results = res.data.results
				if(results && !results.length) {
					this.noData = true
					return
				}
				this.goodsItems = [...this.goodsItems, ...results]
			},
			async getGoodsByTag(page) {
				if(this.isLoading) return
				this.isLoading = true
				const [res, err] = await httpGet(searchGoods_api, {
					page: page || 1,
					q: this.urlParamsTag,
					school_zone: this.goodsSchoolZone,
				})
				this.isLoading = false
				this.noData = res.data.detail
				if(this.noData) {
					return
				}
				this.curPage ++
				const results = res.data.results
				if(results && !results.length) {
					this.noData = true
					return
				}
				this.goodsItems = [...this.goodsItems, ...results]
			},
			getGoods(page) {
				if(this.urlParamsTag) {
					this.getGoodsByTag(page)
				} else {
					this.getGoodsByTime(page)
				}
			},
			wantSuccess(is_wanted_user) {
				const goodsInfo = this.selectGoodsDetails.goodsInfo
				is_wanted_user && goodsInfo.goods_wanted_person++
				is_wanted_user || goodsInfo.goods_wanted_person--
				goodsInfo.is_wanted_user = is_wanted_user
			},
			formatSchoolZones(originSchoolZone) {
				let target
				this.schoolZones.some(school_zone => {
					if(school_zone.label === originSchoolZone) {
						target = school_zone.value
						return true
					}
				})
				return target || 1
			},
			startRequest() {
				this.goodsSchoolZone = this.formatSchoolZones(GlobalData.userInfo.school_zone)
				if(this.urlParamsTag) {
					this.mallTitle = `商城 - ${this.urlParamsTag}`
				} else {
					this.mallTitle = '商城'
				}
				this.getGoods()
			},
		},
		mounted() {
			const isLogin = GlobalData.checkLogin()
			if(!isLogin) {
				GlobalData.login.addWatcher(this.startRequest)
			} else {
				this.startRequest()
			}
			
		},
		beforeDestroy() {
			GlobalData.login.removeWatcher(this.startRequest)
		},
    }
</script>

<style lang="scss">
	.ncu-scroll-items-wrapper {
		vertical-align: top;
		font-size: 40px;
		margin-top: 10px;
		padding: 20px 0;
	}
	.mall-nav {
		display: flex;
		flex-wrap: wrap;
		margin: .8em .6em 0;
	}
	.nav-bar-left {
		font-size: .9rem;
		color: var(--main-light-color);
		font-weight: 400;
		[class^=cuIcon] {
			font-size: 1rem;
		}
	}
	.goods-carousel {
		
	}
</style>



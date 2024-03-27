<template>
	
	<div 
		class="goods-filter">
		
		<ncu-header-wrapper
			:config="{
				title: category.text,
				icon: category.icon,
				color: category.color,
			}"
			@schoolZoneChange="schoolZoneChange"
			@scrolltolower="getGoods"
			@scrolltoupper="flushGoods">
			<p slot="header">
				{{ schoolZones[goodsSchoolZone-1].label }} 有 {{ goodsCount }} 件商品
			</p>
			<ncu-goods
				:goodsItems="goodsItems"
				@click="goodsCardClick"
				@avatarClick="toSellerInfo">
			</ncu-goods>
			
			
			<ncu-loading-part 
				type="rect"
				:active="loadingConfig.isLoading">
			</ncu-loading-part>
			<ncu-no-data v-if="loadingConfig.noData">
			</ncu-no-data>
			
		</ncu-header-wrapper>
		
	</div>
	
</template>

<script>
	import { goodsView_api, searchGoods_api } from '../../common/api.js'
	import { httpGet } from '../../common/http.js'
	import { getIndexFromObjList } from '../../common/func.js'
	import { schoolZones, goodsCategory } from '../../common/config.js'
	import globalData from '../../common/global.js'
	
    export default {
		onLoad(option) {
			console.log('onLoad')
			this.title = option.title
			if(option.index)
				this.index = +option.index
			else
				this.index = getIndexFromObjList(goodsCategory, 'text', this.title)
			if(this.index !== -1)
				this.category = goodsCategory[this.index]
			else
				this.category = {
					text: this.title,
					icon: 'cuIcon-search',
					color: 'rgb(94,140,251)',
				}
		},
        data() {
            return {
				title: '',
				index: -1,
				goodsDetailCardOpen: false,
				selectGoodsDetails: {},
				goodsItems: [],
				goodsCount: 0,
				loadingConfig: {
					isLoading: false,
					curPage: 1,
					noData: false,
				},
				goodsSchoolZone: 1,
				schoolZones: schoolZones,
				category: {},
            }
        },
		methods: {
			flushGoods() {
				this.init()
				this.getGoods(1)
			},
			init() {
				this.goodsCount = 0
				this.loadingConfig.isLoading = false
				this.loadingConfig.curPage = 1
				this.loadingConfig.noData = false
				this.goodsItems = []
			},
			goodsCardClick(index) {
				this.selectGoodsDetails = this.goodsItems[index]
				this.goodsDetailCardOpen = true
			},
			toSellerInfo(index) {
				const goods = this.goodsItems[index]
				uni.navigateTo({
					url: `/pages/person/index?id=${goods.seller.id}`
				})
			},
			async _getGoods(page, api, params) {
				if(this.loadingConfig.isLoading) return
				this.loadingConfig.isLoading = true
				const [res, err] = await httpGet(api, {
					page: page,
					school_zone: this.goodsSchoolZone,
					...params,
				})
				this.loadingConfig.isLoading = false
				this.loadingConfig.noData = res.data.detail
				if(this.loadingConfig.noData) {
					return
				}
				const results = res.data.results
				if(results && !results.length) {
					this.loadingConfig.noData = true
					return
				}
				this.goodsCount = res.data.count
				this.loadingConfig.curPage ++
				this.goodsItems = [...this.goodsItems, ...results]
			},
			getGoods(page) {
				page = page || this.loadingConfig.curPage
				if(this.index === -1) {
					this._getGoods(page, searchGoods_api, {
						search_words: this.title,
					})
				} else {
					this._getGoods(page, goodsView_api, {
						goods_type: this.index+1,
					})
				}
				
			},
			wantSuccess(res) {
				const goodsInfo = this.selectGoodsDetails.goodsInfo
				goodsInfo.goods_wanted_person = res.wanted_user_num
				goodsInfo.is_wanted_user = res.is_wanted_user
			},
			schoolZoneChange(schoolZone) {
				const isChange = schoolZone !== this.goodsSchoolZone
				if(!isChange) return
				this.goodsSchoolZone = schoolZone
				this.init()
				this.getGoods()
			},
		},
		mounted() {
			console.log('mounted flushGoods')
			// this.flushGoods()
		}
    }
</script>

<style lang="scss" scoped>
	.goods-filter {
		position: relative;
		
		&__image-header {
			width: 100%;
			height: 20em;
			background-image: var(--texture);
			background-position: left;
		}
		
		&-wrapper {
			position: relative;
			width: 100%;
			top: 30%;
			
			display: flex;
			flex-direction: column;
		}
		
		&__category-info {
			padding-left: 10%;
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			
			&__text {
				color: #dddddd;
				margin-left: 1em;
			}
			&__name {
				color: white;
				font-size: 2em;
			}
		}
		
		&__texture {
			position: absolute;
			width: 100%;
			font-size: 17em;
			top: 21%;
			left: 43%;
			color: #ffffff14;
		}
		
		&-main {
			background-color: var(--main-bg-color);
			height: 100%;
			position: relative;
			top: -3em;
			border-top-left-radius: 1em;
			border-top-right-radius: 1em;
			overflow: hidden;
			padding: 1em 0;
		}
		
	}
</style>



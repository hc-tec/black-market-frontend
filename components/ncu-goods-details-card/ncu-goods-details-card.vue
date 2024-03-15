<template>
	<div class="ncu-goods-details-card">
		
		<div class="ncu-goods-details-card-main">
			<ncu-carousel
				:imgs="getGoodsAllImgs()"
				allowPreviewImg
				radius
				_style="min-height: 222px;">
			</ncu-carousel>
			
			<p class="ncu-goods-details-card__title">
				{{ goodsDetails.goodsInfo.goods_title }}
			</p>
			
			<div class="ncu-goods-details-card-content">
				
				<p class="ncu-goods-details-card-content__desc">
					{{ goodsDetails.goodsInfo.goods_desc }}
				</p>
				<div
					v-if="goodsDetails.goodsInfo.goods_tags.length"
					class="ncu-goods-details-card-content__tag-list">
					<ncu-popup-option
						size="mini"
						v-for="(tag,index) in goodsDetails.goodsInfo.goods_tags"
						:_style="{
							padding: '2px 10px',
							'font-size': '.8em',
							margin: '0 2px 4px 0'
						}"
						:index="index"
						@click="handleTagClick">
						{{ tag }}
					</ncu-popup-option>
				</div>
				
				<div>
					此商品于<span class="ncu-goods-details-card-content__launch-time">
						{{ goodsDetails.goodsInfo.goods_launch_time }}
					</span>上传
				</div>
				
				<template v-if="admin">
					<p class="ncu-goods-details-tab__title">
						{{goodsDetails.goodsInfo.goods_wanted_person.length}} 人想要
					</p>
					<div>
						<ncu-avatar 
							style="margin: 10px 10px 5px 0;"
							size="superMini"
							v-for="(person,index) in goodsDetails.goodsInfo.goods_wanted_person"
							:isAuthor="goodsDetails.goodsInfo.goods_is_sold && index==0"
							:key="person.student_id"
							:src="person.avatar"
							@click="toUser(person.id)">
						</ncu-avatar>
					</div>
				</template>
				
			</div>
			
		</div>
		
		<div class="ncu-goods-details-card-operate">
			<p class="ncu-goods-details-card__price animation-delay-8">
				<span class="">
					¥
				</span> {{ goodsDetails.goodsInfo.goods_price }}
			</p>
			<div class="ncu-goods-details-card__operation">
				
				<p 
					v-if="isHost && !admin"
					class="self-goods animate-wave animation-delay-9">
					您的商品
				</p>
				
				<ncu-avatar
					v-if="!isHost"
					class="animate-wave animation-delay-10"
					:src="goodsDetails.seller.avatar"
					size="superMini"
					@click="handleAvatarClick">
				</ncu-avatar>
				
				<ncu-radius-btn
					v-if="!isHost"
					bgColor="var(--yellow)"
					color="white"
					icon="cuIcon-warn"
					size="mini"
					hollowOut
					:index="11"
					@click="report()">
				</ncu-radius-btn>
				
				<ncu-radius-btn
					v-if="!isHost"
					bgColor="rgb(253,127,136)"
					color="white"
					icon="cuIcon-likefill"
					size="mini"
					:hollowOut="isWantedUser"
					:index="12"
					@click="wantIt">
				</ncu-radius-btn>
				
				<template v-if="admin">
					<ncu-radius-btn
						bgColor="rgb(253,127,136)"
						color="white"
						icon="cuIcon-delete"
						size="mini"
						hollowOut
						:index="13"
						@click="$emit('handleDeleteClick')">
					</ncu-radius-btn>
				</template>
				
				
			</div>
		</div>
		
		<!-- <div class="ncu-goods-details-card-content">
			<div
				class="report-btn"
				@click="report">
				<span class="cuIcon-warn">
				</span>
			</div>
			<p class="ncu-goods-details-card-content__price">
				<span class="">
					¥
				</span> {{ goodsDetails.goodsInfo.goods_price }}
			</p>
			<p class="ncu-goods-details-card-content__title">
				{{ goodsDetails.goodsInfo.goods_title }}
			</p>
			<ncu-goods-details-tab title="标签">
				<div class="ncu-goods-details-card-content__tag-list">
					<ncu-tag 
						v-for="tag in goodsDetails.goodsInfo.goods_tags"
						:key="tag">
						{{ tag }}
					</ncu-tag>
				</div>
			</ncu-goods-details-tab>
			<ncu-goods-details-tab title="上架时间">
				<span class="author-info__launch-time">
					{{ goodsDetails.goodsInfo.goods_launch_time }}
				</span>
			</ncu-goods-details-tab>
			<ncu-goods-details-tab title="所属校区">
				<span class="author-info__location">
					{{ goodsDetails.seller.school_zone }}
				</span>
			</ncu-goods-details-tab>
			<ncu-goods-details-tab title="备注">
				<span class="author-info__remarks">
					{{ goodsDetails.goodsInfo.goods_desc }}
				</span>
			</ncu-goods-details-tab>
			<template v-if="!admin">
				<ncu-goods-details-tab title="卖家">
					<ncu-avatar
						:src="goodsDetails.seller.avatar"
						size="superMini"
						@click="handleAvatarClick">
					</ncu-avatar>
					<span class="author-info__username">
						{{ goodsDetails.seller.user_name }}
					</span>
				</ncu-goods-details-tab>
				<ncu-goods-details-tab title="卖家QQ">
					<span class="author-info__qq">
						{{ goodsDetails.seller.qq }}
					</span>
					<span 
						class="copy cuIcon-copy"
						@click="copy">
					</span>
				</ncu-goods-details-tab>
				<p class="purchase-tip">
					<span class="cuIcon-info"></span>
					如需购买商品，请根据卖家QQ号联系卖家
				</p>
			</template>
			<template v-if="admin">
				<p class="ncu-goods-details-tab__title">
					{{goodsDetails.goodsInfo.goods_wanted_person.length}} 人想要
				</p>
				<div>
					<ncu-avatar 
						style="margin: 10px 10px 5px 0;"
						size="superMini"
						v-for="(person,index) in goodsDetails.goodsInfo.goods_wanted_person"
						:isAuthor="goodsDetails.goodsInfo.goods_is_sold && index==0"
						:key="person.student_id"
						:src="person.avatar"
						@click="toUser(person.id)">
					</ncu-avatar>
				</div>
			</template>
			
		</div>
		<ncu-btn-group class="ncu-goods-operation">
			<template v-if="admin">
				<ncu-button
					class="ncu-goods-operation__btn"
					width="100%"
					bgImage="blue"
					shadow
					:radius="false"
					@click="$emit('handleOperationClick')">
					<span class="cuIcon-more">
					</span>
				</ncu-button>
			</template>
			<template v-else>
				<ncu-button
					class="ncu-goods-operation__btn"
					width="100%"
					shadow
					:bgColor="isHost || isWantedUser ? 'grey' : 'orange'"
					:radius="false"
					@click="wantIt">
					<span class="cuIcon-like">
					</span> {{ isHost 
								? '您的商品' 
								: isWantedUser 
									? '不想要'
									: '想要'}}
				</ncu-button>
			</template>
		</ncu-btn-group> -->
		
	</div>
</template>

<script>
	/**
	 * @property {Object} goodsDetailsq 商品详细信息
	 * @property {Boolean} admin 是否为卖家
	 */
	import { wantedUser_api } from '../../common/api.js'
	import { httpPut, httpDelete } from '../../common/http.js'
	import GlobalData from '../../common/global.js'
	import ncuGoodsDetailsTab from './ncu-goods-details-tab.vue'
    export default {
		components: {
			ncuGoodsDetailsTab,
		},
		props: {
			goodsDetails: {
				type: Object,
			},
			admin: {
				type: Boolean,
				default: () => false
			}
		},
        data() {
            return {
				
            }
        },
		computed: {
			isWantedUser() {
				return this.goodsDetails.goodsInfo?.is_wanted_user
			},
			isHost() {
				return GlobalData.userInfo?.id === this.goodsDetails.seller?.id
			}
		},
		methods: {
			handleTagClick(index) {
				
			},
			getGoodsAllImgs() {
				const goodsInfo = this.goodsDetails.goodsInfo
				if(!goodsInfo) return []
				return [goodsInfo.goods_main_image, ...goodsInfo.goods_img]
			},
			copy() {
				uni.setClipboardData({
				    data: this.goodsDetails.seller.qq,
				});
			},
			handleAvatarClick() {
				const goods = this.goodsDetails
				uni.navigateTo({
					url: `/pages/person/index?id=${goods.seller.id}`
				})
			},
			report() {
				
			},
			toUser(id) {
				this.$emit('handleWantedPersonClick', id)
			},
			wantIt() {
				const isSelfGoods = GlobalData.userInfo?.id === this.goodsDetails.seller.id
				if(isSelfGoods) {
					return
				}
				this._wantIt()
			},
			async _wantIt() {
				const goodsInfo = this.goodsDetails.goodsInfo
					, method = goodsInfo.is_wanted_user ? httpDelete : httpPut
					, code = goodsInfo.is_wanted_user ? 2013 : 2012
					, [res, err] = await method(wantedUser_api, {
					goods_id: goodsInfo.goods_id
				}, code)
				if(err) {
					this.$emit('want-fail')
					return 
				}
				this.$emit('want-success', !goodsInfo.is_wanted_user)
			}
			
		}
    }
</script>

<style lang="scss">
	.ncu-goods-details-card {
		padding-bottom: -50px;
		background-color: var(--main-bg-color);
		
		&-main {
			width: 90%;
			margin: 0 auto;
			max-height: 70%;
			padding: 0 15px 10px 15px;
			box-shadow: var(--goods-card-shadow);
			border-radius: 10px;
			position: relative;
			top: -50px;
		}
		
		&-operate {
			width: 100%;
			position: absolute;
			bottom: 0;
			padding: 0 15px 0 30px;
			height: 55px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		
		&__img {
			width: 100%;
			max-height: 600px;
		}
		&__title {
			font-weight: 700;
			padding: 10px 0 3px 0;
			font-size: .9em;
		}
		&__price {
			font-weight: bold;
			.cuIcon-moneybag {
				font-size: .8rem;
			}
			font-size: 1.1rem;
			color: #ff5000;
		}
		&__operation {
			display: flex;
			align-items: center;
		}
		&-content {
			padding-bottom: 10px;
			position: relative;
			max-height: 100px;
			overflow: auto;
			color: var(--main-light-color);
			font-size: .6em;
			
			&__launch-time {
				margin: 0 3px;
			}
			
			&__desc {
				
			}
			
			&__tag-list {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
			}
			
		}
	}

	.self-goods {
		font-size: .8em;
		color: var(--main-light-color);
	}
	
</style>



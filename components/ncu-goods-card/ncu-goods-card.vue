<template>
	<div 
		class="ncu-goods-card animate-scale-up"
		:style="{
			animationDelay: `${Math.min(0.1*index, 1)}s`
		}"
		hover-class="hover-opacity"
		hover-stay-time="100"
		@click="handleCardClick">
		<div 
			class="ncu-goods-card__img-wrapper">
			<image 
				class="ncu-goods-card__img shadow-blur"
				:class="{
					'no-blur': isLoad,
				}"
				mode="widthFix"
				lazy-load
				:style="{
					backgroundImage: `url(${goods.goodsInfo.goods_main_image})`
				}"
				:src="goods.goodsInfo.goods_main_image"
				@load="imgLoad">
			</image>
		</div>
		<i
			v-if="goods.goodsInfo.goods_is_sold"
			class="cuIcon-check is-sold">
		</i>
		<div class="ncu-goods-card--details">
			<p 
				class="ncu-goods-card--details__title text-ellipsis-1">
				{{ goods.goodsInfo.goods_title }}
			</p>
			<p class="ncu-goods-card--details__price">
				<span class="money-icon">
					¥
				</span> 
				{{ goods.goodsInfo.goods_price }}
			</p>
			<!-- <div class="ncu-goods-card--details__tag-list">
				<ncu-tag 
					v-for="tag in goods.goodsInfo.goods_tags"
					:key="tag">
					{{ tag }}
				</ncu-tag>
			</div> -->
			<div class="ncu-goods-card--details__author-info">
				<!-- <div class="author-info__location">
					<span 
						class="cuIcon-location text-gray">
						{{ goods.seller.school_zone }}
					</span>
				</div> -->
				<!-- <div class="author-info__avatar">
					<span class="author-info__avatar-prefix"></span>
					<ncu-avatar 
						:src="goods.seller.avatar"
						size="superMini"
						@click="handleAvatarClick">
					</ncu-avatar>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	/**
	 * goods 
	 * @description goods 商品展示模块
	 * @property {Object} goods 商品信息对象
	 * @property {Number} index 循环时传来的索引值
	 * @event {Function} trade 商品展示部分被点击时触发的事件
	 * @event {Function)} avatarClick 卖家头像被点击时触发的事件
	 */
	
	export default {
		name: 'ncu-goods-card',
		props: {
			goods: {
				type: Object,
				default: () => ({
					seller: { // 用户对象
						id: 0, // 用户 id 
						user_name: '卖家', // 用户名
						school_zone: '青山湖校区', // 用户所属校区
						avatar: '', // 用户头像
					},
					goodsInfo: {
						goods_id : 0, // 商品 id
						goods_main_image: 'https://img11.360buyimg.com/seckillcms/s280x280_jfs/t1915/193/1773849739/92841/1e46f9e3/56da836bN8241f9c4.png.webp',
						goods_img: ['../../static/goods/test.jpg'], // 商品图片
						goods_title: '商品标题', // 商品标题
						goods_price: 10.24, // 商品价格
						goods_tags: ['可刀'], // 商品标签
						// goods_desc: '', // 商品描述
					}
				})
			},
			index: {
				type: Number
			}
		},
		data() {
			return {
				isLoad: false,
			}
		},
		methods: {
			imgLoad() {
				this.isLoad = true
			},
			handleCardClick() {
				this.$emit('click', this.index)
			},
			handleAvatarClick() {
				this.$emit('avatarClick', this.index)
			}
		}
	}
</script>

<style lang="scss">
	.ncu-goods-card {
		background-color: transparent;
		color: var(--main-light-color);
		position: relative;
		
		&__img {
			&-wrapper {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			// width: calc(100% - 20rpx);
			// height: calc(100% - 20rpx);
			// background-size: cover;background-repeat: no-repeat;
			filter: blur(10px);
			transition: filter 2s;
			border-radius: 10px;
			overflow: visible;
			max-height: 180px;
			min-height: 100px;
		}
		
		&--details {
			margin-top: 10px;
			padding: 0 10px 10px 10px;
			
			&__title {
				font-size: .8rem;
				margin-bottom: 5px;
			}
			&__price {
				font-weight: bold;
				display: flex;
				align-items: baseline;
				font-size: 1.2rem;
				color: #ff5000;
				margin-bottom: 5px;
				
				.money-icon {
					margin-right: 5px;
					position: relative;
					// top: 3px;
					font-size: 0.7em;
				}
			}
		}
		
	}
	.author-info {
		&__location {
			margin-top: 5px;
			font-size: .7rem;
		}
		&__avatar {
			position: absolute;
			bottom: 3px;
			right: 10px;
			display: flex;
			align-items: center;
			
			&-prefix {
				margin-right: 5px;
			}
		}
	}
	.is-sold {
		position: absolute;
		padding: 1px;
		top: 10px;
		right: 10px;
		color: white;
		background: var(--green);
		z-index: 10;
		border-radius: 50%;
	}
	.no-blur {
		filter: blur(0);
	}
</style>

<template>
	<div class="ncu-profile-card">
		<div class="ncu-profile-card-top">
			<image 
				class="ncu-profile-card__bg-image"
				mode="aspectFill"
				:src="profile.avatar"
				@click="previewImg()">
			</image>
			<div class="ncu-profile-card-top-wrapper">
				<div class="ncu-profile-card-avatar-wrapper">
					<ncu-avatar
						class="ncu-profile-card__avatar"
						size="default"
						:src="profile.avatar"
						@click="$emit('handleAvatarClick')">
					</ncu-avatar>
					<div class="ncu-profile-card__name">
						{{ profile.user_name }}
					</div>
				</div>
				<div class="ncu-profile-card__profile">
					{{ profile.profile }}
				</div>
				<span 
					v-if="!isBack"
					class="cuIcon-settings ncu-profile-card__settings"
					@click="$emit('handleSettingClick')">
				</span>
			</div>
		</div>
		<div class="ncu-profile-card-body">
			
			<ncu-category-item
				v-if="!isHost"
				icon="cuIcon-shop"
				bgColor="rgb(94,140,251)"
				text="去 TA 的摊位看看"
				hollowOut
				@click="$emit('handleLinkShopClick')">
			</ncu-category-item>
			
			<ncu-category-item
				icon="cuIcon-community"
				bgColor="rgb(121,97,246)"
				:text="`${isHost ? '进入聊天' : '与 TA 聊聊'}`"
				hollowOut
				@click="$emit('handleLinkChatClick')">
			</ncu-category-item>
			
			<ncu-profile-card-item
				title="摊位"
				:cardIndex="1"
				link="详情"
				:items="txnInfo"
				@click="handleTabDetailsClick"
				@handleItemClick="handleItemClick">
			</ncu-profile-card-item>
			
			<ncu-profile-card-item
				link="详情"
				:cardIndex="2"
				title="论坛"
				:items="comInfo"
				@click="handleTabDetailsClick"
				@handleItemClick="handleItemClick">
			</ncu-profile-card-item>
		</div>
	</div>
</template>

<script>
	import ncuProfileCardItem from './ncu-profile-card-items.vue'
	import { debounce } from '../../common/func.js'
    export default {
		name: 'ncu-profile-card',
		components: {
			ncuProfileCardItem,
		},
		props: {
			isBack: {
				type: Boolean,
				default: false,
			},
			isHost: {
				type: Boolean,
				default: true,
			},
			profile: {
				type: Object,
				default: () => ({
					student_id: '8002119301',
					user_name: '慕尘嚣',
					avatar: 'https://i0.hdslb.com/bfs/face/6a2ab77a7ba13ab02bf4fe318025ae46c5ec6b59.jpg@140w_140h_1c.webp',
					school_zone: '青山湖校区',
					profile: '未尝不是狂欢()',
					qq: '2598772546',
					txn_statistics: {
						sold_goods: 20,
						purchase_goods: 20,
						current_goods: 10,
						success_transaction: 5,
						favor_goods: 20,
					},
					commuca_statistics: {
						focus_topics: 10,
						launch_topics: 20,
					}
					
				})
			}
		},
        data() {
            return {
				exit: debounce(this._exit, 300),
				txnInfo: [],
				comInfo: [],
            }
        },
		watch: {
			profile: {
				handler() {
					this.txnInfo = this.getTxnInfo()
					this.comInfo = this.getComInfo()
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			getTxnInfo() {
				return [
					{
						text: '买入数量',
						icon: 'cuIcon-sponsor',
						color: 'rgb(94,140,251)',
						count: this.profile.txn_statistics?.purchase_goods
					},
					{
						text: '卖出数量',
						icon: 'cuIcon-pick',
						color: 'rgb(42,205,141)',
						count: this.profile.txn_statistics?.sold_goods
					},
					{
						text: '想要数量',
						icon: 'cuIcon-like',
						color: 'rgb(121,97,246)',
						count: this.profile.txn_statistics?.favor_goods
					},
					{
						text: '待审商品',
						icon: 'cuIcon-send',
						color: 'rgb(253,127,136)',
						count: 0
					},
					{
						text: '现有商品',
						icon: 'cuIcon-send',
						color: 'rgb(42,220,202)',
						count: this.profile.txn_statistics?.current_goods
					},
				]
			},
			getComInfo() {
				return [
					{
						text: '点赞数量',
						icon: 'cuIcon-we',
						color: 'rgb(42,220,202)',
						count: this.profile.commuca_statistics?.favor_num
					},
					{
						text: '待审数量',
						icon: 'cuIcon-we',
						color: 'rgb(253,127,136)',
						count: 0
					},
					{
						text: '帖子数量',
						icon: 'cuIcon-activity',
						color: 'rgb(121,97,246)',
						count: this.profile.commuca_statistics?.launch_num
					},
				]
			},
			_exit() {
				this.$emit('exitBtnClick')
			},
			getNavByTitle(title) {
				return {
					'摊位': 'blackMarket',
					'论坛': 'forum'
				}[title]
			},
			handleTabDetailsClick(title) {
				if(this.isBack) {
					this.$emit('pemission-deny')
					return
				}
				const prefix = this.getNavByTitle(title)
				uni.navigateTo({
					url: `/pages/person/details/${prefix}`
				})
			},
			handleItemClick(title, index) {
				if(this.isBack) {
					this.$emit('pemission-deny')
					return
				}
				const prefix = this.getNavByTitle(title)
				uni.navigateTo({
					url: `/pages/person/details/${prefix}?active=${index}`,
				})
			},
			previewImg() {
				const img = this.profile.avatar
				uni.previewImage({
					urls: [img],
					current: img
				})
			},
		},
		mounted() {
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-profile-card {
		width: 100%;
		min-height: 460px;
		margin: 70px auto 50px auto;
		padding: 0 0 30px 0;
		border-radius: 12px;
		position: relative;
		font-family: Raleway, Helvetica Neue, Helvetica,sans-serif !important;
		
		&-top {
			display: flex;
			align-items: center;
			position: relative;
			margin-bottom: 10px;
			
			&-right {
				
			}
		}
		&-body,
		&-top-wrapper {
			position: relative;
			top: -34px;
		}
		&-body {
			padding: 0 20px;
		}
		
		&-top-wrapper {
			display: flex;
			width: 100%;
		}
		&-avatar-wrapper {
			width: 51px;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 20px 10px 20px;
		}
		
		&__settings {
			position: absolute;
			right: 20px;
			top: 50%;
			transform: translateY(-50%);
			font-size: 1.3rem;
			font-weight: bolder;
		}
		
		&__bg-image {
			position: absolute;
			top: -205px;
			width: 100%;
			max-height: 200px;
		}
		
		&__avatar {
			margin-bottom: 5px;
		}
		
		&__name,
		&__profile {
			margin-bottom: 5px;
			word-break: break-all;
			padding-right: 10%;
		}
		
		&__name {
			font-weight: 700;
			font-size: 1rem;
			text-align: center;
			max-width: 300px;
			min-width: 100px;
			overflow: auto;
		}
		
		&__profile {
			// margin-top: 20px;
			width: 50%;
			font-weight: 800;
			color: var(--main-light-color);
			position: relative;
			top: 43px;
			word-break: break-all;
		}
		
	}
	[class*="cuIcon-"] {
		margin-right: 10rpx;
	}
	.link {
		color: var(--blue);
		background-color: var(--main-bg-color);
		box-shadow: var(--main-shadow);
		padding: 10px 20px;
		border-radius: 10px;
		position: relative;
		
		.cuIcon-right {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 10px;
			font-size: .7rem;
			color: var(--main-light-color);
		}
	}
	
	.chat-link {
		position: relative;
		background-color: transparent;
		
		&::after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			filter: blur(18px);
			
			background-image: url(http://neumorphic.cn/static/e4a42d15-b8c1-4fb5-ab55-362689d3d364.svg);
			transition: background-position .3s;
			z-index: -1;
			animation: move 20s infinite alternate;
		}
		
		@keyframes move {
			from {
				background-position: 88%;
			} to {
				background-position: 190%;
			}
		}
	}
	
</style>



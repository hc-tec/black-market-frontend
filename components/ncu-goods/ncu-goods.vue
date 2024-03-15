<template>
	<div class="ncu-mall-goods">
		<div class="ncu-mall-goods__left">
			<!-- .slice(0, Math.ceil(goodsItems.length/2))" -->
			<ncu-goods-card
				class="goods-wrapper"
				
				v-for="(goodsItem,index) in goodsItems"
				:key="goodsItem.goods_id"
				:index="index"
				:goods="goodsItem"
				@click="handleCardClick(index)"
				@avatarClick="handleAvatarClick">
			</ncu-goods-card>
		</div>
		<!-- <div class="ncu-mall-goods__right">
			<ncu-goods-card
				v-for="(goodsItem,index) in 
						goodsItems.slice(Math.ceil(goodsItems.length/2))"
				:key="goodsItem.goods_id"
				:index="Math.ceil(goodsItems.length/2)+index"
				:goods="goodsItem"
				@click="handleCardClick(Math.ceil(goodsItems.length/2)+index)"
				@avatarClick="handleAvatarClick">
			</ncu-goods-card>
		</div> -->
	</div>
</template>

<script>
    export default {
		props: {
			goodsItems: {
				type: Array,
			}
		},
        data() {
            return {
				handleCardClick(index) {
					this.$emit('click', index)
				},
				handleAvatarClick(index) {
					this.$emit('avatarClick', index)
				}
            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-mall {
		&-goods {
			margin: 2rem 0 1rem 0;
			padding: 0 1%;
			display: flex;
			justify-content: space-evenly;
			align-item:flex-start;
			
			&__left,
			&__right {
				width: 96%;
				margin: 0 0% 0 5%;
				// display: flex;
				// flex-direction: column;
				// flex-wrap: wrap;
				// align-item:flex-start;
			}
			
			.goods-wrapper {
				width: 46%;
				float: left;
				margin-right: 4%;
				
				// &:nth-child(odd) {
				// 	margin-right: 0;
				// }
				// &:nth-child(even) {
				// 	float: left;
				// }
				&:first-child {
					// margin-right: 2%;
					float: left;
				}
			}
			
		}
	}
</style>



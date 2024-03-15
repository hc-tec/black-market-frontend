<template>
	<div class="goods-category">
		<ncu-custom-header
			title="商品分类"
			bgColor="var(--main-bg-color)"
			isBack>
		</ncu-custom-header>
		<ncu-scroll-wrapper-v2
			height="calc(96vh - 40px)">
			<div class="goods-category-list">
				<ncu-category-item 
					v-for="(category,index) in goodsCategory"
					:key="category.icon"
					:icon="category.icon"
					:text="category.text"
					:index="index"
					:bgColor="category.color"
					@click="getGoodsByCategory">
				</ncu-category-item>
			</div>
		</ncu-scroll-wrapper-v2>
	</div>
	
</template>

<script>
	import { goodsCategory } from '../../common/config.js'
    export default {
        data() {
            return {
				goodsCategory: goodsCategory,
            }
        },
		methods: {
			getGoodsByCategory(index) {
				uni.navigateTo({
					url: `/pages/mall/goods?title=${goodsCategory[index].text}&index=${index}`
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
	.goods-category-list {
		width: 100%;
		background-color: var(--main-bg-color);
		padding: 5% 0;
		margin: 0 auto;
	}
</style>



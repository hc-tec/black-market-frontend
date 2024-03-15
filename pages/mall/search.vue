<template>
	<div class="goods-search">
		
		<ncu-custom-header
			title="搜索"
			bgImage="url(http://neumorphic.cn/static/e4a42d15-b8c1-4fb5-ab55-362689d3d364.svg)"
			isBack>
		</ncu-custom-header>
		<div 
			class="ncu-search-content"
			:style="{
				bottom: keyboardHeight ? `${keyboardHeight+20}px` : '30%'
			}">
			<light-input
				class="ncu-search__input"
				placeholder="搜索"
				confirm-type="search"
				v-model="searchInput"
				@focus="inputFocus"
				@blur="inputBlur"
				@confirm="search">
				<div
					slot="suffix"
					class="cuIcon-search"
					@click="search">
				</div>
			</light-input>
		</div>
		
		<!-- <div class="ncu-search__history">
			<search-tab 
				icon="cuIcon-hot"
				title="热搜商品">
				<ncu-popup-option 
					_style="display: inline-flex;margin-right: 5px;"
					v-for="(tag,index) in hotGoodsTags"
					:key="tag.id"
					:index="index"
					@click="tagSelect">
					{{ tag.name }}
				</ncu-popup-option>
			</search-tab>
			
			<search-tab
				icon="cuIcon-time"
				title="搜索历史">
				<ncu-popup-option 
					_style="display: inline-flex;margin-right: 5px;"
					v-for="(tag,index) in searchHistoryTags"
					:key="tag.id"
					:index="index"
					@click="tagSelect">
					{{ tag.name }}
				</ncu-popup-option>
			</search-tab>
			
		</div>
		 -->
	</div>
</template>

<script>
	import searchTab from './search/search-tab.vue'
    export default {
		components: {
			searchTab
		},
        data() {
            return {
				searchInput: '',
				hotGoodsTags: [
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
				],
				keyboardHeight: 0,
				searchHistoryTags: [
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
				],
            
			}
        },
		methods: {
			inputFocus(e) {
				this.keyboardHeight = e.detail.height
			},
			inputBlur() {
				this.keyboardHeight = 0
			},
			search() {
				const isValid = this.searchInput
				if(!isValid) return
				this.toFilter(this.searchInput)
			},
			tagSelect(index) {
				const tag = this.hotGoodsTags[index]
				this.toFilter(tag.name)
			},
			toFilter(tag) {
				uni.navigateTo({
					url: `/pages/mall/goods?title=${tag}`
				})
			}
		}
    }
</script>

<style lang="scss">
	.goods-search {
		
		&-content {
			
			
			
		}
		&__input {
			
		}
		&__history {
			padding: 0 10%;
			padding-bottom: 20%;
			background-color: var(--main-bg-color);
		}
		
		.ncu-search {
			
			&-content {
				position: absolute;
				width: 90%;
				left: 50%;
				bottom: 30%;
				// box-shadow: 0px 19px 37px -12px var(--search-input-shadow-color);
				transform: translateX(-50%);
				transition: bottom .2s;
				border-radius: 10px;
				overflow: hidden;
				border: 2px solid var(--main-color);
			}
			&__input {
				[class~=light-input] {
					padding: 15px 40px !important;
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



<template>
	<div class="ncu-float-nav">
		<ncu-float-nav-item
			v-for="(item,index) in navItems"
			:style="{
				width: `${100/(navItems.length)}%`
			}"
			:class="[`ncu-float-nav-item-${index}`]"
			:item="item"
			:active="activeIndex === index"
			:index="index"
			:key="item.text"
			@click="handleNavItemClick(index, `.ncu-float-nav-item-${index}`)">
		</ncu-float-nav-item>
		
		<div 
			class="active-item"
			:style="{
				width: `${100/(navItems.length)}%`,
				left: move,
			}">
		</div>
		
	</div>
</template>

<script>
	import ncuFloatNavItem from './ncu-float-nav-item.vue'
    export default {
		components: {
			ncuFloatNavItem,
		},
		props: {
			navItems: {
				type: Array,
				default: () => [
					{
						text: '我的好友',
					},
					{
						text: '我的申请',
					},
					{
						text: '申请管理',
					},
				]
			}
			
		},
        data() {
            return {
				activeIndex: 0,
				itemWidth: 0,
            }
        },
		computed: {
			move() {
				return `${3+this.activeIndex*this.itemWidth}px`
			}
		},
		methods: {
			getAttrByClass(className) {
				const that = this
				return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(that);
					query.select(className).fields({
						size: true,
						rect: true,
					}, data => {
					  resolve(data)
					}).exec();
				})
				
			},
			async handleNavItemClick(index, clsName) {
				this.activeIndex = index
				this.$emit('click', index)
				
			},
			async initItemWidth() {
				const attr = await this.getAttrByClass(`.ncu-float-nav-item-0`)
				this.itemWidth = attr.width
			},
			setActiveIndex(index) {
				this.activeIndex = index
			}
		},
		mounted() {
			this.initItemWidth()
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-float-nav {
		
		--main-bg-color: rgb(245,246,250);
		--main-color: rgb(175,178,190);
		--active-bg-color: white;
		--active-color: black;
		
		width: 93%;
		
		position: fixed;
		left: 50%;
		bottom: 6em;
		transform: translateX(-50%);
		
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		
		border-radius: 15px;
		
		background-color: var(--main-bg-color);
		color: var(--main-color);
		padding: 3px;
		
		z-index: 1000;
		
		.active-item {
			height: calc(100% - 10px);
			border-radius: 10px;
				
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			
			background-color: var(--active-bg-color);
			transition: left .3s;
			z-index: -1;
		}
		
	}
	@media (prefers-color-scheme: dark) {
		.ncu-float-nav {
			
			--main-bg-color: rgb(10,9,5);
			--main-color: rgb(80,77,65);
			--active-bg-color: black;
			--active-color: white;
		}
	}
</style>



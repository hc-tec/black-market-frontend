<template>
	<scroll-view 
		scroll-x 
		class="bg-white nav" 
		:class="{
			'ncu-nav': fixed,
		}"
		scroll-with-animation 
		:scroll-left="scrollLeft">
		<div
			class="ncu-nav-wrapper"
			:class="{
				divided: divided,
			}">
			<div 
				class="ncu-nav-item" 
				v-for="(item,index) in items" 
				:key="item" 
				@click="tabSelect(index)">
				<ncu-popup-option 
					size="mini"
					:active="index==tabActive"
					:_style="{
						height: '40px',
						padding: '6px 18px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flex: 1,
						margin: 0,
					}">
					{{ item }}
				</ncu-popup-option>
			</div>
		</div>
	</scroll-view>
</template>

<script>
    export default {
		props: {
			items: {
				type: Array,
				default: () => [],
			},
			fixed: {
				type: Boolean,
				default: true
			},
			divided: {
				type: Boolean,
				default: true,
			},
			tabActive: {
				type: Number,
			}
		},
        data() {
            return {
            }
        },
		methods: {
			tabSelect(index) {
				this.$emit('tabSelect', index)
			},
		},
    }
</script>

<style lang="scss">
	.ncu-nav-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.divided {
		display: flex;
		justify-content: space-evenly;
	}
	.ncu-nav {
		position: fixed;
		z-index: 1;
		
		&-item {
			height: 50px;
			line-height: 50px;
			padding: 0 5rpx;
			margin: 0 5rpx;
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}
		
	}
</style>



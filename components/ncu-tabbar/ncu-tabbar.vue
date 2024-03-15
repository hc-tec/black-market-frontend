<template>
	<div 
		class="ncu-tabbar move">
		<div 
			class="ncu-tabbar-menu"
			:style="{
				height: `${CustomBar}px`,
				paddingTop: `${StatusBar}px`,
			}">
			<div 
				v-for="(item,index) in menuItems"
				class="ncu-tabbar-menu-item"
				:key="item.text"
				:class="[index === active ? 'active' : '',
						`ncu-tabbar-menu-item-${index}`]"
				@click="$emit('click', index)">
				{{ item.text }}
			</div>
			<p 
				class="line"
				:style="getMoveStyle">
			</p>
		</div>
		
		<slot></slot>
		
	</div>
</template>

<script>
	import { cssObjectToString } from '../../common/func.js'
    export default {
		props: {
			menuItems: {
				type: Array,
				default: () => [
					'消息',
					'好友'
				]
			},
			active: {
				type: Number,
				default: 0,
			},
			percent: {
				type: Number,
				default: 0,
			}
		},
        data() {
            return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar+5,
				curPos: 33,
				nextPos: 0,
            }
        },
		computed: {
			getMoveStyle() {
				const res = {}
					, delta = this.nextPos - this.curPos
					, moveDis = delta * this.percent
				// console.log('move', this.nextPos , this.curPos)
				if(this.percent >= 0) {
					res.left = `${this.curPos + moveDis}px`
				} else {
					res.left = `${this.curPos - moveDis}px`
				}
				const percent = Math.abs(this.percent)
				if(percent < 0.5) {
					res.transform = `scaleX(${1+6*percent}) translateX(-50%)`
				} else {
					res.transform = `scaleX(${4-6*(percent-0.5)}) translateX(-50%)`
				}
				
				return cssObjectToString(res)
			},
			getMenuLength() {
				return this.menuItems.length
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
			async getTabItemAttr(index) {
				const curItemClass = `.ncu-tabbar-menu-item-${index}`
					, res = await this.getAttrByClass(curItemClass)
				return res
			},
			getTabItemCenterPos(itemAttr) {
				return itemAttr.left + (itemAttr.right - itemAttr.left) / 2
			},
			async moveEnd() {
				const itemAttr = await this.getTabItemAttr(this.active)
				this.curPos = this.getTabItemCenterPos(itemAttr)
			}
		},
		watch: {
			async percent() {
				if(this.percent > 0) {
					if(this.active === this.getMenuLength-1) return
					const nextItemAttr = await this.getTabItemAttr(this.active+1)
					this.nextPos = this.getTabItemCenterPos(nextItemAttr)
					
				} else if (this.percent < 0) {
					if(this.active === 0) return
					const nextItemAttr = await this.getTabItemAttr(this.active-1)
					this.nextPos = this.getTabItemCenterPos(nextItemAttr)
				}
			},
			active() {
				this.moveEnd()
			}
		},
		async created() {
			const itemAttr = await this.getTabItemAttr(this.active)
			this.curPos = this.getTabItemCenterPos(itemAttr)
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-tabbar {
		width: 100%;
		position: relative;
		
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
		}
		&-menu {
			
			padding: 5px 120px 0 20px;
			display: flex;
			align-items: center;
			flex-direction: row;
			position: relative;
			
			.line {
				position: absolute;
				width: 10px;
				height: 3px;
				bottom: 8px;
				border-radius: 10px;
				transform: translateX(-50%);
				transform-origin: left;
				background-color: var(--main-color);
			}
			
			&-item {
				font-size: 1.2em;
				font-weight: 500;
				margin-right: 1.6em;
				color: var(--main-light-color);
				transition: transform .2s;
				transform-origin: bottom;
				position: relative;
				min-width: fit-content;
				
				&::after {
					content: "";
					
				}
				
				&.active {
					font-weight: 600;
					color: var(--main-color);
					transform: scale(1.2);
					
					&::after {
						transform: translateX(-50%) scaleX(1);
					}
				}
				
			}
		}
		
		&.move {
			&::after {
				animation: move 20s infinite alternate;
			}
		}
		
		@keyframes move {
			from {
				background-position: 0% 0;
			} to {
				background-position: 100% 60%;
			}
		}
	}
</style>



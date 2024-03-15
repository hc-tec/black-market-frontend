<template>
	<ncu-layer
		:open="open"
		:closeOnClickLayer="closeOnClickLayer"
		:during="during"
		@layer-click="$emit('layer-click')"
		@lock-open="$emit('lock-open', false)">
		
		<div 
			class="ncu-popup-modal"
			:class="[`ncu-popup-modal-direction--${direction}`]"
			:style="getStyle">
			
			<p 
				v-if="title"
				class="ncu-popup-modal__title">
				{{ title }}
			</p>
			<div
				class="ncu-popup-modal__content">
				<slot></slot>
			</div>
		</div>
		
	</ncu-layer>
</template>

<script>
	import { cssObjectToString } from '../../common/func.js'
    export default {
		props: {
			open: {
				type: Boolean,
				default: () => false
			},
			closeOnClickLayer: {
				type: Boolean,
				default: () => true
			},
			during: {
				type: Number,
				default: () => 500
			},
			title: {
				type: String
			},
			keyboardHeight: {
				type: Number,
				default: () => 0
			},
			direction: {
				type: String,
				default: "bottom"
			},
			_style: {
				type: [String, Object],
			},
		},
        data() {
            return {
				offsetHeight: 0,
				copyOffsetHeight: 0,
            }
        },
		computed: {
			getStyle() {
				const style = {
					top: this.getCalcTop,
					transition: `top ${this.getDuring}s`,
				}
				if(typeof this._style === 'object') {
					return cssObjectToString(Object.assign(style, this._style))
				}
				return `${this._style ? this._style : ''};${cssObjectToString(style)}`
			},
			getDuring() {
				return this.during/1000
			},
			getCalcTop() {
				return {
					bottom: `calc(100% - ${this.offsetHeight+this.keyboardHeight}px)`,
					top: `${this.offsetHeight+this.keyboardHeight}px`,
				}[this.direction]
			}
		},
		watch: {
			open: {
				handler() {
					if(this.open) {
						setTimeout(() => {
							if(this.copyOffsetHeight) {
								this.offsetHeight = this.copyOffsetHeight
								return
							}
							this.getContentHeight()
						}, 20)	
						return
					}
					this.offsetHeight = 0
				},
				immediate: true,
			}
		},
		methods: {
			getContentHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.ncu-popup-modal').boundingClientRect(data => {
				  this.offsetHeight = data.height
				  this.copyOffsetHeight = data.height
				}).exec();
			}
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-popup-modal {
		width: 100%;
		position: fixed;
		padding: 30px;
		background-color: var(--main-bg-color);
		transition: top .3s;
		height: fit-content;
		
		&-direction--bottom {
			border-top-left-radius: 20px;
			border-top-right-radius: 20px;
		}
		
		&-direction--top {
			border-bottom-left-radius: 20px;
			border-bottom-right-radius: 20px;
			transform: translateY(-100%);
		}
		    
		&__title {
			font-size: 1.1rem;
			font-weight: bold;
			margin-bottom: 20px;
		}
		
		&__content {
			max-height: 80vh;
			overflow: auto;
			height: fit-content;
		}
		
	}
</style>



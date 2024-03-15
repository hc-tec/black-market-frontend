<template>
	<div 
		v-if="true_active"
		class="ncu-global-loader"
		:style="{
			opacity: active ? '1' : '0',
		}">
		<div 
			class="ncu-global-loader__wrapper"
			:class="active ? 
					'slide-scale-in' : 
					'slide-scale-out'">
					
			<ncuLoadingElem v-if="type==='elem'" />
			<ncuLoadingBounceStick v-else-if="type==='bounce-stick'" />
			<ncuLoadingBounceBall v-else-if="type==='bounce-ball'" />
			<ncuLoadingRect v-else-if="type==='rect'" />
			<text class="ncu-global-loader__text">
				{{ loadingText }}
			</text>
		</div>
		
		<div 
			class="ncu-global-loader__mask">
		</div>
	</div>
</template>

<script>
	/**
	 * loading 加载
	 * @description loading 加载
	 * @property {String} loadingText 加载文字
	 * @property {Boolean} active 是否激活
	 * @property {String} type 加载特效类型，可选值：elem | bounce-stick | bounce-ball | rect
	 * @example <ncu-loading
					:active="active"
					type="bounce-stick">
				</ncu-loading>
	 */
	import ncuLoadingElem from './ncu-loading-elem.vue'
	import ncuLoadingBounceStick from './ncu-loading-bounce-stick.vue'
	import ncuLoadingBounceBall from './ncu-loading-bounce-ball.vue'
	import ncuLoadingRect from './ncu-loading-rect.vue'
    export default {
		name: 'ncu-loading',
		components: {
			ncuLoadingElem,
			ncuLoadingBounceStick,
			ncuLoadingBounceBall,
			ncuLoadingRect,
		},
		props: {
			loadingText: {
				type: String,
				default: () => 'Loading ...'
			},
			active: {
				type: Boolean,
				default: () => false
			},
			type: {
				type: String,
				default: () => 'elem'
			},
		},
        data() {
            return {
				true_active: this.active
            }
        },
		watch: {
			active() {
				const close = !this.active
				this.true_active = true
				if(close) {
					setTimeout(() => {
						this.true_active = false
					}, 2000)
				}
			}
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-global-loader {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		opacity: 1;
		transition: opacity 2s ease-in;
		z-index: var(--loading-mask);
		
		&__wrapper {
			background-color: white;
			padding: 40rpx;
			position: fixed;
			width: 80%;
			left: 50%;
			top: 40%;
			transform: translate(-50%, -50%);
			z-index: var(--loading-content);
			border-radius: 15rpx;
			overflow: hidden;
		}
		
		&__text {
			margin-top: 40rpx;
			display: block;
			text-align: center;
		}
		
		&__mask {
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.4);
			position: absolute;
			top: 0;
			left: 0;
			z-index: var(--loading-mask);
		}
	}
	
	.slide-scale-in {
		animation: slide-scale-in 2s cubic-bezier(0.16, 1, 0.3, 1);
	}
	
	.slide-scale-out {
		animation: slide-scale-out 2s cubic-bezier(0.16, 1, 0.3, 1);
	}
	
	@keyframes slide-scale-in {
		0% {
			width: 60px;
			height: 60px;
			left: 150%;
		}
		50% {
			width: 60px;
			height: 60px;
			left: 50%;
		}
		75% {
			width: 60px;
			height: 40%;
			left: 50%;
		}
		100% {
			width: 80%;
			height: auto;
			left: 50%;
		}
	}
	
	@keyframes slide-scale-out {
		0% {
			width: 80%;
			height: auto;
			left: 50%;
		}
		50% {
			width: 60px;
			height: 40%;
			left: 50%;
		}
		75% {
			width: 60px;
			height: 60px;
			left: 50%;
		}
		100% {
			width: 60px;
			height: 60px;
			left: 150%;
		}
	}
</style>



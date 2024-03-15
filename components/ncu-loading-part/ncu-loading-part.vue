<template>
	<div 
		class="ncu-loading-part"
		:class="[`ncu-loading-part--${close ? 'active' : ''}`]"
		:style="{
			transform: getScale,
			margin: margin,
		}">
		<ncuLoadingElem v-if="type==='elem'" />
		<ncuLoadingBounceStick v-else-if="type==='bounce-stick'" />
		<ncuLoadingBounceBall v-else-if="type==='bounce-ball'" />
		<ncuLoadingRect v-else-if="type==='rect'" />
	</div>
</template>

<script>
	import ncuLoadingElem from '../ncu-loading/ncu-loading-elem.vue'
	import ncuLoadingBounceStick from '../ncu-loading/ncu-loading-bounce-stick.vue'
	import ncuLoadingBounceBall from '../ncu-loading/ncu-loading-bounce-ball.vue'
	import ncuLoadingRect from '../ncu-loading/ncu-loading-rect.vue'
    export default {
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
			margin: {
				type: String,
			}
			
		},
		data() {
		    return {
				close: this.active,
		    }
		},
		computed: {
			getScale() {
				return {
					'elem': 'scale(.3)',
					'bounce-stick': 'scale(.4)',
					'bounce-ball': 'scale(.3)',
					'rect': 'scale(.4)',
				}[this.type]
			}
		},
		watch: {
			active() {
				if(this.active && this.close) {
					setTimeout(() => {
						this.close = false
					}, 3000)
					return
				}
				this.close = true
				setTimeout(() => {
					!this.active && (this.close = false);
				}, 3000)
				
			}
		}
        
    }
</script>

<style lang="scss" scoped>
	.ncu-loading-part {
		position: relative;
		top: -25px;
		height: 0;
		opacity: 0;
		transition: transform .3s, height .3s, opacity .3s;
	}
	.ncu-loading-part--active {
		opacity: 1;
		height: 35px;
	}
</style>



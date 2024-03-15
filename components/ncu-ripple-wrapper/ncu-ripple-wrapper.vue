<template>
	<div 
		class="ncu-ripple-wrapper"
		:style="_style+'margin:'+margin"
		@touchstart="handleThreadTouchStart"
		@touchend="handleThreadTouchEnd"
		@click="$emit('click')">
		<slot></slot>
		<div
			class="ncu-ripple"
			:class="[rippleActive ? 'ripple-active' : '',
					 rippleEndActive ? 'ripple-end' : '']">
		</div>
	</div>
</template>

<script>
	import { throttle } from '../../common/func.js'
    export default {
		name: 'ncu-ripple-wrapper',
		props: {
			margin: {
				type: String,
			},
			_style: {
				type: String,
			}
		},
        data() {
            return {
        		rippleActive: false,
        		rippleEndActive: false,
        		handleThreadTouchStart: throttle(this._handleThreadTouchStart, 50, true),
        		handleThreadTouchEnd: throttle(this._handleThreadTouchEnd, 50, true),
            }
        },
        methods: {
        	_handleThreadTouchStart() {
        		if(!this.rippleActive) {
        			this.rippleActive = true
        		}
        	},
        	_handleThreadTouchEnd() {
        		this.rippleEndActive = true
        		setTimeout(() => {
        			this.rippleActive = false
        			this.rippleEndActive = false
        		}, 200)
        	},
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-ripple-wrapper {
		position: relative;
		overflow: hidden;
	}
	.ncu-ripple {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		opacity: 0;
		background-image: var(--ripple-shadow);
		background-repeat: no-repeat;
		background-position: 50%;
		transform: translate(-50%, -50%) scale(0);
		transform-origin: center center;
		z-index: 10;
	}
	
	.ripple-active {
		transition: transform .2s linear, opacity .2s linear;
		transform: translate(-50%, -50%) scale(10);
		opacity: .25;
	}
	
	.ripple-end {
		transition: transform .2s linear, opacity .2s linear;
		transform: translate(-50%, -50%) scale(10);
		opacity: 0;
	}
	
</style>



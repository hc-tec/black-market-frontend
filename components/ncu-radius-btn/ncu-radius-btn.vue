<template>
	<div 
		class="ncu-radius-btn animate-wave"
		
		:style="{
			animationDelay: `${Math.min(0.1*index, 1.5)}s`,
			marginBottom: text ? '10px' : '0',
		}"
		hover-class="hover-opacity"
		hover-stay-time="100"
		@click="handleClick">
		<div 
			class="ncu-radius-btn__icon shadow-blur"
			:class="[`ncu-radius-btn--size-${size}`]"
			:style="{
				backgroundColor: hollowOut ? color : bgColor,
				color: hollowOut ? bgColor : color,
			}">
			<i :class="icon"></i>
		</div>
		{{ text }}
	</div>
</template>

<script>
    export default {
		props: {
			bgColor: {
				type: String,
				default: 'white'
			},
			color: {
				type: String,
			},
			icon: {
				type: String
			},
			text: {
				type: String
			},
			index: {
				type: Number,
				default: 0,
			},
			size: {
				type: String,
				default: 'normal'
			},
			hollowOut: {
				type: Boolean,
				default: () => false,
			},
		},
        data() {
            return {

            }
        },
		methods: {
			handleClick() {
				this.$emit('click', {
					bgColor: this.bgColor,
					color: this.color,
					text: this.text
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-radius-btn {
		opacity: .9;
		font-size: 1rem;
		display: inline-flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		border-radius: .5em;
		text-align: center;
		position: relative;
		font-size: .9em;
		
		&__icon {
			
			margin: .3em .4em;
			background-color: rgb(237,247,253);
			border-radius: 17px;
			font-weight: bold;
			// box-shadow: 6px 11px 22px -16px #bbbbd8;
			background-image: var(--texture);
				background-position: bottom;
		}
		
		&--size-normal {
			font-size: 1.7em;
			padding: .6em;
		}
		&--size-mini {
			font-size: .9em;
			padding: .4em .6em;
		}
	}
</style>



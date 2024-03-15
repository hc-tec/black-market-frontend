<template>
	<div 
		class="ncu-category-item"
		hover-class="hover-opacity"
		hover-stay-time="100"
		@click="$emit('click', index)">
		<div 
			class="ncu-category-item__icon shadow-blur"
			:style="{
				backgroundColor: hollowOut ? 'var(--main-bg-color)' : bgColor,
				color: hollowOut ? bgColor : 'white'
			}">
			<i :class="icon"></i>
		</div>
		<p class="ncu-category-item__text">
			{{ text }}
		</p>
		<span 
			class="ncu-category-item__arrow cuIcon-right">
		</span>
	</div>
</template>

<script>
    export default {
		props: {
			icon: {
				type: String,
			},
			text: {
				type: String,
			},
			bgColor: {
				type: String,
			},
			index: {
				type: Number,
			},
			hollowOut: {
				type: Boolean,
				default: () => false,
			},
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-category-item {
		opacity: .9;
		position: relative;
		display: flex;
		align-items: center;
		width: 90%;
		padding: .8em 1.2em;
		margin: 0 auto;
		margin-bottom: .6em;
		border-radius: 10px;
		background-color: var(--main-lighter-color);
		
		&__icon {
			color: white;
			font-size: 1.4em;
			padding: .5em;
			margin-right: 20px;
			background-color: rgb(237,247,253);
			border-radius: 17px;
			font-weight: bold;
			// box-shadow: 6px 11px 22px -16px #bbbbd8;
			background-image: var(--texture);
				background-position: bottom;
		}
		&__text {
			
		}
		&__arrow {
			position: absolute;
			right: 10px;
			color: var(--main-light-color);
		}
	}
</style>



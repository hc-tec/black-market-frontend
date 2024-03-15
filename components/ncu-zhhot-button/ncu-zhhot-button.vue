<template>
	<div 
		class="ncu-zhhot-button animate-wave"
		:style="{
			backgroundColor: bgColor,
			color: color,
			animationDelay: `${Math.min(0.1*index, 1)}s`,
		}"
		hover-class="hover-opacity"
		hover-stay-time="0"
		@click="handleClick">
		<span class="ncu-zhhot-button__icon">
			<i :class="icon"></i>
		</span>
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
			}
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
	.ncu-zhhot-button {
		background-image: var(--texture);
		background-position: bottom;
		padding: .8em 2.2em;
		font-size: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		border-radius: .5em;
		text-align: center;
		position: relative;
		width: 100%;
		
		&__icon {
			margin-right: .4em;
			background-color: rgb(237,247,253);
			border-radius: 50%;
			padding: .3em;
		}
	}
</style>



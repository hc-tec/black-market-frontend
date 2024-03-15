<template>
	<div 
		class="ncu-float-btn"
		:style="{
			right: `${right}em`,
			bottom: `${bottom}em`,
		}">
		<button
			class="cu-btn"
			hover-class="hover-opacity"
			hover-stay-time="100"
			@click="$emit('click')">
			<slot></slot>
		</button>
	</div>
</template>

<script>
    export default {
		props: {
			right: {
				type: Number,
				default: () => 2
			},
			bottom: {
				type: Number,
				default: () => 5
			},
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-float-btn {
		position: fixed;
		
		.cu-btn {
			// box-shadow: 0.3rem 0.3rem 0.6rem hsla(215,46%,78%,0.8),-0.3rem -0.3rem 0.6rem hsla(215,46%,108%,0.8);
			width: 50px;
			height: 50px;
			border-radius: 50%;
			transition: box-shadow .2s;
			color: var(--nav-btn-color);
			background-color: var(--nav-btn-bg-color);
			box-shadow: var(--main-shadow);
			font-size: 1.2em;
		}
		
		.in {
			// box-shadow: 0 0 0 rgba(163,177,198,0.6),-0 -0 0 rgba(236,240,241,0.6),3px 3px 5px rgba(163,177,198,0.6) inset,-3px -3px 3px hsla(0,0%,100%,0.3) inset;
		}
		
	}
</style>



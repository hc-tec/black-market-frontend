<template>
	
	<div class='ncu-global-loader__content'>
		<div>
			<div>
				<div>
					<div>
						<div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
		
	
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes rotate2 {
		0% {
			transform: rotate(0deg);
			border-top-color: rgba(0, 0, 0, 0.5);
		}
		50% {
			transform: rotate(180deg);
			border-top-color: var(--loading-elem-color);
		}
		100% {
			transform: rotate(360deg);
			border-top-color: rgba(0, 0, 0, 0.5);
		}
	}
	.ncu-global-loader__content {
		position: relative;
		margin: 0 auto;
		width: 150px;
		height: 150px;
		display: block;
		overflow: hidden;
		border-radius: 50%;
		padding: 8px;
		border: 2px solid transparent;
		animation: rotate linear 3.5s infinite;
		animation: rotate2 4s infinite linear;
		
		& div {
			height: 100%;
			border-radius: 50%;
			padding: 8px;
			border: 2px solid transparent;
			animation: rotate linear 3.5s infinite;
			animation: rotate2 4s infinite linear;
		}
	}
</style>



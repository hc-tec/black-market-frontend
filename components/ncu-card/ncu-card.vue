<template>
	<div class="ncu-card">
		<div class="ncu-card__title">
			{{ title }}<span class="cuIcon-right" style="font-size: 10px;"></span>
		</div>
		<div class="ncu-card__subtitle">
			{{ subTitle }}
		</div>
		<image 
			class="ncu-card__icon"
			mode="widthFix"
			:src="icon">
		</image>
		<div class="ncu-card__footer">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "ncu-card",
		props: {
			title: {
				type: String,
			},
			subTitle: {
				type: String,
			},
			icon: {
				type: String,
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.ncu-card {
	padding: 20px 21px;
	height: auto;
	color: var(--main-color);
	background-color: var(--main-bg-color);
	border-radius: 30px;
	position: relative;
	border-top-right-radius: 60px;
	&__title {
		font-size: 1.15rem;
		font-weight: 500;
	}
	
	&__subtitle {
		color: var(--main-light-color);
	}
	
	&__icon {
		transform: rotate(10deg);
		position: absolute;
		width: 40%;
		right: -10px;
		top: -10px;
	}
	
	&__footer {
		font-size: 12px;
		margin-top: 10px;
		color: var(--main-light-color);
	}
	
}
</style>
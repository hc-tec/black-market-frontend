<template>
	<div 
		class="ncu-profile-card-tab animate-slide-up"
		:style="{
			animationDelay: `${Math.min(0.5*index, 1)}s`
		}">
		<div class="ncu-profile-card-tab-header">
			<p class="ncu-profile-card-tab__title">
				{{ title }}
			</p>
			<p 
				class="ncu-profile-card-tab__link"
				@click="$emit('click', title)">
				<span>{{ link }}</span>
				<span class="cuIcon-right"></span>
			</p>
		</div>
		<slot></slot>
	</div>
</template>

<script>
    export default {
		name: 'ncu-profile-card-tab',
		props: {
			title: {
				type: String,
			},
			link: {
				type: String,
			},
			index: {
				type: Number,
			}
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-profile-card-tab {
		background-color: var(--main-bg-color);
		box-shadow: var(--main-shadow);
		padding: 10px 20px;
		border-radius: 10px;
		margin-bottom: 10px;
		position: relative;
		
		&-header {
			margin-bottom: 15px;
		}
		
		&__title {
			font-size: 1rem;
			font-weight: bolder;
		}
		
		&__link {
			position: absolute;
			top: 12px;
			right: 10px;
			font-size: .7rem;
			color: var(--main-light-color);
			display: flex;
			align-items: center;
			justify-content: center;
			
			.cuIcon-right {
				color: var(--main-color);
				font-weight: bolder;
			}
		}
		
	}
	
</style>



<template>
	<ncu-ripple-wrapper
		@click="$emit('click')">
		<div 
			class="ncu-settings-item animate-move-left"
			:style="{
				animationDelay: `${0.1*index}s`
			}">
			<span class="ncu-settings-item__label">
				{{ label }}
			</span>
			<div class="ncu-settings-item-right">
				<div class="ncu-settings-item__content text-ellipsis-1">
					<slot></slot>
				</div>
				<span 
					v-if="arrow"
					class="ncu-settings-item__arrow">
				</span>
			</div>
		</div>
	</ncu-ripple-wrapper>
</template>

<script>
    export default {
		props: {
			label: {
				type: String,
			},
			arrow: {
				type: Boolean,
				default: () => true
			},
			index: {
				type: Number,
			},
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-settings-item {
		
		position: relative;
		padding: 25px 30px;
		background-color: var(--main-bg-color);
		
		&__label {
			font-size: 14px;
			font-weight: bold;	
		}
		
		&-right {
			display: flex;
			align-items: center;
			position: absolute;
			right: 20px;
			top: 50%;
			transform: translateY(-50%);
		}
		
		&__content {
			display: -webkit-box;
			font-size: 14px;
			color: var(--main-light-color);
			font-weight: bold;
			max-width: 120px;
			padding-right: 10px;
		}
		
		&__arrow {
			margin-left: 20px;
			width: 3px;
			height: 12px;
			border-radius: 10px;
			background-color: var(--setting-item-bar-color);
		}
	}
</style>



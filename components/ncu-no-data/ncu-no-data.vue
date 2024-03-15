<template>
	<div
		class="no-data">
		<span 
			:class="icon"
			:style="{
				fontSize: getIconSize,
			}">
		</span>
		<p>{{ text }}</p>
		<slot></slot>
	</div>
	
</template>

<script>
    export default {
		props: {
			icon: {
				type: String,
				default: 'cuIcon-pick'
			},
			text: {
				type: String,
				default: '-- 我也是有底线的 --'
			},
			size: {
				type: String,
				default: () => 'small',
			},
		},
        data() {
            return {

            }
        },
		computed: {
			getIconSize() {
				const IconSizeMap = {
					normal: '6em',
					small: '2em',
				}
				const defaultSize = IconSizeMap.normal
				return IconSizeMap[this.size] || defaultSize
			}
		}
    }
</script>

<style lang="scss" scoped>
	.no-data {
		text-align: center;
		color: var(--main-light-color);
		margin: 1rem 0;
	}
	[class*=cuIcon] {
		font-size: 6em;
	}
</style>



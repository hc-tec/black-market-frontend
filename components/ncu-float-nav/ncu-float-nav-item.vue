<template>
	<div 
		class="ncu-float-nav-item"
		:class="[active ? 'active' : '',]"
		@click="$emit('click')">
		{{ item.text }}
	</div>
</template>

<script>
    export default {
		props: {
			item: {
				type: Object,
			},
			active: {
				type: Boolean,
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
	.ncu-float-nav-item {
		padding: 8px 6px;
		text-align: center;
		
		&.active {
			color: var(--active-color);
		}
		
	}
</style>



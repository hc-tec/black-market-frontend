<template>
	<div class="ncu-chat-operation">
		<ncu-icon-wrapper
			class="ncu-chat-operation-wrapper"
			v-for="(item,index) in items"
			:key="item.icon"
			:icon="item.icon"
			:label="item.label"
			@click="$emit('click', index)">
		</ncu-icon-wrapper>
	</div>
</template>

<script>
    export default {
		props: {
			items: {
				type: Array,
			},
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss">
	.ncu-chat-operation {
		
		display: flex;
		justify-content: baseline;
		flex-wrap: wrap;
		
		[class*=ncu-icon-wrapper__icon] {
			background-color: var(--main-bg-color);
		}
	}
</style>



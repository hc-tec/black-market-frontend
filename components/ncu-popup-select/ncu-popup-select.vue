<template>
	<ncu-popup-confirm-modal
		:open="open"
		:title="title"
		:closeOnClickLayer="closeOnClickLayer"
		:during="during"
		:direction="direction"
		:needCancelBtn="needCancelBtn"
		:needConfirmBtn="needConfirmBtn"
		@cancel="$emit('cancel')"
		@confirm="$emit('confirm')"
		@layer-click="$emit('layer-click')"
		@lock-open="$emit('lock-open', false)">
		
		<div class="ncu-popup-select">
			<ncu-popup-option
				v-for="item in items"
				:key="item.value"
				:active="value===item.value"
				@click="$emit('input', item.value)">
				{{ item.label }}
			</ncu-popup-option>
		</div>
		
	</ncu-popup-confirm-modal>
</template>

<script>
    export default {
		props: {
			open: {
				type: Boolean,
				default: () => false
			},
			title: {
				type: String
			},
			closeOnClickLayer: {
				type: Boolean,
				default: () => true
			},
			during: {
				type: Number,
				default: () => 500
			},
			needConfirmBtn: {
				type: Boolean,
				default: () => true
			},
			needCancelBtn: {
				type: Boolean,
				default: () => true
			},
			items: {
				type: Array,
				default: () => [
					{
						label: 'test',
						value: 'test'
					}
				]
			},
			value: {
				type: [String, Number, Boolean],
			},
			direction: {
				type: String,
				default: "bottom"
			},
		},
		model: {
			prop: 'value',
			event: 'input'
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-popup-select {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}
</style>



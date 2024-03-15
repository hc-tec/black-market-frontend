<template>
	<picker 
		:value="index" 
		:range="items"
		@change="change">
		<div class="picker">
			<v-input 
				v-model="value"
				:icon="icon"
				:size="size"
				:placeholder="placeholder"
				disabled>
			</v-input>
		</div>
	</picker>
</template>

<script>
    export default {
		name: 'ncu-picker',
		props: {
			value: {
				type: String,
				default: () => ''
			},
			items: {
				type: Array,
				default: () => []
			},
			placeholder: {
				type: String,
				default: () => '请选择'
			},
			icon: {
				type: String,
				default: () => ''
			},
			size: {
				type: String,
				default: 'normal'
			}
		},
		model: {
			prop: 'value',
			event: 'input'
		},
        data() {
            return {
				index: 0,
            }
        },
		watch: {
			
		},
		methods: {
			change(e) {
				const index = +e.detail.value
				this.index = index
				this.$emit('input', this.items[index])
			}
		}
    }
</script>

<style lang="scss" scoped>
</style>



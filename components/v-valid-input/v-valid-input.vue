<template>
	<v-input
		v-if="inputType ==='v-input'"
		:icon="icon"
		:placeholder="placeholder"
		:size="size"
		:value="value"
		@input="val => $emit('input', val)"
		@click="$emit('click')"
		@focus="focus"
		@blur="blur">
		<div 
			slot="suffix"
			class="valid-send-btn"
			:class="{
				'cuIcon-forward': !validCodeBtnActive,
				'bg-gradual-blue': !validCodeBtnActive,
				'bg-grey': validCodeBtnActive,
			}"
			@click="handleSendBtnClick">
			<template v-if="validCodeBtnActive">
				{{ waitTime }}
			</template>
		</div>
	</v-input>
	<light-input
		v-else-if="inputType ==='light-input'"
		:icon="icon"
		:placeholder="placeholder"
		:size="size"
		:value="value"
		@input="val => $emit('input', val)"
		@click="$emit('click')"
		@focus="focus"
		@blur="blur">
		<div 
			slot="suffix"
			class="valid-send-btn"
			:class="{
				'cuIcon-forward': !validCodeBtnActive,
				'bg-gradual-blue': !validCodeBtnActive,
				'bg-grey': validCodeBtnActive,
			}"
			@click="handleSendBtnClick">
			<template v-if="validCodeBtnActive">
				{{ waitTime }}
			</template>
		</div>
	</light-input>
</template>

<script>
    export default {
		props: {
			inputType: {
				type: String,
				default: () => 'v-input'
			},
			icon: {
				type: String,
				default: () => ''
			},
			type: {
				type: String,
				default: () => 'text'
			},
			value: {
				type: String || Number,
				default: () => ''
			},
			placeholder: {
				type: String,
			},
			size: {
				type: String,
				default: 'normal'
			},
			disabled: {
				type: Boolean,
				default: () => false
			},
			confirmType: {
				type: String,
				default: () => 'done'
			},
		},
		model: {
			prop: 'value',
			event: 'input'
		},
        data() {
            return {
				validCodeBtnActive: false,
				waitTime: 60,
            }
        },
		methods: {
			handleSendBtnClick() {
				const is_send = this.validCodeBtnActive
				if(is_send) {
					this.$emit('wait-for-time')
				} else {
					this.$emit('send')
				}
			},
			send() {
				this.validCodeBtnActive = true
				this.waitTime = 60
				const se = setInterval(() => {
					if(!this.waitTime) {
						this.validCodeBtnActive = false
						clearInterval(se)
						return
					}
					this.waitTime--
				}, 1000)
			},
			focus(e) {
				this.$emit('focus', e)
			},
			blur(e) {
				this.$emit('blur', e)
			}
		},
		mounted() {
		}
    }
</script>

<style lang="scss" scoped>
	.valid-send-btn {
		width: 40px;
		position: absolute;
		top: 0;
		height: 100%;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 10px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		z-index: 10;
	}
</style>



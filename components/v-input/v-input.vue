<template>
	<div class="v-input-wrapper">
		<textarea
			v-if="type==='textarea'"
			class="v-input v-textarea"
			:type="type"
			:value="value"
			:placeholder="placeholder"
			:cursor="0"
			:selection-start="0"
			:selection-end="0"
			:adjust-position="true"
			:disabled="disabled"
			:confirm-type="confirmType"
			:style="{
				padding: getPaddingBySize,
				paddingLeft: '55px',
				paddingRight: '20px',
			}"
			@input="$emit('input', $event.target.value)"
			@click="$emit('click')"
			@focus="focus"
			@blur="blur"
		 />
		<input 
			v-else
			
			:class="{
				'v-input': true,
				'v-input-disabled': disabled,
			}"
			:type="type"
			:value="value"
			:placeholder="placeholder"
			:cursor="0"
			:selection-start="0"
			:selection-end="0"
			:adjust-position="true"
			:confirm-type="confirmType"
			:style="{
				padding: getPaddingBySize,
				paddingLeft: '55px',
				paddingRight: '20px',
			}"
			@input="$emit('input', $event.target.value)"
			@click="$emit('click')"
			@focus="focus"
			@blur="blur"
		 />
		 <slot name="suffix"></slot>
		 <span 
			class="v-input__icon"
			:class="'cuIcon-'+icon">
		 </span>
	 </div>
</template>

<script>
	/**
	 * @property {String} icon 图标
	 * @property {String} type 类型,可选值：text | number | idcard | digit
	 * @property {String | Number} value 值
	 * @property {String} placeholder 占位符
	 * @property {String} size 大小，可选值：big | normal | mini
	 * @property {Boolean} disabled 是否禁用
	 * @property {String} confirmType 输入框右下角按钮值，可选值：send | search | next | go | done
	 */
    export default {
		props: {
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
				default: 'big'
			},
			disabled: {
				type: Boolean,
				default: () => false
			},
			confirmType: {
				type: String,
				default: () => 'done'
			}
		},
		model: {
			prop: 'value',
			event: 'input'
		},
        data() {
            return {

            }
        },
		computed: {
			getPaddingBySize() {
				const paddingSizeMap = {
					big: '20px 0',
					normal: '13px 0',
					mini: '8px 0'
				}
				const defaultPadding = paddingSizeMap.normal
				return paddingSizeMap[this.size] || defaultPadding
			}
		},
		methods: {
			focus(e) {
				this.$emit('focus', e)
			},
			blur(e) {
				this.$emit('blur', e)
			}
		}
    }
</script>

<style lang="scss">
	.v-input-wrapper {
		position: relative;
		display: block;
		margin: 0;
		padding: 0;
	}
	.v-input {
		border: 1px solid #b0aaaa1a;
		
		height: auto;
		width: 100%;
		font-weight: 500;
		border-radius: 10px;
		font-size: 12px;
		line-height: 22px;
		letter-spacing: 0.5px;
		outline: none;
		color: black;
		background-color: white;
		transition: all 200ms linear;
		box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.06);
		text-align: left;
		&__icon {
			position: absolute;
			top: 50%;
			left: 18px;
			font-size: 24px;
			text-align: left;
			color: #ffeba7;
			transform: translateY(-50%);
			transition: all 200ms linear;
		}
	}
	.v-textarea {
		height: 70px;
	}
	.v-input-disabled {
		
	}
	
</style>



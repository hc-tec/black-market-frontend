<template>
	<div 
		class="ncu-popup-option animate-move-in"
		:class="[
			active ? 'active' : '',
			'ncu-popup-option-size--'+size,
		]"
		@click="$emit('click', index)"
		:style="getStyle">
		<slot></slot>
	</div>
</template>

<script>
	/**
	 * option 选项
	 * @property {String} label 选项表面值
	 * @property {String} value 选项真实值
	 */
	import { cssObjectToString } from '../../common/func.js'
    export default {
		props: {
			active: {
				type: Boolean,
				default: () => false,
			},
			size: {
				type: String,
				default: () => 'normal',
			},
			index: {
				type: Number,
				default: -1
			},
			_style: {
				type: [String, Array, Object],
			}
		},
		computed: {
			getStyle() {
				return cssObjectToString({
					animationDelay: `${Math.min(0.2*this.index, 1)}s`,
					...(this._style || {})
				})
			}
		},
        data() {
            return {

            }
        },
    }
</script>

<style lang="scss" scoped>
	.ncu-popup-option {
		background-color: var(--tag-color);
		margin-bottom: 10px;
		border-radius: 8px;
		min-width: 20%;
		font-size: 12px;
		
		&.active {
			border: 2px solid var(--main-color);
		}
		
		&-size--normal {
			padding: 10px 16px;
			&.active {
				padding: 8px 14px;		
			}
		}
		
		&-size--mini {
			padding: 4px 11px;
			&.active {
				padding: 2px 9px;
			}
		}
		
	}
	
	
</style>



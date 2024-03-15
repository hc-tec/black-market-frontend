<template>
	<div 
		class="ncu-title cu-bar"
		:class="[`ncu-title-type--${type}`]">
		<div 
			:class="[center ? 'center' : '']">
			<label 
				v-if="needIcon"
				class="cuIcon-titles"
				:class="'text-'+iconColor">
			</label>
			<label class="text-bold">
				{{ title }}
			</label>
		</div>
	</div>
</template>

<script>
	/**
	 * title 标题
	 * @description title 标题
	 * @property {String} title 标题内容
	 * @property {String} iconColor icon 颜色
	 * @property {Boolean} center 是否居中 
	 */
    export default {
		name: 'ncu-title',
		props: {
			title: {
				type: String,
			},
			needIcon: {
				type: Boolean,
				default: () => false
			},
			iconColor: {
				type: String,
				default: () => 'grey'
			},
			center: {
				type: Boolean,
				default: () => false
			},
			type: {
				type: String,
				default: 'bgColor'
			}
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-title {
		font-size: 14px;
		color: var(--main-light-color);
	}
	.ncu-title-type--bgColor {
		padding-left: 20px;
		background-color: var(--main-lighter-color);
	}
	.center {
		width: 100%;
		text-align: center;
	}
	
</style>



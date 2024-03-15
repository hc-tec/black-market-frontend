<template>
	
	<div class="ncu-header-wrapper">
		
		<ncu-custom-header
			bgColor="transparent"
			isBack>
		</ncu-custom-header>
		
		<div
			class="ncu-header-wrapper__image-header"
			:style="{
				backgroundColor: config.color,
			}">
			<div
				class="ncu-header-wrapper__texture"
				:class="[config.icon]">
			</div>
			<div class="ncu-header-wrapper-wrapper">
				<div class="ncu-header-wrapper__category-info">	
					<ncu-radius-btn
						color="white"
						hollowOut
						:bgColor="config.color"
						:icon="config.icon">
					</ncu-radius-btn>
					<div class="ncu-header-wrapper__category-info__text">
						<p class="ncu-header-wrapper__category-info__name">
							{{ config.title }}
						</p>
						<slot name="header"></slot>
					</div>
				</div>
				
			</div>
		</div>
		
		
		<div class="ncu-header-wrapper-main">
			<ncu-scroll-wrapper-v2 
				height="calc(92vh - 80px)"
				@scrolltolower="$emit('scrolltolower')"
				@scrolltoupper="$emit('scrolltoupper')">
				<ncu-category-item
					icon="cuIcon-locationfill"
					bgColor="rgb(94,140,251)"
					:text="`当前定位「${schoolZones[selectedSchoolZoneIndex-1].label}」`"
					hollowOut
					@click="schoolZoneItem.open=true">
				</ncu-category-item>
				<slot></slot>
			</ncu-scroll-wrapper-v2>
		</div>
		
		<ncu-popup-select
			v-model="schoolZoneItem.school_zone"
			title="选择校区"
			direction="top"
			:open="schoolZoneItem.open"
			:items="schoolZones"
			@confirm="schoolZoneModifyConfirm"
			@cancel="schoolZoneItem.open=false"
			@layer-click="schoolZoneItem.open=false">
		</ncu-popup-select>
		
	</div>
	
</template>

<script>
	import { schoolZones } from '../../common/config.js'
    export default {
		props: {
			config: {
				type: Object,
				default: {
					title: '',
					icon: '',
					color: '',
				}
			}
		},
        data() {
            return {
				schoolZones: schoolZones,
				schoolZoneItem: {
					school_zone: 0,
					open: false
				},
				selectedSchoolZoneIndex: 1,
            }
        },
		methods: {
			schoolZoneModifyConfirm() {
				const isChange = this.schoolZoneItem.school_zone !== this.selectedSchoolZoneIndex
				this.schoolZoneItem.open = false
				if(!this.schoolZoneItem.school_zone || !isChange) return
				this.selectedSchoolZoneIndex = this.schoolZoneItem.school_zone
				this.$emit('schoolZoneChange', this.selectedSchoolZoneIndex)
			},
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-header-wrapper {
		position: relative;
		top: -90px;
		
		&__image-header {
			width: 100%;
			height: 15em;
			background-image: var(--texture);
			background-position: left;
		}
		
		&-wrapper {
			position: relative;
			width: 100%;
			top: 46%;
			display: flex;
			flex-direction: column;
		}
		
		&__category-info {
			padding-left: 10%;
			display: flex;
			align-items: center;
			
			&__text {
				color: #dddddd;
				margin-left: 1em;
			}
			&__name {
				color: white;
				font-size: 2em;
			}
		}
		
		&__texture {
			position: absolute;
			width: 100%;
			font-size: 17em;
			top: 9%;
			left: 43%;
			color: #ffffff14;
		}
		
		
		
		&-main {
			background-color: var(--main-bg-color);
			position: relative;
			top: -2em;
			border-top-left-radius: 1em;
			border-top-right-radius: 1em;
			overflow: hidden;
			padding: 1em 0;
		}
	}
</style>



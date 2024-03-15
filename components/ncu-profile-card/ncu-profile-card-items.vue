<template>
	<ncu-profile-card-tab
		:title="title"
		:link="link"
		:index="cardIndex"
		@click="$emit('click', $event)">
		<div class="ncu-profile-card-items-wrapper">
			
			<ncu-ripple-wrapper 
				style="margin: 0 2% 2% 0;width: 48%;"
				v-for="(stat,index) in items"
				:key="stat.text"
				:style="{
					width: `${(index === items.length-1 && items.length % 2 !== 0) ? 100 : 48}%`,
				}"
				@click="$emit('handleItemClick', title, index)">
				<div
					class="ncu-profile-card-items shadow-blur">
					<div class="ncu-profile-card-items-content">
						<div 
							class="ncu-profile-card-items__icon shadow-blur"
							:style="{
								backgroundColor: stat.color
							}">
							<span	
								:class="stat.icon">
							</span>
						</div>
						<div 
							class="ncu-profile-card-items__text">
							{{ stat.text }}
						</div>
					</div>
					<span class="ncu-profile-card-items__count">
						{{ stat.count }}
					</span>
				</div>
			</ncu-ripple-wrapper>
			
		</div>
	</ncu-profile-card-tab>
</template>

<script>
	import ncuProfileCardTab from './ncu-profile-card-tab.vue'
    export default {
		props: {
			items: {
				type: Array
			},
			title: {
				type: String,
			},
			link: {
				type: String,
			},
			cardIndex: {
				type: Number,
			}
		},
		components: {
			ncuProfileCardTab
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-profile-card-items {
		
		&-wrapper {
			display: flex;
			flex-wrap: wrap;
		}
		
		width: 100%;
		display: flex;
		font-size: 12px;
		padding: 10px;
		position: relative;
		border-radius: 15px;
		background-color: var(--main-lighter-color);
		opacity: .9;
		font-size: .9em;
		
		&-content {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		
		&__icon {
			color: white;
			font-size: 1em;
			padding: .7em;
			background-color: rgb(237,247,253);
			border-radius: 17px;
			font-weight: bold;
			// box-shadow: 6px 11px 22px -16px #bbbbd8;
			background-image: var(--texture);
				background-position: bottom;
			margin-bottom: 3px;
		}
		
		&__text {
			
		}
		
		
		
		&__count {
			position: absolute;
			top: 15px;
			right: 15px;
			font-size: 14px;
		}
	}
</style>



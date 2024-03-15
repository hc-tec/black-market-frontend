<template>
	<div class="user-info-card">
		<div class="user-info-card-header">
			<ncu-avatar
				class="user-info-card__avatar"
				size="large"
				:src="userInfo.avatar">
			</ncu-avatar>
			<div class="user-info-card-main-info">
				<div class="user-info-card__user-name">
					<p :class="{
						off: !userInfo.uonline
					}">
						{{ userInfo.user_name }}
					</p>
				</div>
				<p
					class="user-info-card__student_id">
					学号：{{ userInfo.student_id }}
				</p>
			</div>
		</div>
		<div class="user-info-card-body">
			<div
				class="user-info-card__profile">
				<span class="cuIcon-write"></span>
				<p>{{ userInfo.profile }}</p>
			</div>
			
			<div class="user-info-card__location">
				<span class="cuIcon-location"></span>
				<p>{{ userInfo.school_zone }}</p>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
		props: {
			userInfo: {
				type: Object,
			}
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	.user-info-card {
		display: flex;
		flex-direction: column;
		font-size: 1.2em;
		
		._div {
			margin-top: 5px;
		}
		
		&-header {
			display: flex;
		}
		
		&-main-info {
			
		}
		
		&__avatar {
			margin-right: 15px;
		}
		
		&__user-name {
			display: inline-block;
			position: relative;
			font-size: 1.5em;
			font-weight: bold;
			margin-bottom: 10px;
		}
		
		.off {
			&::after {
				content: "off";
				font-size: 12px;
				position: absolute;
				top: 0;
				right: -30px;
				padding: 0 12rpx;
				background-color: rgb(142,142,142);
				color: white;
				border-radius: 5000rpx;
			}
		}
		
		&__profile {
			display: flex;
			align-items: center;
		}
		
		&__location {
			display: flex;
			align-items: center;
			
			
		}
		
		[class*=cuIcon] {
			font-size: 18px;
			margin-right: 5px;
		}
		
	}
</style>



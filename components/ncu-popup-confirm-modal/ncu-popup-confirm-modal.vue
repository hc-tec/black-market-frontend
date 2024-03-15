<template>
	<ncu-popup-modal
		:open="open" 
		:closeOnClickLayer="closeOnClickLayer"
		:during="during"
		:title="title"
		:keyboardHeight="keyboardHeight"
		:direction="direction"
		@layer-click="$emit('layer-click')"
		@lock-open="$emit('lock-open', false)">
		<div class="ncu-popup-confirm-modal__content">
			<slot></slot>
		</div>
		<div class="ncu-popup-confirm-modal__btn-group">
			<ncu-button 
				v-if="needCancelBtn"
				class="ncu-popup-confirm-modal__btn"
				width="100%"
				padding="20px 0"
				:radius="false"
				@click="$emit('cancel')">
				{{ cancelBtnText }}
			</ncu-button>
			<ncu-button 
				v-if="needConfirmBtn"
				class="ncu-popup-confirm-modal__btn"
				bgColor="blue"
				width="100%"
				padding="20px 0"
				:radius="false"
				@click="$emit('confirm')">
				{{ confirmBtnText }}
			</ncu-button>
		</div>
	</ncu-popup-modal>
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
			keyboardHeight: {
				type: Number,
				default: () => 0
			},
			cancelBtnText: {
				type: String,
				default: '取消'
			},
			confirmBtnText: {
				type: String,
				default: '确认'
			},
			direction: {
				type: String,
				default: "bottom"
			}
		},
        data() {
            return {
				
            }
        }
    }
</script>

<style lang="scss">
	.ncu-popup-confirm-modal__btn-group {
		margin-top: 30px;
		display: flex;
		justify-content: space-around;	
	}
	
	.ncu-popup-confirm-modal__btn {
		border-radius: 5px;
		overflow: hidden;
		font-weight: bold;
		width: 100%;
		margin: 0 5px;
	}
	.ncu-popup-confirm-modal__content {
		max-height: 50vh;
		overflow: auto;
	}
</style>



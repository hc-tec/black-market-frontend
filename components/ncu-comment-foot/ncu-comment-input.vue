<template>
	<div 
		class="ncu-comment-input-wrapper"
		@click="focus=true">
		
		<ncu-popup-modal 
			ref="popupModal"
			:open="modalConfig.open"
			:keyboardHeight="keyboardHeight"
			_style="padding: 10px 30px 15px 30px;"
			@layer-click="layerClick"
			closeOnClickModal>
			
						
			<div class="ncu-comment-input">
				<textarea
					class="input"
					v-model="message"
					maxlength="1024" 
					cursor-spacing="10" 
					placeholder-style="color:var(--main-light-color);"
					:hold-keyboard="false"
					:style="{
						height: inputFull ? '15em' : '5em'
					}"
					:placeholder="placeholder"
					:adjust-position="false"
					:focus="focus" 
					:auto-blur="false"
					:show-confirm-bar="false"
					@focus="keyboardUp"
					@blur="keyboardDown"
				/>
				<span 
					class="cuIcon-full full-btn"
					@click="fullBtnClick">
				</span>
				<div class="ncu-comment-input-func">
					<div 
						class="cuIcon-emoji emoji"
						@click="emojiClickOpen">
						
					</div>
				</div>
				<div class="ncu-comment-input-operation">
					<ncu-radius-btn
						bgColor="rgb(94,140,251)"
						color="white"
						icon="cuIcon-forwardfill"
						@click="messageSend">
					</ncu-radius-btn>
				</div>
				<ncu-emoji 
					ref="ncuEmoji"
					:open="emojiOpen"
					@emojiClick="emojiClick">
				</ncu-emoji>
			</div>
		
		
		</ncu-popup-modal>
	</div>
</template>

<script>
    export default {
		props: {
			active: {
				type: Boolean,
				default: false,
			},
			placeholder: {
				type: String,
				default: '输入评论'
			},
		},
        data() {
            return {
				modalConfig: {
					open: false,
				},
				focus: true,
				loseFocus: false,
				keyboardHeight: 0,
				emojiHeight: 0,
				emojiOpen: false,
				message: '',
				inputFull: false,
				cursor: 0,
				isRecalcuHeight: false,
            }
        },
		methods: {
			keyboardUp(e) {
				this.loseFocus = false
				if(!this.emojiOpen || this.isRecalcuHeight) {
					this.keyboardHeight =  e.detail.height
				} else {
					this.keyboardHeight = this.emojiHeight+e.detail.height
				}
			},
			keyboardDown(e) {
				this.cursor = e.detail.cursor
				this.loseFocus = true
				if(!this.emojiOpen || this.isRecalcuHeight) {
					this.keyboardHeight = 0
				} else {
					this.keyboardHeight = this.emojiHeight
				}
			},
			modalOpen() {
				this.modalConfig.open = true
			},
			layerClick() {
				this.modalConfig.open = false
				setTimeout(() => {
					this.$emit('handleClose')
				}, 500)
				
			},
			emojiClickOpen() {
				if(this.emojiOpen || this.isRecalcuHeight) {
					this.keyboardHeight = 0
				} else {
					this.keyboardHeight = this.emojiHeight
				}
				this.emojiOpen = !this.emojiOpen
				// setTimeout(() => {
				// 	this.$refs.popupModal.getContentHeight()
				// }, 1000)
			},
			emojiClick({ name, detail }) {
				setTimeout(() => {
					this.message = this.message.slice(0, this.cursor)+name+this.message.slice(this.cursor)
					this.cursor += name.length
				}, 100)
				// this.message += name
			},
			fullBtnClick() {
				this.inputFull = !this.inputFull
				this.keyboardHeight = 0
				setTimeout(() => {
					this.$refs.popupModal.getContentHeight()
					this.isRecalcuHeight = this.emojiOpen
				}, 500)
				
			},
			messageSend() {
				this.$emit('messageSend', {
					message: this.message,
					clear: this.clearMessage,
				})
			},
			clearMessage() {
				this.message = ''
			}
		},
		watch: {
			active() {
				this.modalConfig.open = this.active
			}
		},
		mounted() {
			this.emojiHeight = this.$refs.ncuEmoji.height
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-comment-input {
		width: 100%;
		height: fit-content;
		box-shadow: 0 -1rpx 6rpx -4rpx rgba(0, 0, 0, 0.1);
		background-color: var(--main-bg-color);
		display: flex;
		flex-direction: column;
		padding-top: 10px;
		transition: max-height .3s;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		position: relative;
		
		.input {
			line-height: 1.75;
			height: 5em;
			width: 100%;
			font-size: 1.2em;
			padding: 15px 25px 0 0;
			max-height: calc(100vh - 300px);
			transition: height .3s;
			color: var(--main-color);
		}
		.emoji {
			font-size: 2em;
		}
		&-func {
			padding: 5px 0;
		}
		&-operation {
			border-top: 2px solid var(--main-lighter-color);
			display: flex;
			justify-content: flex-end;
			margin-bottom: 10px;
		}
		.full-btn {
			position: absolute;
			top: 15px;
			right: 4px;
			font-size: 1.8em;
			z-index: 10;
		}
	}
</style>



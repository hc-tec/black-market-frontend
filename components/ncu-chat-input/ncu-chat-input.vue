<template>
	<div
		class="ncu-chat-input cu-bar" 
		:class="{
			'foot': fixed,
			'padding-lr-lg': padding
		}">
		<div class="input-compoment">
			
		
			<slot></slot>
			<textarea 
				class="input" 
				v-model="message"
				maxlength="300" 
				cursor-spacing="10"
				auto-height	
				placeholder-style="color:var(--main-light-color);"
				:placeholder="placeholder"
				:adjust-position="false"
				:auto-blur="false"
				:show-confirm-bar="false"
				:focus="focus" 
				@focus="InputFocus" 
				@blur="InputBlur">
			</textarea>
			<div
				v-if="emoij"
				class="action" 
				hover-class="hover-opacity"
				hover-stay-time="100"
				@click="emojiClickOpen">
				<text :class="[`cuIcon-${emojiOpen ? 'keyboard' : 'emoji'}`]"></text>
			</div>
			<div
				v-if="message"
				class="action"
				hover-class="hover-opacity"
				hover-stay-time="100"
				@click="send">
				<text class="cuIcon-forwardfill send-btn"></text>
			</div>
			<div 
				v-else 
				class="action"
				hover-class="hover-opacity"
				hover-stay-time="100"
				@click="operationClickOpen">
				<text :class="[`cuIcon-${operationOpen ? 'keyboard' : 'roundadd'}`]"></text>
			</div>
		</div>
		<div 
			v-if="emojiOpen || operationOpen"
			class="input-operation">
			<ncu-emoji
				style="width: 100%;"
				:open="emojiOpen"
				@emojiClick="emojiClick">
			</ncu-emoji>
			<ncu-chat-operation 
				style="width: 100%;"
				v-if="operationOpen"
				:items="operationItems"
				@click="operationItemsClick">
			</ncu-chat-operation>
		</div>
		
	</div>
</template>

<script>
	import ncuChatOperation from './ncu-chat-operation.vue'
	import { uniFileUploader } from '../../common/http.js'
	import { image_upload_api } from '../../common/api.js'
    export default {
		components: {
			ncuChatOperation,
		},
		props: {
			fixed: {
				type: Boolean,
				default: () => true
			},
			emoij: {
				type: Boolean,
				default: () => true
			},
			padding: {
				type: Boolean,
				default: () => false
			}
		},
        data() {
            return {
				keyboardHeight: 0,
				defaultHeight: Object.freeze(250),
				message: '',
				cursor: 0,
				focus: false,
				emojiOpen: false,
				operationOpen: false,
				operationItems: [
					{
						icon: 'cuIcon-pic',
						label: '图片'
					},
				],
				isLoading: false,
            }
        },
		methods: {
			inputFocusActivate() {
				this.focus = false
				setTimeout(() => {
					this.focus = true
				}, 0)
			},
			InputFocus(e) {
				if(	!this.keyboardHeight 
					|| this.defaultHeight === this.keyboardHeight) {
					this.keyboardHeight = e.detail.height || this.defaultHeight
				}
				if(this.emojiOpen) {
					this.$emit('keyboardHeightChange', {
						height:  this.keyboardHeight,
						condition: true,
					})
				} else {
					this.$emit('keyboardHeightChange', {
						height:  this.keyboardHeight,
						condition: true,
					})
				}
				this.emojiOpen = false
				this.operationOpen = false
			},
			InputBlur(e) {
				this.cursor = e.detail.cursor
				if(this.emojiOpen || this.operationOpen) {
					return
				}
				this.$emit('keyboardHeightChange', {
					height:  0,
					condition: true,
				})
			},
			emojiClickOpen() {
				if(this.emojiOpen) {
					this.$emit('keyboardHeightChange', {
						height: 0,
						condition: true,
					})
				} else {
					
					this.$emit('keyboardHeightChange', {
						height: this.keyboardHeight || this.defaultHeight,
						condition: true,
					})
					this.operationOpen = false
				}
				this.emojiOpen = !this.emojiOpen
			},
			operationClickOpen() {
				if(this.operationOpen) {
					this.$emit('keyboardHeightChange', {
						height: 0,
						condition: true,
					})
				} else {
					
					this.$emit('keyboardHeightChange', {
						height: this.keyboardHeight || this.defaultHeight,
						condition: true,
					})
					this.emojiOpen = false
				}
				this.operationOpen = !this.operationOpen
			},
			emojiClick({ name, detail }) {
				setTimeout(() => {
					this.message = this.message.slice(0, this.cursor)+name+this.message.slice(this.cursor)
					this.cursor += name.length
				}, 100)
				// this.message += name
			},
			operationItemsClick(index) {
				[this.choosePic, ][index]()
			},
			choosePic() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: async (res) => {
						const chosenImgs = res.tempFilePaths
							, len = chosenImgs.length
						for(let i=0;i<len;++i) {
							this.isLoading = true
							let img = chosenImgs[i]
							const { res } = await uniFileUploader(image_upload_api, img, 1002)
							img = res.data.data.path
							if(!img) return
							this.sendMessage(img, 'img')
						}
						this.isLoading = false
					}
				})
			},
			async handleAvatarUpload(imgPath) {
				const {res, err} = await uniFileUploader(image_upload_api, 
												imgPath,
												1002)
				if(err) {
					this.$emit('messageOpen', [err, 'danger'])
					return
				}
				return res
			},
			send() {
				if(!this.message.length) return
				this.sendMessage(this.message)
				this.message = ''
			},
			sendMessage(message, type) {
				this.$emit('keyboardHeightChange', {
					height:  0,
					condition: true,
				})
				this.emojiOpen = false
				this.operationOpen = false
				this.$emit('send', {
					message,
					type: type || 'text'
				})
			},
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-chat-input {
		padding: 10px 10px;
			
		&.cu-bar {
			background-color: var(--main-lighter-color);
			box-shadow: none;
			position: absolute;
			bottom: 0;
			display: flex;
			flex-direction: column;
		}
		.input-compoment {
			width: 100%;
			display: flex;
			align-items: flex-end;
			justify-content: space-around;
		}
		.input-operation {
			width: 100%;
			padding: 20px;
			position: absolute;
			top: 100%;
			text-align: center;
			
		}
		.input {
			padding: 5px 10px;
			width: 77%;
			border-radius: 12px;
			color: var(--main-color);
			background-color: var(--main-bg-color);
			font-size: 1.2em;
			line-height: 1.5;
			min-height: 40px;
			max-height: 120px;
		}
		.action {
			&:last-child {
				margin: 0;
			}
			[class*=cuIcon] {
				color: var(--main-color);
				font-size: 58rpx;
			}
			.send-btn {
				color: rgb(94,140,251);
			}
		}
		
	}
	
</style>



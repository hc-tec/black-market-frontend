<template>
	<div 
		class="ncu-comment-input">
		<div 
			v-show="fakeCommentOpen"
			class="ncu-comment-input__fake">
			<ncu-appreciate
				class="ncu-comment-input__appreciate"
				:num="thread_appreciate"
				:active="thread_isAppreciate"
				@click="appreciate">
			</ncu-appreciate>
			<div 
				class="ncu-comment-input__comment"
				@click="handleInputFocus">
				<textarea 
					class="input"
					maxlength="300" 
					cursor-spacing="10" 
					placeholder-style="color:var(--main-light-color);"
					:placeholder="placeholder"
					:adjust-position="false"
				/>
				
				<!-- <div 
					:class="['cuIcon-'+
							(realCommentOpen ? 'forward' : 'message')]"
					hover-class="scale-out"
					:hover-stay-time="100"
					@click="handleSendBtnClick">
				</div> -->
		
			</div>
		</div>
		
		<ncu-comment-input 
			ref="commentInput"
			:active="realCommentOpen"
			:placeholder="placeholder"
			@handleClose="handleClose"
			@messageSend="handleSendBtnClick">
		</ncu-comment-input>
		
	</div>
</template>

<script>
	/**
	 * 评论输入框 页面组件
	 * @description 评论输入框 页面组件
	 * @property {Number} thread_appreciate	点赞数量
	 * @property {Boolean} thread_isAppreciate 是否点赞  
	 * @property {String} placeholder 输入框占位符 
	 * @property {Boolean} focus 是否获取焦点 
	 * @event {Function} appreciate 点赞事件
	 * @event {Function} realCommentOpen 输入框 focus 事件
	 * @event {Function} handleInputBlur 输入框 blur 时间   
	 */
	import { debounce } from '../../common/func.js'
	import ncuCommentInput from './ncu-comment-input.vue'
    export default {
		components: {
			ncuCommentInput,
		},
		props: {
			thread_appreciate: {
				type: Number
			},
			thread_isAppreciate: {
				type: Boolean,
			},
			placeholder: {
				type: String
			},
			focus: {
				type:  Boolean,
				default: () => false
			}
		},
        data() {
            return {
				realCommentOpen: false,
				fakeCommentOpen: true,
				appreciate: debounce(this._appreciate, 500),
            }
        },
		methods: {
			_appreciate(active) {
				this.$emit('appreciate', { active })
			},
			handleInputFocus() {
				
				this.realCommentOpen = true
				setTimeout(() => {
					this.fakeCommentOpen = false
				}, 500)
				this.$emit('realCommentOpen')
			},
			handleClose() {
				this.realCommentOpen = false
				this.fakeCommentOpen = true
				this.$refs.commentInput.modalOpen()
				this.$emit('inputBlur')
			},
			handleSendBtnClick({ message, clear }) {
				if(message) {
					this.$emit('send', {
						message,
						clear,
					})
				}
			},
		},
		watch: {
			focus() {
				this.realCommentOpen = this.focus
				this.fakeCommentOpen = !this.focus
			}
		}
		
    }
</script>

<style lang="scss" scoped>
	.ncu-comment-input {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 1024;
		box-shadow: 0 -1rpx 6rpx -4rpx rgba(0, 0, 0, 0.1);
		background-color: var(--main-bg-color);
		transition: max-height .3s;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		
		
		&__fake {
			padding: 10px 0;
			width: 100%;
			display: flex;
			align-items: center;
			animation: move-up .5 forwards;
		}
		@keyframes move-up {
			from {
				bottom: 100px;
			} to {
				bottom: 0;
			}
		}
		
		&.focus {
			max-height: 40vh;
			.input {
				
			}
		}
		
		&__appreciate {
			position: absolute;
			top: 50%;
			left: -10px;
			transform: translate(-15px, -50%);
		}
		
		&__comment {
			margin-left: 65px;
			margin-right: 20px;
			width: 100%;
			display: flex;
			align-items: center;
			font-size: 12px;
			
			.input {
				background-color: var(--main-lighter-color);
				margin-right: 10px;
				padding: 10px;
				height: 34px;
				max-height: 30vh;
				width: calc(100% - 19px);
				border-radius: 5px;
				transition: height .3s;
			}
			[class*="cuIcon-"] {
				font-size: 1.3rem;
			}
		}
	}
</style>



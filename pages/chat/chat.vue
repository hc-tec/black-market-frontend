<template>
	<div 
		class="chat"
		:style="{
			bottom: `${keyboardHeight}px`
		}">
		
		<ncu-custom-header
			:title="chatObjectInfo.friend.user_name"
			bgImage="url(http://neumorphic.cn/static/e4a42d15-b8c1-4fb5-ab55-362689d3d364.svg)"
			isBack>
		</ncu-custom-header>
		
		<ncu-scroll-wrapper-v2
			ref="scrollWrapper"
			height="calc(96vh - 80px)">
			<div 
				class="cu-chat">
				<ncu-chat-message
					v-for="(item,index) in chatDetails"
					class="scroll-item"
					:item="item"
					:index="index"
					:key="item.chat_msg"
					@avatarClick="avatarClick">
					
				</ncu-chat-message>
			</div>
		</ncu-scroll-wrapper-v2>
		
		<ncu-message
			:open="messageConfig.open"
			:type="messageConfig.type"
			:message="messageConfig.message"
			@close="messageClose">
		</ncu-message>
		
		<ncu-chat-input
			@messageOpen="messageOpen"
			@keyboardHeightChange="keyboardHeightChange"
			@send="sendMessage($event)">
		</ncu-chat-input>
		
		<ncu-popup-modal
			title="用户信息"
			:open="userDetailsItemOpen"
			@layer-click="userDetailsItemOpen=false">
			<user-info-card 
				:userInfo="chatObjectDetails">
			</user-info-card>
		</ncu-popup-modal>
		
	</div>
</template>

<script>
	import globalData from '../../common/global.js'
	import { FriendDetails_api } from '../../common/api.js'
	import { httpPost } from '../../common/http.js'
    export default {
		onLoad(option) {
			if(option.params) {
				this.chatObjectInfo = JSON.parse(option.params)
				globalData.curChatId = this._generateChatId()
				this.$on('hook:beforeDestroy', () => {
				  globalData.curChatId = null
				})
			}
		},
        data() {
            return {
				keyboardHeight: 0,
				chatObjectInfo: {},
				chatDetails: [],
				messageConfig: {
					open: false,
					type: 'success',
					message: ''
				},
				chatObjectDetails: null,
				userDetailsItemOpen: false,
			}
		},
		methods: {
			async avatarClick(id) {
				await this.getFriendDetails(id)
				this.userDetailsItemOpen = true
			},
			async getFriendDetails(id) {
				if(this.chatObjectDetails) return
				const [res, err] = await httpPost(FriendDetails_api, {
					friend_id: id,
				}, 2506)
				if(err) {
					return
				}
				this.chatObjectDetails = res.data.data
			},
			messageOpen([ message, type ]) {
				this.messageConfig = {
					type: type || 'success',
					message: message,
					open: true
				}
			},
			keyboardHeightChange({ height, condition }) {
				console.log(height)
				this.keyboardHeight = height
			},
			toBottom() {
				setTimeout(() => {
					this.$refs.scrollWrapper.scrollToBottom(this)
				}, 100)
			},
			generateChatId(user_id, friend_id) {
				let [small_id, large_id] = [user_id, friend_id].sort()
				return `${small_id}-${large_id}`
			},
			_generateChatId() {
				const user_id = globalData.userInfo.id
				return this.generateChatId(user_id, this.chatObjectInfo.friend.id)
			},
			sendMessage({ message, type }) {
				const chat = this[`build${type.toUpperCase()}Message`](message)
				// this.chatDetails.push(chat)
				globalData.sendMessage(chat)
				// this.chatLen ++
				this.toBottom()
			},
			buildTEXTMessage(message) {
				return {
					chat_type: 'chat',
					chat_status: 'success',
					chat_msg: message,
					chat_msg_type: 'text',
					chat_user: {
						id: globalData.userInfo.id,
						user_name: globalData.userInfo.user_name,
						avatar: globalData.userInfo.avatar,
					},
					chat_id: this._generateChatId()
				}
			},
			buildIMGMessage(message) {
				return {
					chat_type: 'chat',
					chat_status: 'success',
					chat_msg: message,
					chat_msg_type: 'img',
					chat_user: {
						id: globalData.userInfo.id,
						user_name: globalData.userInfo.user_name,
						avatar: globalData.userInfo.avatar,
					},
					chat_id: this._generateChatId()
				}
			},
			listenMsgRecv() {
				globalData.subscribe(data => {
					this.toBottom()
				})
			},
		},
		created() {
			this.listenMsgRecv()
			this.chatDetails = globalData.chatDetails
		},
		mounted() {
			this.toBottom()
		}
        
    }
</script>

<style lang="scss" scoped>
	.cu-chat {
		padding-bottom: 110rpx;
		vertical-align: top;
		
	}
	.chat {
		position: relative;
		bottom: 0;
		height: 100vh;
		transition: bottom .3s;
	}
</style>



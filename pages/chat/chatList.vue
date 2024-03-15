<template>
	<!-- <ncu-scroll-wrapper
		:refresherEnabled="refresherEnabled"
		:soften="false"
		@change="val => refresherEnabled=val">
		<div class="cu-list menu-avatar">
			<ncu-chat-list-item
				v-for="item in chatList"
				:item="item">
				
			</ncu-chat-list-item>
		</div>
	</ncu-scroll-wrapper> -->
	
	<ncu-scroll-wrapper-v2
		height="calc(96vh - 120px)"
		transition
		@scroll="scrollDistance"
		@scrolltolower="scrolltolower"
		@scrolltoupper="scrolltoupper">
		
		<div
			v-if="chatList.length"
			class="cu-list menu-avatar">
			<ncu-chat-list-item
				v-for="(item,index) in chatList"
				:item="item"
				:index="index"
				@click="toChatRoom">
			</ncu-chat-list-item>
		</div>
		
		<ncu-loading-part
			type="elem"
			margin="20px 0 0 0"
			:active="loadingConfig.isLoading">
		</ncu-loading-part>
		<ncu-no-data 
			v-if="!chatList.length"
			size="normal"
			icon="cuIcon-community"
			text="暂无消息">
		</ncu-no-data>
		
	</ncu-scroll-wrapper-v2>
	
</template>

<script>
	import globalData from '../../common/global.js'
	import { friendView_api, ChatMessage_api } from '../../common/api.js'
	import { httpGet } from '../../common/http.js'
    export default {
		onLoad(option) {
			const user_id = option.id
				, isFriend = globalData.userInfo.id !== user_id
			if(isFriend) {
				globalData.connectSubscribe(() => {
					this._chatRoomConnect(user_id)
					// getFriendInfo
					// pushToChatList
					const params = {
						id: 5,
						user_name: '官方',
					}
					uni.navigateTo({
						url: `/pages/chat/chat?params=${params}`
					})
				})
			}
		},
        data() {
            return {
				refresherEnabled: true,
				chatList: [],
				chatMap: {},
				selectedFriendId: -1,
				loadingConfig: {
					isLoading: false,
				}
            }
        },
		methods: {
			scrollDistance(dis) {
			},
			scrolltoupper() {
				// this.userList = []
				// this.getChatList()
			},
			async toChatRoom(item) {
				this.selectedFriendId = item.friend.id
				const chat_id = this._generateChatId()
					, chatRoom = this.chatMap[chat_id]
				if(chatRoom?.chatDetails) {
					globalData.chatDetails = chatRoom.chatDetails
				} else {
					const chatDetails = await this.getChatMessage()
					this.chatMap[chat_id].chatDetails = chatDetails
					globalData.chatDetails = chatDetails
				}
				const params = JSON.stringify(item)
				uni.navigateTo({
					url: `/pages/chat/chat?params=${params}`
				})
			},
			chatRoomConnect() {
				this.chatList.forEach(friend => {
					this._chatRoomConnect(friend.friend.id)
				})
			},
			_chatRoomConnect(friend_id) {
				const websocket = globalData.getWebsocket()
					, user_id = globalData.userInfo.id
					, chat_id = this.generateChatId(user_id, friend_id)
				websocket.send({
					data: JSON.stringify({
						chat_id,
						type: 'connect',
					})
				})
			},
			generateChatId(user_id, friend_id) {
				let [small_id, large_id] = [user_id, friend_id].sort()
				return `${small_id}-${large_id}`
			},
			_generateChatId() {
				const user_id = globalData.userInfo.id
				return this.generateChatId(user_id, this.selectedFriendId)
			},
			dispatchMsg() {
				globalData.subscribe(data => {
					const recvChatId = data.chat_id
						, chatIndex = this.chatMap[recvChatId].index
						, chatRoom = this.chatList[chatIndex]
					this.messageStore(recvChatId, data)
					this.messageUpdate(recvChatId, chatRoom.message, data)
				})
			},
			messageStore(recvChatId, data) {
				const chat_id = this._generateChatId()
				if(chat_id === data.chat_id) {
					this.chatMap[recvChatId].chatDetails.push(data)
				}
			},
			messageUpdate(recvChatId, message, data) {
				const curChatId = globalData.curChatId
				message.newest_message = data.chat_msg
				message.newest_time = data.chat_time
				message.sender = data.chat_user.id
				if(curChatId === recvChatId) {
					message.unread_num = 0
				} else {
					++message.unread_num
				}
			},
			async getChatList() {
				this.loadingConfig.isLoading = true
				const [res, err] = await httpGet(friendView_api)
				this.loadingConfig.isLoading = false
				this.chatList = res.data
				globalData.connectSubscribe(() => {
					console.log('connect')
					this.chatRoomConnect()
				})
				// 利用 map 为聊天室设置索引
				const user_id = globalData.userInfo.id
				this.chatList.forEach((chat, index) => {
					const chat_id = this.generateChatId(user_id, chat.friend.id)
					this.chatMap[chat_id] = {}
					this.chatMap[chat_id].index = index
				})
			},
			async getChatMessage() {
				const chat_id = this._generateChatId()
				const [res, err] = await httpGet(ChatMessage_api, {
					chat_id,
				})
				return res.data
			},
			
		},
		created() {
			globalData.initWebsocket()
			this.dispatchMsg()
			this.getChatList()
		}
    }
</script>

<style lang="scss" scoped>
	.cu-list {
		vertical-align: top;
		position: relative;
		
		&::before {
			content: "";
			width: 100%;
			height: 100%;
			background-image: var(--texture);
				// background-position: -69% 46%;
				// background-repeat: no-repeat;
			position: absolute;
			opacity: 1;
			background-size: cover;
			top: 0;
			left: 0;   
			z-index: -1;
		}
	}
</style>



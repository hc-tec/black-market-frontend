<template>
	<div class="friends">
		
		<ncu-float-nav
			:navItems="navItems"
			@click="navChange">
		</ncu-float-nav>
		
		<ncu-scroll-wrapper-v2
			height="calc(96vh - 120px)"
			@scrolltoupper="flushUserList">
			
			<ncu-chat-list-item
				v-if="userList.length"
				v-for="(user,index) in userList"
				:item="getItem(user)"
				:key="user.id"
				:index="index"
				@click="handleItemClick(index)">
			</ncu-chat-list-item>
			
			<ncu-loading-part
				type="elem"
				margin="20px 0 0 0"
				:active="loadingConfig.isLoading">
			</ncu-loading-part>
			<ncu-no-data 
				v-if="!userList.length"
				icon="cuIcon-group"
				:text="`「${navItems[activeIndex].text}」暂无数据`"
				size="normal">
			</ncu-no-data>
			
		</ncu-scroll-wrapper-v2>
		
		<ncu-popup-confirm-modal
			title="用户信息"
			:confirmBtnText="getConfirmBtnText"
			:cancelBtnText="getCancelBtnText"
			:open="userDetailsItem.open"
			@confirm="handleConfirmBtnClick"
			@cancel="handleCancelBtnClick"
			@layer-click="userDetailsItem.open=false">
			<user-info-card 
				v-if="selectedUser !== -1"
				:userInfo="selectUserInfo">
			</user-info-card>
		</ncu-popup-confirm-modal>
		
	</div>
	
</template>

<script>
	import globalData from '../../common/global.js'
	import { ChatUserSearch_api, friendView_api, FriendDetails_api } from '../../common/api.js'
	import { httpGet, httpPost, httpPut } from '../../common/http.js'
    export default {
        data() {
            return {
				navItems: [
					{
						text: '我的好友',
					},
					{
						text: '我的申请',
					},
					{
						text: '被拒申请',
					},
					{
						text: '待理申请',
					},
				],
				activeIndex: 0,
				userList: [],
				userListCache: {},
				selectedUser: -1,
				selectUserInfo: {},
				userDetailsItem: {
					open: false,
				},
				loadingConfig: {
					isLoading: false,
				}
				
            }
        },
		computed: {
			getConfirmBtnText() {
				return ["发消息", "撤销申请", "重新申请", "同意添加"][this.activeIndex]
			},
			getCancelBtnText() {
				return ["取消", "取消", "取消", "拒绝"][this.activeIndex]
			}
		},
		methods: {
			flushUserList() {
				this.userList = []
				this.navChange(this.activeIndex, true)
			},
			async navChange(index, flush = false) {
				this.activeIndex = index
				if(	!flush 
					&& typeof this.userListCache[index] !== 'undefined') {
					this.userList = this.userListCache[index]
					return
				}
				this.loadingConfig.isLoading = true
				try {
					const activeIndex = this.activeIndex
					const data = await [
						this.getFriends, 
						this.getApplyingFriends, 
						this.getApplyDenyFriends, 
						this.getFriendsApplyAddMe
					]
					[this.activeIndex]()
					if(activeIndex === this.activeIndex) {
						this.userList = data
						this.userListCache[index] = data
					}
				} catch(e) {
				}
				this.loadingConfig.isLoading = false
			},
			getItem(user) {
				return user
			},
			handleItemClick(index) {
				this.selectedUser = index
				this.viewUserDetails()
			},
			viewUserDetails() {
				this.getFriendDetails()
				this.userDetailsItem.open = true
			},
			async getFriendDetails() {
				const item = this.userList[this.selectedUser]
				const [res, err] = await httpPost(FriendDetails_api, {
					friend_id: item.friend.id
				}, 2506)
				if(err) {
					return
				}
				this.selectUserInfo = res.data.data
			},
			handleCancelBtnClick() {
				const item = this.userList[this.selectedUser];
				[
					this.popupModalClose,
					this.popupModalClose,
					this.popupModalClose,
					this.denyAddAsFriend
				]
				[this.activeIndex](item)
				this.userDetailsItem.open = false
			},
			popupModalClose() {
				this.userDetailsItem.open = false
			},
			async denyAddAsFriend(item) {
				const [res, err] = await httpPut(friendView_api, {
					friend_id: item.friend.id,
					action: "refuse"
				}, 2505)
				if(err) {
					return
				}
				// 从待处理申请列表移除
				this.userList.splice(this.selectedUser, 1)
			},
			handleConfirmBtnClick() {
				const item = this.userList[this.selectedUser];
				[
					this.toChatRoom,
					this.cancelApply,
					this.reApplyAsFriend, 
					this.agreeAddAsFriend
				]
				[this.activeIndex](item)
				this.userDetailsItem.open = false
			},
			toChatRoom(item) {
				
				this.$emit('toChatRoom', item)
				
			},
			async cancelApply(item) {
				const [res, err] = await httpPost(friendView_api, {
					friend_id: item.friend.id,
					action: 'revoke'
				}, 2503)
				if(err) {
					return
				}
				this.userList.splice(this.selectedUser, 1)
			},
			async reApplyAsFriend(item) {
				const [res, err] = await httpPost(friendView_api, {
					friend_id: item.friend.id
				}, 2503)
				if(err) {
					return
				}
				this.userList.splice(this.selectedUser, 1)
			},
			async agreeAddAsFriend(item) {
				const [res, err] = await httpPut(friendView_api, {
					friend_id: item.friend.id
				}, 2505)
				if(err) {
					return
				}
				// 从待处理申请列表移除
				this.userList.splice(this.selectedUser, 1)
			},
			
			async getFriends() {
				const [res, err] = await httpGet(friendView_api)
				return res.data
			},
			async getApplyingFriends() {
				const [res, err] = await httpGet(friendView_api, {
					friend_type: 1
				})
				return res.data
			},
			async getApplyDenyFriends() {
				const [res, err] = await httpGet(friendView_api, {
					friend_type: 3
				})
				return res.data
			},
			async getFriendsApplyAddMe() {
				const [res, err] = await httpGet(friendView_api, {
					role: "friend"
				})
				return res.data
			}
		},
		created() {
			this.navChange(this.activeIndex)
		}
    }
</script>

<style lang="scss" scoped>
</style>



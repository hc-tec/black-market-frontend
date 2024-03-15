<template>
	<div class="search">
		<ncu-custom-header
			title="搜索"
			bgImage="url(http://neumorphic.cn/static/e4a42d15-b8c1-4fb5-ab55-362689d3d364.svg)"
			isBack>
		</ncu-custom-header>
		<div class="ncu-search-content">
			<light-input
				class="ncu-search__input"
				placeholder="搜索"
				confirm-type="search"
				v-model="searchWords"
				@confirm="search">
				<div
					slot="suffix"
					class="cuIcon-search"
					@click="search">
				</div>
			</light-input>
		</div>
		<div class="search-results">
			<ncu-scroll-wrapper-v2
				height="calc(96vh - 120px)">
				<ncu-chat-list-item
					v-for="(user,index) in userList"
					:item="{
						friend: user,
						message: {
							unread_num: 0
						}
					}"
					:key="user.id"
					:index="index"
					@click="viewUserDetails(index)">
				</ncu-chat-list-item>
			</ncu-scroll-wrapper-v2>
		</div>
		
		<ncu-popup-confirm-modal
			title="用户信息"
			confirmBtnText="添加好友"
			:open="userDetailsItem.open"
			@confirm="addAsFriend"
			@cancel="userDetailsItem.open=false"
			@layer-click="userDetailsItem.open=false">
			<user-info-card 
				v-if="selectedUser !== -1"
				:userInfo="userList[selectedUser]">
			</user-info-card>
		</ncu-popup-confirm-modal>
		
	</div>
</template>

<script>
	import globalData from '../../common/global.js'
	import { ChatUserSearch_api, friendView_api } from '../../common/api.js'
	import { httpGet, httpPost } from '../../common/http.js'
    export default {
        data() {
            return {
				searchWords: 't',
				userList: [],
				selectedUser: -1,
				userDetailsItem: {
					open: false,
				}
            }
        },
		methods: {
			search() {
				if(this.searchWords === "") return
				this.userList = []
				this._search()
			},
			async _search() {
				const [res, err] = await httpGet(ChatUserSearch_api, {
					searchWords: this.searchWords,
				})
				this.userList = res.data.filter(user => user.id !== globalData.userInfo.id)
			},
			viewUserDetails(index) {
				this.userDetailsItem.open = true
				this.selectedUser = index
			},
			addAsFriend() {
				this.userDetailsItem.open = false
				this._addAsFriend()
			},
			async _addAsFriend() {
				const [res, err] = await httpPost(friendView_api, {
					friend_id: this.userList[this.selectedUser].id
				}, 1503)
				if(err) {
					
				}
				this.userList.splice(this.selectedUser, 1)
			}
		}
		
    }
</script>

<style lang="scss">
	
	.search {
		.ncu-button {
			padding-left: 0 !important;
			padding-right: 0 !important;
		}
	}
	
	.ncu-search {
		
		&-content {
			padding: 0 0 10px 0;
			margin: 0 10px;
		}
		&__input {
			[class~=light-input] {
				opacity: .6;
				padding: 8px 40px !important;
				background-color: var(--main-bg-color) !important;
			}
		}
	}
	.cuIcon-search {
		position: absolute;
		left: 17px;
		top: 50%;
		font-size: 1.2em;
		transform: translateY(-50%);
		color: var(--main-light-color);
	}
	
	
</style>



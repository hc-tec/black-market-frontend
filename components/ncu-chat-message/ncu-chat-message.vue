<template>
	<div class="ncu-chat-message animate-scale-up">
		<view
			:key="item.chat_time"
			v-if="['chat', 'audio', 'location'].includes(item.chat_type)"
			:class="[
				'cu-item',
				GlobalData.userInfo.id === item.chat_user.id ? 'self' : '',
				index === chatLen-1 ? 'chat-last-item' : '',
			]">
			
			<template v-if="GlobalData.userInfo.id === item.chat_user.id">
				<template v-if="item.chat_type === 'chat'">
					<view class="main">
						<view
							v-if="item.chat_msg_type === 'text'"
							class="content shadow bg-green">
							<text >
								{{ emojiContentParse(item.chat_msg) }}
							</text>
						</view>
						<image
							v-else-if="item.chat_msg_type === 'img'"
							class="radius"
							mode="widthFix"
							:src="item.chat_msg"
							@click="previewImg(item.chat_msg)">
						</image>
					</view>
					<view 
						class="cu-avatar round" 
						:style="'background-image:url('+item.chat_user.avatar+');'"
						@click="$emit('avatarClick', item.chat_user.id)">
					</view>
					<view class="date">
						{{ timeFormat(item.chat_time, true) }}
					</view>
				</template>
				
				<template v-else-if="item.chat_type === 'audio'">
					<view class="main">
						<view class="action text-bold text-grey">
							{{ item.chat_audio_sec }}"
						</view>
						<view class="content bg-green shadow">
							<text class="cuIcon-sound text-xxl padding-right-xl"> </text>
						</view>
					</view>
					<view 
						class="cu-avatar round" 
						:style="'background-image:url('+item.chat_user.avatar+');'"
						@click="$emit('avatarClick', item.chat_user.id)">
					</view>
					<view class="date">
						{{ timeFormat(item.chat_time, true) }}
					</view>
				</template>
				
				<template v-else-if="item.chat_type === 'location'">
					<view class="main">
						<view class="action">
							<text class="cuIcon-locationfill text-orange text-xxl"></text>
						</view>
						<view class="content bg-green shadow">
							{{ item.chat_locat }}
						</view>
					</view>
					<view 
						class="cu-avatar radius" 
						:style="'background-image:url('+item.chat_user.avatar+');'">
					</view>
					<view class="date">
						{{ timeFormat(item.chat_time, true) }}
					</view>
				</template>
				
			</template>
			
			<template v-else>
				<template v-if="item.chat_type === 'chat'">
					<view
						class="cu-avatar radius" 
						:style="'background-image:url('+item.chat_user.avatar+');'">
					</view>
					<view class="main">
						<view 
							v-if="item.chat_msg_type === 'text'"
							class="content shadow">
							<text >
								{{ emojiContentParse(item.chat_msg) }}
							</text>
						</view>
						<image
							v-else-if="item.chat_msg_type === 'img'"
							class="radius"
							mode="widthFix"
							:src="item.chat_msg"
							@click="previewImg(item.chat_msg)">
						</image>
					</view>
					<view class="date">
						{{ timeFormat(item.chat_time, true) }}
					</view>
				</template>
				
				<template v-else-if="item.chat_type === 'audio'">
					<view
						class="cu-avatar radius" 
						:style="'background-image:url('+item.chat_user.avatar+');'">
					</view>
					<view class="main">
						<view class="content shadow">
							<text class="cuIcon-sound text-xxl padding-right-xl"> </text>
						</view>
						<view class="action text-bold text-grey">
							{{ item.chat_audio_sec }}"
						</view>
					</view>
					<view class="date">
						{{ timeFormat(item.chat_time, true) }}
					</view>
				</template>
				
				<template v-else-if="item.chat_type === 'location'">
					<view
						class="cu-avatar radius" 
						:style="'background-image:url('+item.chat_user.avatar+');'">
					</view>
					<view class="main">
						<view class="content shadow">
							{{ item.chat_locat }}
						</view>
						<view class="action">
							<text class="cuIcon-locationfill text-orange text-xxl"></text>
						</view>
					</view>
					<view class="date">
						{{ timeFormat(item.chat_time, true) }}
					</view>
				</template>
				
			</template>
			
		</view>
		
		<view
			:key="item.chat_time"
			v-else-if="['info'].includes(item.chat_type)"
			:class="{
				'cu-info': 1,
			}">
			{{ item.chat_msg }}
		</view>
	</div>
</template>

<script>
	import globalData from '../../common/global.js'
	import { timeFormat } from '../../common/func.js'
	import { emojiContentParse } from '../../common/emoji.js'
    export default {
		props: {
			item: {
				type: Object,
			},
			index: {
				type: Number,
			}
		},
        data() {
            return {
				GlobalData: globalData,
				timeFormat,
				emojiContentParse,
            }
        },
		methods: {
			previewImg(img) {
				uni.previewImage({
					urls: [img],
					current: img
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-chat-message {
		user-select: text;
	}
</style>



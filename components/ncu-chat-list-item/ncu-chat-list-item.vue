<template>
	<ncu-ripple-wrapper>
		<div 
			class="ncu-chat-list-item cu-list menu-avatar animate-scale-up"
			:style="{
				animationDelay: `${index*0.1}s`
			}">
			<div 
				class="cu-item"
				:class="item.friend.uonline ? '' : 'grayscale'"
				@click="$emit('click', item)">
				<div 
					class="cu-avatar round lg" 
					:style="'background-image:url('+
						item.friend.avatar+');'">
				</div>
				<div class="content">
					<div>
						<p class="text-cut chat-user_name">
							{{ item.friend.user_name }}
						</p>
						<div 
							class="cu-tag round bg-orange sm"
							v-if="!item.friend.uonline">
							off
						</div>
					</div>
					<div class="text-sm flex"> 
						<p 
							class="text-cut"
							v-if="item.message.newest_message"> 
							{{ emojiContentParse(item.message.newest_message) }} 
						</p>
					</div>
				</div>
				<div class="action">
					<div class="text-grey text-xs"
						v-if="item.message.newest_message">
						{{ timeFormat(item.message.newest_time) }}
					</div>
					<div 
						class="cu-tag round bg-red sm"
						v-if="item.message.unread_num">
						{{ item.message.unread_num }}
					</div>
				</div>
			</div>
		</div>
		
	</ncu-ripple-wrapper>
</template>

<script>
	import { timeFormat } from '../../common/func.js'
	import { emojiContentParse } from '../../common/emoji.js'
    export default {
		props: {
			item: {
				type: Object,
				default: () => ({
						friend: {
							id: 5,
							user_name: '官方',
							avatar: 'http://neumorphic.cn/static/9b345880-ef81-4b33-91e1-7de7da815db2.jpg',
							uonline: true,
						},
						message: {
							newest_message: '这里是小程序官方，欢迎您使用我们的小程序，有新需求或者新问题可以在这里谈谈喔。',
							newest_time: '2021-7-28 11:57:00',
							unread_num: 1,
							sender: 5,
						}
					})
			},
			index: {
				type: Number,
				default: 1
			}
		},
        data() {
            return {
				timeFormat,
				emojiContentParse,
            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-chat-list-item {
		color: var(--main-light-color);
		z-index: 10;
	}
	.cu-list.menu-avatar>.cu-item:after,
	.cu-list.menu>.cu-item:after {
		border: none;
	}
	.cu-avatar,
	.cu-list.menu-avatar>.cu-item {
		background-color: var(--main-bg-color-alpha);
	}
	.chat-user_name {
		color: var(--main-color);
	}
</style>



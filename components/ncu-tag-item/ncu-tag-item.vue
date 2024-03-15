<template>
	<div 
		class="ncu-tag-item"
		hover-class="hover-opacity"
		hover-stay-time="100"
		@click="$emit('click', item)">
		<div class="ncu-tag-item-left">
			<div class="ncu-tag-item__tag">
				<span class="tag-icon">#</span>
				{{ item.topic_content }}
			</div>
			<div class="ncu-tag-item__content">
				{{ item.hot_thread.thread_info }}
			</div>
			<div class="ncu-tag-item__thread-info">
				<div 
					class="ncu-tag-item__author"
					@click.stop="$emit('authorClick')">
					@{{ item.hot_thread.author_info.user_name }}
				</div>
				·
				<div class="ncu-tag-item__time">
					{{ item.hot_thread.thread_time }}
				</div>
			</div>
		</div>
		<div class="ncu-tag-item-right">
			<div class="ncu-tag-item__focus-num">
				本校区 {{ item.topic_focus_num_school_zone }} 人关注
				<span class="cuIcon-right"></span>
			</div>
			<div 
				v-if="item.hot_thread.thread_images[0]"
				class="ncu-tag-item__thread-img"
				:style="{
					backgroundImage: `url(${item.hot_thread.thread_images[0]})`
				}">
				<image 
					class="image"
					mode="aspectFill"
					>
				</image>
			</div>
		</div>
	</div> 
</template>

<script>
    export default {
		name: "ncu-tag",
		props: {
			item: {
				type: Object,
				default: {
					id: 1,
					topic_content: '人类高质量穿搭',
					topic_focus_num: 2099,
					hot_thread: {
						author_info: {
							id: 2, 
							user_name: "test", 
							school_zone: "前湖校区-医学部",
							avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
							school_zone: "前湖校区-医学部",
							user_name: "test",
						},
						comment_num: 0,
						id: 1,
						thread_appreciate: 1,
						thread_appreciate_peoples: ["test"],
						thread_images: ["http://127.0.0.1:8001/static/60d0955d-ba7e-407b-a191-200751bf3082.jpg"],
						thread_info: "123",
						thread_isAppreciate: true,
						thread_time: "2021-08-05 13:28:48",
						thread_topic: "789",
					}
				}
			}
		},
        data() {
            return {

            }
        },
		computed: {
			getColorObj() {
				
			}
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-tag-item {
		width: 100%;
		display: flex;
		padding: 10px 15px;
		background-color: var(--main-bg-color);
		
		&-left {
			width: 66%;
			margin-right: 5%;
		}
		&-right {
			width: 34%;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
		}
		&__tag {
			margin-bottom: 10px;
			font-size: 1.1em;
		}
		&__content {
			height: 30px;
			margin-bottom: 10px;
		}
		&__thread-info {
			color: var(--main-light-color);
			font-size: .9em;
		}
		&__author {
			display: inline-flex;
			align-items: center;
			margin-right: 5px;
			color: var(--main-color);
		}
		&__time {
			display: inline-flex;
			margin-left: 5px;
			font-size: .8em;
		}
		&__focus-num {
			display: flex;
			align-items: center;
			font-size: .9em;
			margin: 2px 0 5px 0;
			color: var(--main-light-color);
		}
		&__thread-img {
			width: 60px;
			height: 60px;
			background-size: cover;
				background-repeat: no-repeat;
			border-radius: 5px;
		}
	}
</style>



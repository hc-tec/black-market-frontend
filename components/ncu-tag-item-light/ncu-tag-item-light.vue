<template>
	<div 
		class="ncu-tag-item-light"
		hover-class="hover-opacity"
		hover-stay-time="100"
		@click="$emit('click', item)">

		<div class="ncu-tag-item-light__tag">
			<span class="tag-icon">#</span>
			{{ item.topic_content }}
		</div>
		<div class="ncu-tag-item-light-stat">
			<div class="ncu-tag-item-light__thread-num">
				{{ item.thread_num }} 条帖子
			</div>
			<div class="ncu-tag-item-light__focus-num">
				 本校区 {{ item.topic_focus_num_school_zone }} 人关注 (共 {{ item.topic_focus_num }} 人)
			</div>
		</div>
		
		<span class="cuIcon-right arrow"></span>
	</div> 
</template>

<script>
    export default {
		name: "ncu-tag",
		props: {
			item: {
				type: Object,
				default: () => ({
					id: 1,
					topic_content: '人类高质量穿搭',
					topic_focus_num: 2099,
					thread_num: 99,
				})
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
	.ncu-tag-item-light {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 10px 15px;
		background-color: var(--main-bg-color);
		position: relative;
		
		&__tag {
			margin-bottom: 10px;
			font-size: 1.1em;
		}
		
		&-stat {
			color: var(--main-light-color);
			font-size: .9em;
			display: flex;
			align-items: center;
			margin-left: 20px;
		}
		&__focus-num,
		&__thread-num {
			margin: 0 5px 0 0;
		}
		.arrow {
			position: absolute;
			top: 50%;
			right: 20px;
			transform: translateY(-50%);
			color: var(--main-light-color);
		}
	}
</style>



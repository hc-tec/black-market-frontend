<template>
	<div 
		class="ncu-thread animate-wave"
		:style="getStyle"
		@click="HandleThreadClick">
		 
		<div class="ncu-thread-content">
			
			<ncu-thread-content-main
				:thread="thread"
				:needAppreciatePeopleDetail="needAppreciatePeopleDetail"
				@contentClick="handleContentClick">
			</ncu-thread-content-main>
			
			<ncu-thread-author-info
				:thread="thread"
				@avatarClick="id => $emit('avatarClick', id)">
			</ncu-thread-author-info>
			
			<div class="ncu-thread-content__btn-group">
				<div class="report">
					<span class="cuIcon-warn"></span>
				</div>
				<div class="comment-num">
					<span class="cuIcon-message"></span>
					<span>{{ thread.comment_num }}</span>
				</div>
				<ncu-appreciate
					:num="thread.thread_appreciate"
					:active="thread.thread_isAppreciate"
					@click="appreciate">
				</ncu-appreciate>
			</div>
		</div>
	</div>
</template>

<script>
	import { debounce, cssObjectToString } from '../../common/func.js'
	import ncuThreadAuthorInfo from './ncu-thread-author.vue'
	import ncuThreadContentMain from './ncu-thread-content-main.vue'
    export default {
		name: 'ncu-thread',
		components: {
			ncuThreadAuthorInfo,
			ncuThreadContentMain,
		},
		props: {
			thread: {
				type: Object,
				default: () => ({
					author_info: {
						id: 1,
						user_name: '慕尘嚣',
						school_zone: '主校区',
						avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
					},
					thread_topic: '需求',
					thread_info: '这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。',
					thread_images: [],
					thread_time: '2020-12-10 14:54:12',
					thread_appreciate: 7,
					thread_isAppreciate: true,
					thread_appreciate_peoples: ['Titto', '卞因杰', 'ASP', '大哥', '南大学子', '996工作者']
				})
			},
			index: {
				type: Number,
				default: 0
			},
			needAppreciatePeopleDetail: {
				type: Boolean,
				default: () => false
			},
			_style: {
				type: Object,
			}
		},
        computed: {
			getStyle() {
				return cssObjectToString({
					animationDelay: `${Math.min(0.5*this.index, 1)}s`,
					...(this._style || {})
				})
			}
		},
		data() {
            return {
				appreciate: debounce(this._appreciate, 500),
				touchStartTime: 0
            }
        },
		methods: {
			_appreciate(active) {
				this.$emit('appreciate', {
					index: this.index,
					active
				})
			},
			handleContentClick() {
				this.$emit('contentClick', this.index)
			},
			HandleThreadClick() {
				const _now = new Date().getTime()
				if (_now - this.touchStartTime <= 300) {
				  this.$emit('threadClick', {
					  index: this.index,
					  active: !this.thread.thread_isAppreciate
				  })
				} else {
				  this.touchStartTime = _now
				}
				
			}
		}
    }
</script>

<style lang="scss">
	.ncu-thread {
		width: 90%;
		margin: 0 auto;
		margin-bottom: 10px;
		transition: all .3;
		
		&-content {
			padding-bottom: 2.75rem;
			padding-top: 75px;
			position: relative;
			width: 100%;
			height: 100%;

			&::before {
				width: 108%;
				height: 65%;
				border-radius: 15px;
				box-shadow: 0 20px 50px rgba(216,186,186,.1);
				content: '';
				position: absolute;
				top: 0;
				left: -4%;
				background-color: var(--main-bg-color);
				background-image: var(--thread-bg-image);
				background-size: contain;
				z-index: -1;
			}
			
			
			
			&__btn-group {
				display: flex;
				align-items: center;
				right: -8px;
				position: absolute;
				top: -7px;
				color: var(--main-light-color);
				font-size: .9em;
				
				.report {
					position: relative;
					left: 19px;
				}
				.comment-num {
					position: relative;
					left: 30px;
					display: flex;
					align-items: center;
					
				}
				[class*=ncu-appreciate__num] {
					font-size: 1.3em;
				}
				[class*=cuIcon] {
					font-size: 1.3em;
					margin-right: 5px;
				}
			}
		}
	}
	
</style>



<template>
	<div
		class="ncu-thread-content__main"
		hover-class="scale-out"
		:hover-stay-time="100"
		@click="$emit('contentClick')"
		@touchstart="handleThreadTouchStart"
		@touchend="handleThreadTouchEnd">
		
		<div 
			v-if="thread.thread_topic"
			class="ncu-thread-content__topic"
			@click.stop="handleTopicClick">
			<span class="tag-icon">#</span>
			{{ thread.thread_topic }}
		</div>
		
		<div class="ncu-thread-content__thread-info">
			{{ thread.thread_info }}
		</div>
		
		<div
			class="ncu-thread-content__thread-info__images grid col-3 grid-square">
			<div 
				class="bg-img animate-blur"
				v-for="img in thread.thread_images"
				:key="img"
				:style="'background-image: url('+img+')'"
				@click="previewImg(img)">
			</div>
		</div>
		
		<div class="ncu-thread-content__thread-info__time text-grey">
			{{ timeFormat(thread.thread_time, true) }}
		</div>
		
		<div 
			v-if="thread.thread_appreciate_peoples.length"
			class="ncu-thread-content__appreciate-peoples">
			<span class="cuIcon-like">
			</span>
			<span 
				v-for="(people,index) in 
					thread.thread_appreciate_peoples
						.slice(0, defaultMaxAppreciateLength)"
				:key="people">
				{{ people }}
				{{ getCommaProcess(index) }}
			</span>
			<span v-show="thread.thread_appreciate_peoples.length > 
						  defaultMaxAppreciateLength">
				等
			</span>
			<span>
				{{ thread.thread_appreciate_peoples.length }}位同学觉得很淦
			</span>
		</div>
			
		<div 
			class="ncu-ripple"
			:class="[rippleActive ? 'ripple-active' : '',
					 rippleEndActive ? 'ripple-end' : '']">
		</div>
	</div>
</template>

<script>
	/**
	 * 说说的主体内容
	 * @description 说说的主体内容
	 * @property {Object} thread 说说内容对象
	 * @property {Boolean} needAppreciatePeopleDetail 是否需要详细显示点赞列表 
	 */
	import { throttle, timeFormat } from '../../common/func.js'
    export default {
		props: {
			thread: {
				type: Object,
			},
			needAppreciatePeopleDetail: {
				type: Boolean,
				default: () => false
			}
		},
        data() {
            return {
				timeFormat: timeFormat,
				defaultMaxAppreciateLength: Object.freeze(6),
				rippleActive: false,
				rippleEndActive: false,
				handleThreadTouchStart: throttle(this._handleThreadTouchStart, 50, true),
				handleThreadTouchEnd: throttle(this._handleThreadTouchEnd, 50, true),
            }
        },
		methods: {
			_handleThreadTouchStart() {
				if(!this.rippleActive) {
					this.rippleActive = true
				}
			},
			_handleThreadTouchEnd() {
				this.rippleEndActive = true
				setTimeout(() => {
					this.rippleActive = false
					this.rippleEndActive = false
				}, 200)
			},
			handleTopicClick() {
				uni.navigateTo({
					url: `/pages/forum/tag?id=${null}`
				})
			},
			getCommaProcess(index) {
				const length = this.thread.thread_appreciate_peoples.length
				let MAX = Math.min(length, this.defaultMaxAppreciateLength)
				return index === MAX-1 ? '' : ', '
			},
			previewImg(img) {
				uni.previewImage({
					urls: this.thread.thread_images,
					current: img
				})
			}
		},
		mounted() {
			if(this.needAppreciatePeopleDetail) {
				this.defaultMaxAppreciateLength = this.thread.thread_appreciate_peoples.length
			}
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-thread-content {
		
		&__main {
			user-select: text;
			font-size: .9em;
			background-color: var(--main-bg-color);
			border-radius: 15px;
			box-shadow: 0 20px 50px rgba(216,186,186,.1);
			position: relative;
			z-index: 2;
			padding: 20px;
			transform-origin: center center;
			transition: transform .1s linear;
			overflow: hidden;
			background-image: var(--thread-bg-image);
		}
		
		&__topic {
			font-size: .9em;
			margin-bottom: 10px;
			display: inline-flex;
			align-items: center;
			background-color: var(--main-lighter-color);
			color: var(--main-light-color);
			padding: .3em .6em;
			border-radius: 30px;
			position: relative;
			left: -10px;
		}
		
		&__thread-info {
			max-height: 20vh;
			overflow: auto;
			font-size: 1em;
			&,
			&__time {
				margin-bottom: 10px;
			}
			
			&__time {
				text-align: right;
			}
			
			&__images {
				overflow: hidden;
			}
		}
	
		&__appreciate-peoples {
			max-height: 100px;
			color: var(--main-light-color);
			padding: 10px 0 0 0;
			border-top: 1px solid rgba(26, 26, 26, .1);
			
			.cuIcon-like {
				margin-right: 5px;
			}
		}
	}
	
	.ncu-ripple {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		opacity: 0;
		background-image: var(--ripple-shadow);
		background-repeat: no-repeat;
		background-position: 50%;
		transform: translate(-50%, -50%) scale(0);
		transform-origin: center center;
	}
	
	.ripple-active {
		transition: transform .2s linear, opacity .2s linear;
		transform: translate(-50%, -50%) scale(10);
		opacity: .25;
	}
	
	.ripple-end {
		transition: transform .2s linear, opacity .2s linear;
		transform: translate(-50%, -50%) scale(10);
		opacity: 0;
	}

</style>



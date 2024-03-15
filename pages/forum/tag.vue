<template>
	<div class="tag-details">
		
		<ncu-custom-header
			isBack>
		</ncu-custom-header>
		
		<div class="tag-details-header">
			<p class="tag-details__title">
				{{ topicDetails.topic_content }}
			</p>
			<p class="tag-details__focus-num">
				{{ topicDetails.thread_num }} 条帖子
			</p>
			<ncu-button 
				class="focus-btn"
				:class="{
					focus: topicDetails.is_focus
				}"
				@click="focusTopic">
				{{ topicDetails.is_focus ? '已关注' : '关注' }}
			</ncu-button>
		</div>
		
		<ncu-scroll-wrapper-v2
			height="calc(96vh - 160px)"
			@scrolltoupper="flushThreads"
			@scrolltolower="getThreads(threadConfig.curPage)">
			
			<ncu-category-item
				icon="cuIcon-locationfill"
				bgColor="rgb(94,140,251)"
				:text="`当前定位「${schoolZones[threadsSchoolZone-1].label}」`"
				hollowOut
				@click="schoolZoneItem.open=true">
			</ncu-category-item>
			
			<ncu-threads>
				<ncu-thread 
					v-for="(thread,index) in threads"
					:key="index"
					:index="index"
					:thread="thread"
					@appreciate="appreciate"
					@contentClick="contentClick"
					@avatarClick="handleAvatarClick">
				</ncu-thread>
			</ncu-threads>
			
			<ncu-loading-part
				type="bounce-stick"
				:active="threadConfig.isLoading">
			</ncu-loading-part>
			<ncu-no-data v-if="threadConfig.noData">
			</ncu-no-data>
			
		</ncu-scroll-wrapper-v2>
		
		<ncu-popup-select
			v-model="schoolZoneItem.school_zone"
			title="选择校区"
			direction="top"
			:open="schoolZoneItem.open"
			:items="schoolZones"
			@confirm="schoolZoneModifyConfirm"
			@cancel="schoolZoneItem.open=false"
			@layer-click="schoolZoneItem.open=false">
		</ncu-popup-select>
		
	</div>
</template>

<script>
	import { thread_api } from '../../common/api.js'
	import { httpGet } from '../../common/http.js'
	import { schoolZones, formatSchoolZones } from '../../common/config.js'
	import globalData from '../../common/global.js'
    export default {
		onLoad(option) {
			this.topicDetails = Object.assign(this.topicDetails, option)
			if(option.school_zone) {
				this.threadsSchoolZone = option.school_zone
			} else {
				this.threadsSchoolZone = formatSchoolZones(globalData.userInfo.school_zone)
			}
			this.getThreads()
		},
        data() {
            return {
				topicDetails: {
					topic_content: '快手股票解禁日',
					thread_num: 2099,
					is_focus: false,
				},
				threads: [],
				
				threadConfig: {
					isLoading: false,
					curPage: 1,
					noData: false,
				},
				threadAppreciateConfig: {
					isLoading: false,
				},
				schoolZones: schoolZones,
				schoolZoneItem: {
					school_zone: 0,
					open: false
				},
				threadsSchoolZone: 1,
			}
        },
		methods: {
			flushThreads() {
				this.init()
				this.getThreads()
			},
			focusTopic() {
				this.topicDetails.is_focus = !this.topicDetails.is_focus
			},
			init() {
				this.threadConfig.isLoading = false
				this.threadConfig.curPage = 1
				this.threadConfig.noData = false
				this.threads = []
			},
			async getThreads(page) {
				if(this.threadConfig.isLoading) return
				this.threadConfig.isLoading = true
				const [res, _] = await httpGet(thread_api, {
					page: page || 1,
					topic: this.topicDetails.topic_content,
					school_zone: this.threadsSchoolZone
				})
				this.threadConfig.isLoading = false
				this.threadConfig.noData = res.data.detail
				if(this.threadConfig.noData) {
					return
				}
				const results = res.data.results
				this.topicDetails.thread_num = res.data.count
				if(results && !results.length) {
					this.threadConfig.noData = true
					return
				}
				this.threadConfig.curPage ++
				this.threads = [...this.threads, ...results]
			},
			
			schoolZoneModifyConfirm() {
				const isChange = this.schoolZoneItem.school_zone !== this.threadsSchoolZone
				this.schoolZoneItem.open = false
				if(!this.schoolZoneItem.school_zone || !isChange) return
				this.threadsSchoolZone = this.schoolZoneItem.school_zone
				this.init()
				this.getThreads()
			},
			async appreciate({ active, index }) {
				if(this.threadAppreciateConfig.isLoading) return
				this.threadAppreciateConfig.isLoading = true
				const thread = this.threads[index]
					, thread_appreciate_peoples = thread.thread_appreciate_peoples
					, user_name = globalData.userInfo.user_name
					, userIndex = thread_appreciate_peoples
								.indexOf(user_name)
					, method = userIndex === -1 ? httpPut : httpDelete
					, [res, err] = await method(
						appreciateThread_api, {
							thread_id: thread.id
						}
					)
				this.threadAppreciateConfig.isLoading = false
				if(err) return;
				thread.thread_isAppreciate = userIndex === -1
				thread.thread_appreciate = res.data.num
				
				if(thread.thread_isAppreciate) {
					thread_appreciate_peoples.unshift(user_name)
				} else if(userIndex !== -1) {
					thread_appreciate_peoples.splice(userIndex, 1)
				}
				thread_appreciate_peoples.length = res.data.num
				
			},
			contentClick(index) {
				globalData.threadDetails = this.threads[index]
				uni.navigateTo({
					url: '/pages/forum/forum-details'
				})
			},
			handleAvatarClick(id) {
				uni.navigateTo({
					url: `/pages/person/index?id=${id}`
				})
			},
		},
    }
</script>

<style lang="scss">
	.tag-details {
		position: relative;
		top: -90px;
		left: 0;
		overflow: hidden;
		height: 100vh;
		
		&-header {
			width: 100%;
			height: 13em;
			padding: .7em 2em;
			position: relative;
			top: 75px;
			
			&::before {
				content: '';
				position: absolute;
				width: 100%;
				height: 200%;
				left: 0;
				top: -90px;
				background-image: var(--texture);
				background-position: left;
			}
			
		}
		
		&__title {
			color: rgb(94,140,251);
			font-size: 1.5em;
			margin-bottom: 10px;
		}
		
		&__focus-num {
			color: var(--main-light-color);
		}
		
		.focus-btn {
			position: absolute;
			right: 17px;
			top: 2em;
			
			.cu-btn {
				background-color: rgb(42,220,202);
				color: white;
				padding: 15px 24px !important;
				transition: background-color .2s;
				border-radius: 30px;
			}
			
			&.focus {
				.cu-btn {
					background-color: transparent;
					color: var(--main-light-color);
				}
			}
		}
		
	}
</style>



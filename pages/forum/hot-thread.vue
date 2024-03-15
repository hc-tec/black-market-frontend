<template>
	
	<div class="hot-thread">
		
		<ncu-header-wrapper
			:config="{
				title: '热门帖子',
				icon: 'cuIcon-hotfill',
				color: 'rgb(253,127,136)'
			}"
			@scrolltolower="getHotThread(config.curPage)"
			@scrolltoupper=""
			@schoolZoneChange="schoolZoneChange">
			<p slot="header">
				{{ schoolZones[schoolZone-1].label }} 有 {{ threadCount }} 个热门帖子
			</p>
			<ncu-threads>
				<ncu-thread 
					v-for="(thread,index) in hotThread"
					:key="index"
					:index="index"
					:thread="thread"
					@appreciate="contentClick"
					@contentClick="contentClick"
					@avatarClick="handleAvatarClick">
				</ncu-thread>
			</ncu-threads>
			<ncu-loading-part
				type="rect"
				:active="config.isLoading">
			</ncu-loading-part>
			<ncu-no-data 
				v-if="config.noData"
				icon="cuIcon-hotfill">
			</ncu-no-data>
		</ncu-header-wrapper>
		
	</div>
	
</template>

<script>
	import { thread_api } from '../../common/api.js'
	import { httpGet } from '../../common/http.js'
	import { formatSchoolZones, schoolZones } from '../../common/config.js'
	import globalData from '../../common/global.js'
    export default {
        data() {
            return {
				hotThread: [],
				threadCount: 0,
				config: {
					curPage: 1,
					isLoading: false,
					noData: false,
				},
				schoolZone: 0,
				schoolZones: schoolZones,
            }
        },
		methods: {
			contentClick(index) {
				globalData.threadDetails = this.hotThread[index]
				uni.navigateTo({
					url: '/pages/forum/forum-details'
				})
			},
			handleAvatarClick(id) {
				uni.navigateTo({
					url: `/pages/person/index?id=${id}`
				})
			},
			init() {
				this.config.isLoading = false
				this.config.curPage = 1
				this.config.noData = false
				this.threadCount = 0
				this.hotThread = []
			},
			schoolZoneChange(school_zone) {
				this.schoolZone = school_zone
				this.init()
				this.getHotThread()
			},
			toThreadDetails(item) {
				uni.navigateTo({
					url: `/pages/forum/tag?topic_content=${item.topic_content}&thread_num=${item.thread_num}`
				})
			},
			async getHotThread(page) {
				if(this.config.isLoading) return
				this.config.isLoading = true
				const [res, err] = await httpGet(thread_api, {
					select: 'hot',
					school_zone: this.schoolZone,
					page: page || 1,
				})
				this.config.isLoading = false
				if(err) {
					return
				}
				if(results && !results.length || res.data.detail) {
					this.config.noData = true
					return
				}
				this.threadCount = res.data.count
				this.config.curPage ++
				const results = res.data.results
				this.hotThread = [...this.hotThread, ...results]
			}
		},
		created() {
			this.schoolZone = formatSchoolZones(globalData.userInfo.school_zone)
			this.getHotThread()
		}
    }
</script>

<style lang="scss" scoped>
	.hot-thread {
		overflow: hidden;
		height: 100vh;
	}
</style>



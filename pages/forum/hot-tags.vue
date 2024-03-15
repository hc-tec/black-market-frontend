<template>
	
	<div class="hot-tags">
		
		<ncu-header-wrapper
			:config="{
				title: '热门话题',
				icon: 'cuIcon-rankfill',
				color: 'rgb(121,97,246)'
			}"
			@scrolltolower="getHotTopic(config.curPage)"
			@scrolltoupper=""
			@schoolZoneChange="schoolZoneChange">
			
			<p slot="header">
				{{ schoolZones[schoolZone-1].label }} 有 {{ topicsCount }} 个热门话题
			</p>
			
			<ncu-tag-item
				v-for="topic in hotTopics"
				v-if="topic.hot_thread"
				:item="topic"
				:key="topic.topic_content"
				@click="toTagDetails"
				@authorClick="toTagDetails">
			</ncu-tag-item>
			<ncu-loading-part
				type="rect"
				:active="config.isLoading">
			</ncu-loading-part>
			<ncu-no-data 
				v-if="config.noData"
				icon="cuIcon-rankfill">
			</ncu-no-data>
		</ncu-header-wrapper>
		
	</div>
	
</template>

<script>
	import { topicView_api } from '../../common/api.js'
	import { httpGet } from '../../common/http.js'
	import { formatSchoolZones, schoolZones } from '../../common/config.js'
	import globalData from '../../common/global.js'
    export default {
        data() {
            return {
				hotTopics: [],
				topicsCount: 0,
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
			init() {
				this.config.isLoading = false
				this.config.curPage = 1
				this.config.noData = false
				this.topicsCount = 0
				this.hotTopics = []
			},
			schoolZoneChange(school_zone) {
				this.schoolZone = school_zone
				this.init()
				this.getHotTopic()
			},
			toTagDetails(item) {
				uni.navigateTo({
					url: `/pages/forum/tag?topic_content=${item.topic_content}&thread_num=${item.thread_num}&school_zone=${this.schoolZone}`
				})
			},
			async getHotTopic(page) {
				if(this.config.isLoading) return
				this.config.isLoading = true
				const [res, err] = await httpGet(topicView_api, {
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
				
				this.config.curPage ++
				let results = res.data.results
				results = results.filter(topic => topic.hot_thread !== null)
				this.topicsCount += results.length
				this.hotTopics = [...this.hotTopics, ...results]
			}
		},
		created() {
			this.schoolZone = formatSchoolZones(globalData.userInfo.school_zone)
			this.getHotTopic()
		}
    }
</script>

<style lang="scss" scoped>
	.hot-tags {
		overflow: hidden;
		height: 100vh;
	}
</style>



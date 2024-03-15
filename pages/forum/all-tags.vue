<template>
	
	<div class="all-tags">
		
		<ncu-header-wrapper
			:config="{
				title: '话题分类',
				icon: 'cuIcon-tagfill',
				color: 'rgb(94,140,251)'
			}"
			@scrolltolower="getTopic(config.curPage)"
			@scrolltoupper=""
			@schoolZoneChange="schoolZoneChange">
			<p slot="header">
				共有 {{ topicsCount }} 个话题
			</p>
			<ncu-tag-item-light
				v-for="topic in topics"
				:item="topic"
				@click="toTagDetails"
				@authorClick="toTagDetails">
			</ncu-tag-item-light>
			<ncu-loading-part
				type="rect"
				:active="config.isLoading">
			</ncu-loading-part>
			<ncu-no-data 
				v-if="config.noData"
				icon="cuIcon-tagfill">
			</ncu-no-data>
		</ncu-header-wrapper>
		
	</div>
	
</template>

<script>
	import { topicView_api } from '../../common/api.js'
	import { httpGet } from '../../common/http.js'
	import { formatSchoolZones } from '../../common/config.js'
	import globalData from '../../common/global.js'
    export default {
        data() {
            return {
				topics: [],
				topicsCount: 0,
				config: {
					curPage: 1,
					isLoading: false,
					noData: false,
				},
				schoolZone: 0,
            }
        },
		methods: {
			init() {
				this.config.isLoading = false
				this.config.curPage = 1
				this.config.noData = false
				this.topics = []
			},
			schoolZoneChange(school_zone) {
				this.schoolZone = school_zone
				this.init()
				this.getTopic()
			},
			toTagDetails(item) {
				uni.navigateTo({
					url: `/pages/forum/tag?topic_content=${item.topic_content}&thread_num=${item.thread_num}&school_zone=${this.schoolZone}`
				})
			},
			async getTopic(page) {
				if(this.config.isLoading) return
				this.config.isLoading = true
				const [res, err] = await httpGet(topicView_api, {
					select: 'all',
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
				this.topicsCount = res.data.count
				this.config.curPage ++
				const results = res.data.results
				this.topics = [...this.topics, ...results]
			},
		},
		created() {
			this.schoolZone = formatSchoolZones(globalData.userInfo.school_zone)
			this.getTopic()
		}
    }
</script>

<style lang="scss" scoped>
	.all-tags {
		overflow: hidden;
		height: 100vh;
		&-list {
			background-color: var(--main-bg-color);
			padding-top: 1em;
		}
	}
</style>



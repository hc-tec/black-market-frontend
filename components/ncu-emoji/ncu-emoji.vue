<template>
	<div 
		class="ncu-emoji"
		:style="getStyle">
		<swiper 
			indicator-dots
			circular
			:style="getStyle">
			<swiper-item 
				class="ncu-emoji-page"
				v-for="i in (emojiKeys.length)/pagination"
				:key="i">
				<div 
					class="ncu-emoji__emoji"
					v-for="j in pagination"
					v-if="emoji[emojiKeys[i*pagination+j]]"
					hover-class="hover-opacity"
					hover-stay-time="100"
					:key="j"
					@click="$emit('emojiClick', {
						name: `[${emojiKeys[i*pagination+j]}_${emoji[emojiKeys[i*pagination+j]].index}]`,
						detail: emoji[emojiKeys[i*pagination+j]]
					})">
					{{ emoji[emojiKeys[i*pagination+j]].body }}
				</div>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import { cssObjectToString } from '../../common/func.js'
	import { emoji, emojiKeys } from '../../common/emoji.js'
    export default {
		props: {
			open: {
				type: Boolean,
				default: false,
			},
		},
        data() {
            return {
				pagination: Object.freeze(28),
				emoji: Object.freeze(emoji),
				emojiKeys: Object.freeze(emojiKeys),
				height: Object.freeze(150),
            }
        },
		computed: {
			getStyle() {
				return cssObjectToString({
					height: `${this.open ? this.height : 0}px`,
				})
			},
		},
		methods: {
			
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-emoji {
		transition: height .5s;
		
		&-page {
			display: flex;
			flex-wrap: wrap;
			align-content: baseline;
		}
		
		&__emoji {
			font-size: 1.8em;
			width: calc(100% / 7);
		}
	}
</style>



<template>
	<div class="ncu-thread__author-info">
		<ncu-avatar
			size="mini"
			:src="thread.author_info.avatar"
			@click="$emit('avatarClick', thread.author_info.id)">
		</ncu-avatar>
		<div class="ncu-thread__author-info__details">
			<div>
				{{ thread.author_info.user_name }}
			</div>
			<!-- <div class="ncu-thread__author-info__school-zone">
				{{ thread.author_info.school_zone }}
			</div> -->
		</div>
	</div>
</template>

<script>
    export default {
		props: {
			thread: {
				type: Object,
			}
		},
        data() {
            return {

            }
        },
		methods: {
			
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-thread {
		
		&__author-info {
			position: absolute;
			top: 16px;
			left: 0;
			display: flex;
			
			
			&__details {
				margin-left: 10px;
				display: flex;
				justify-content: center;
				flex-direction: column;
				font-size: .8rem;
			}
			
			&__school-zone {
				color: var(--main-light-color);
			}
		}
	}
</style>



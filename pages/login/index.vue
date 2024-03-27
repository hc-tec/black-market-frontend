<template>
	<div class="ncu-entry">
		<image
			class="bottom-layer-bg"
			src="/static/Camera_XHS_17109508678381040g008310enuhp96a2g5n2b.jpg">
		</image>
		<div class="entry-wrapper">
			
			<register 
				v-model="isLoading"
				:rotate="rotate"
				@onRotate="val => rotate=val"
				@messageOpen="messageOpen">
			</register>
			<!-- <login
				v-model="isLoading"
				:rotate="rotate"
				@onRotate="val => rotate=val"
				@messageOpen="messageOpen">
			</login> -->
		
		</div>
		<ncu-loading
			:active="isLoading"
			type="bounce-stick">
		</ncu-loading>
		<ncu-message
			:open="messageConfig.open"
			:type="messageConfig.type"
			:message="messageConfig.message"
			@close="messageClose">
		</ncu-message>
	</div>
</template>

<script>
	import { httpGet } from '../../common/http.js'
	import login from './login.vue'
	import register from './register.vue'
    export default {
		components: {
			login,
			register,
		},
        data() {
            return {
				isLoading: false,
				rotate: true,
				messageConfig: {
					open: false,
					type: 'success',
					message: ''
				},
            }
        },
		methods: {
			messageOpen([message, type]) {
				this.messageConfig = {
					type: type || 'success',
					message: message,
					open: true
				}
			},
			messageClose(overlay) {
				const isDoubleClick = !overlay.clickNum
				if(isDoubleClick) {
					this.messageConfig.open = false
					overlay.notExtend()
					overlay.readyClose()
				} else {
					overlay.extend()
				}
			},
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-entry {
		position: relative;
	}
	.bottom-layer-bg {
		position: fixed;
		left: 0%;
		top: 0;
		width: 100%;
		height: 100vh;
	}
	.entry-wrapper {
		backdrop-filter: blur(30px);
		position: fixed;
		left: 0%;
		top: 0;
		width: 100%;
		height: 100vh;
		z-index: 1;
	}
</style>



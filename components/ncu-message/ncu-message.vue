<template>
	<div 
		class="ncu-message-wrapper"
		:class="[extend ? 'extend' : '']"
		:style="{
			opacity: initial ? 0 : 1
		}">
		<div 
			class="ncu-message"
			hover-class="scale-out"
			:hover-stay-time="100"
			:class="[readyClose ? 'slide-up' : '',
					 open ? 'slide-down' : 'slide-up']"
			:style="{
				height: extend ? scrollHeight : '65px'
			}"
			@click="close">
			<div 
				class="ncu-message__left text-white"
				:class="'bg-'+getTypeStyle.bgColor">
				<label 
					:class="'cuIcon-'+getTypeStyle.icon">
				</label>
			</div>
			<div 
				class="ncu-message__right"
				:class="[extend ? '' : 'text-ellipsis-1']"
				>
				{{ message }}
			</div>
			<div
				class="ncu-message__right fake"
				:style="{
					overflow: 'visable',
					opacity: 0,
					zIndex: -1,
					position: 'fixed',
				}">
				{{ message }}
			</div>
		</div>
		<div 
			class="ncu-message__layer">
		</div>
	</div>
</template>

<script>
	/**
	 * message 消息框
	 * @description message 消息框
	 * @property {String} type 消息类型，可选值：success | danger | warn | info | default
	 * @property {String} message 消息内容
	 * @property {Boolean} open 消息开关
	 * @event {Function} initial 初始化完成
	 */
    export default {
		name: 'ncu-message',
		props: {
			type: {
				type: String,
				default: () => 'default'
			},
			message: {
				type: String,
			},
			open: {
				type: Boolean,
				default: () => false
			}
		},
        data() {
            return {
				clickNum: 0,
				readyClose: false,
				extend: false,
				scrollHeight: 0,
				initial: true,
				autoCloseTimer: null,
            }
        },
		computed: {
			getTypeStyle() {
				const typeMapping = {
					success: {
						bgColor: 'green',
						icon: 'activityfill'
					},
					danger: {
						bgColor: 'red',
						icon: 'lightfill'
					},
					warn: {
						bgColor: 'yellow',
						icon: 'warnfill'
					},
					info: {
						bgColor: 'grey',
						icon: 'infofill'
					},
					default: {
						bgColor: 'blue',
						icon: 'noticefill'
					}
				}
				return typeMapping[this.type] || typeMapping.default
			}
		},
		methods: {
			close() {
				this.autoCloseTimer && clearTimeout(this.autoCloseTimer)
				this.clickNum ++
				const readyClose = () => {
					this.readyClose = true
				}
				const extend = () => {
					this.extend = true
				}
				const notExtend = () => {
					this.extend = false
				}
				// 判断是否只有一行文字
				const marginTop = 23*2
				const oneLineTextHeight = 24
				const isOneLinetext = 
					parseInt(this.scrollHeight) < 
					marginTop+oneLineTextHeight
				if(isOneLinetext) {
					this.clickNum ++
				}
				this.$emit('close', {
					clickNum: this.clickNum%2,
					extend,
					notExtend,
					readyClose,
				})
			},
			getMessageScrollHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.fake').fields({
					size: true,
					scrollOffset: true,
				}, data => {
				  this.scrollHeight = `${data.height+46}px`
				  console.log(data)
				}).exec();
			},
			init() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						this.initial = false
						this.$emit('initial')
						resolve()
					}, 2000)
				})
			},
			autoClose() {
				this.autoCloseTimer = setTimeout(() => {
					this.open && this.close()
				}, 4000)
			},
		},
		watch: {
			open() {
				this.open && (this.readyClose = false,
							  this.extend = false)
				this.autoClose()
			},
			message() {
				this.getMessageScrollHeight()
			},
			
		},
		async mounted() {
			await this.init()
			this.getMessageScrollHeight()
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-message-wrapper {
		position: fixed;
		width: 100%;
		height: auto;
		top: 0;
		left: 0;
		z-index: 2020;
	}
	.ncu-message-wrapper.extend {
		height: 100%;
		.ncu-message {
			height: auto;
			width: 80% !important;
			
			&__right {
				overflow: auto;
			}
			
			&__layer {
				opacity: 1;
				height: 100%;
			}
		}
	}
	.ncu-message-wrapper .slide-up + .ncu-message__layer {
		opacity: 0;
		height: auto;
	}
	.ncu-message {
		background-color: #ffffff;
		display: flex;
		width: 230px;
		height: 65px;
		max-height: 75vh;
		position: fixed;
		top: 65px;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 6px;
		overflow: hidden;
		opacity: 0;
		z-index: 2022;
		box-shadow: 2px 5px 25px rgba(0, 0, 0, 0.15);
		transform-origin: center center;
		transition: height 1s ease-in-out, 
					transform .1s linear;
		
		&__left {
			width: 65px;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: 0.3s;
			flex-shrink: 0;
			font-size: 1.7rem;
			overflow: hidden;
		}
		
		&__right {
			width: calc(100% - 65px);
			font-size: 14px;
			font-family: 宋体;
			transition: 0.3s;
			margin: 23px 20px;
			overflow: auto;
			line-height: 1.5;
		}
	
		&__layer {
			position: fixed;
			width: 100%;
			// height: 100%;
			top: 0;
			left: 0;
			background-color: rgba($color: #262626, $alpha: .3);
			opacity: 0;
			transition: opacity .8s;
		}
	}
	
	.scale-out {
		transform: translateX(-50%) scale(.95) !important;
	}
	
	.slide-down {
		animation: slide-down 1.5s .5s forwards;
	}
	
	.slide-up {
		animation: slide-up 1.5s forwards;
	}
	
	@keyframes slide-down {
		0% {
			width: 10px;
			top: -65px;
			opacity: 1;
		}
		25% {
			width: 10px;
			top: 65px;
			opacity: 1;
		}
		100% {
			width: 80%;
			top: 65px;
			opacity: 1;
		}
	}
	
	@keyframes slide-up {
		0% {
			width: 80%;
			top: 65px;
			opacity: 1;	
		}
		75% {
			width: 10px;
			top: 65px;
			opacity: 1;
		}
		100% {
			width: 10px;
			top: -65px;
			opacity: 1;
		}
	}
	
</style>



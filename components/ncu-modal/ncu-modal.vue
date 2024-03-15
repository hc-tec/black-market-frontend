<template>
	<div 
		class="modal-container"
		:class="[type, open ? '' : 'out']"
		:style="{
			display: true_open ? 'flex' : 'none',
			opacity: initial ? 0 : 1
		}">
		<div 
			class="modal"
			:style="{
				width: modalWidth,
				padding: modalPadding,
			}">
			<slot></slot>
		</div>
		<div 
			class="modal-background"
			:style="{
				display: true_open ? 'flex' : 'none',
			}"
			@click="layerClick">
		</div>
	</div>
</template>

<script>
	/**
	 * modal 模态框
	 * @description modal 模态框
	 * @property {Boolean} open 模态框控制开关
	 * @property {String} type 特效类型，可选值：unfolding | revealing | blowup | meep | sketch | bond
	 * @property {Boolean} closeOnClickModal 当点击遮罩时，是否能够触发事件 
	 * @event {Function} layer-click 点击遮罩的事件 
	 * @event {Function} initial 初始化完成
	 * @example <ncu-modal
					:open="active"
					:type="type">
					<div>Hello World</div>
				</ncu-modal>
	 */
    export default {
		name: 'ncu-modal',
		props: {
			open: {
				type: Boolean,
				default: () => false
			},
			type: {
				type: String,
				default: () => 'unfolding'
			},
			closeOnClickModal: {
				type: Boolean,
				default: () => true
			},
			modalWidth: {
				type: String,
				default: () => '80%'
			},
			modalPadding: {
				type: String,
				default: () => '20px 0 0 0'
			}
		},
        data() {
            return {
				true_open: false,
				initial: true,
				lock: false, // 设置锁，防止还未完全关闭就点击打开导致的Bug
            }
        },
		watch: {
			open() {
				if(this.lock) {
					this.true_open = false
					this.$emit("lock-open")
					return;
				}
				this.true_open = true
				if(!this.open) {
					this.lock = true
					setTimeout(() => {
						this.true_open = false
						this.lock = false
						this.$emit("lock-open", true)
					}, 2000)
					return
				}
				
			}
		},
		methods: {
			layerClick() {
				if(this.lock) {
					// this.$emit("lock-open", true)
					return;
				}
				if(this.closeOnClickModal) {
					this.$emit('layer-click')
				}
			},
			init() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						this.initial = false
						this.$emit('initial')
						resolve()
					}, 2200)
				})
				
			}
		},
		async mounted() {
			await this.init()
		}
    }
</script>

<style lang="scss" scoped>
	
	.modal-container {
	    position: fixed;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    height: 100%;
	    width: 100%;
	    top: 0;
	    left: 0;
	    transform: scale(0);
		z-index: var(--layer-z-index);
		
		
	    .modal {
	        background: white;
		    // padding-top: 20px;
			min-width: 70%;
		    // max-width: 80%;
	        display: inline-block;
	        border-radius: 3px;
	        font-weight: 300;
	        position: relative;
	        font-size: 18px;
	        line-height: 22px;
			z-index: 2021;
			// overflow: hidden;
	    }
	    .modal-background {
	        background: rgba(0, 0, 0, 0.4);
	        position: fixed;
	        height: 100%;
	        width: 100%;
	        top: 0;
	        left: 0;
			transition: background-color .3s;
	    }
	    &.unfolding {
	        transform: scaleY(0.1) scaleX(0);
	        animation: zoomIn 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	        .modal {
	            transform: scale(0);
	            animation: zoomIn 0.5s 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	        }
	        .modal-background {
	            transform: scale(0);
	            animation: unfoldIn 1s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	        }
	        &.out {
	            transform: scale(1);
	            animation: unfoldOut 1s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	            .modal {
	                animation: zoomOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	            }
	            .modal-background {
	                transform: scale(1);
	                animation: unfoldOut 1s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	            }
	        }
	    }
	    &.revealing {
	        transform: scale(1);
			.modal {
			    opacity: 0;
			    animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
			}
	        .modal-background {
	            background: rgba(0, 0, 0, 0);
	            animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	        }
	        & + .content {
	            animation: scaleBack 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	        }
	        &.out {
	            animation: quickScaleDown 0s 0.5s linear forwards;
				.modal {
				    animation: scaleDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
				}
	            .modal-background {
	                animation: fadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	            }
	            & + .content {
	                animation: scaleForward 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	            }
	        }
	    }  
	    &.blowup {
	        z-index: 0;
	        transform: scale(1);
			.modal {
			    animation: blowUpModal 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
			}
	        .modal-background {
	            background: rgba(0, 0, 0, 0.4);
	        }
	        & + .content {
	            z-index: 1;
	            animation: blowUpContent 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	        }
	        &.out {
				.modal {
				    animation: blowUpModalTwo 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
				}
	            .modal-background {
	                background: rgba(0, 0, 0, 0);
	            }
	            & + .content {
	                animation: blowUpContentTwo 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	            }
	        }
	    }
	    &.meep {
	        transform: scale(1);
			.modal {
			    transform: translateX(-1500px);
			    animation: roadRunnerIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
			}
	        .modal-background {
	            background: rgba(0, 0, 0, 0);
	            animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	        }
	        &.out {
	            animation: quickScaleDown 0s 0.5s linear forwards;
				.modal {
				    animation: roadRunnerOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
				}
	            .modal-background {
	                animation: fadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	            }
	        }
	    }
	    &.sketch {
	        transform: scale(1);
			.modal {
			    background-color: transparent;
			    animation: modalFadeIn 0.5s 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
			}
	        .modal-background {
	            background: rgba(0, 0, 0, 0);
	            animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	        }
	        &.out {
	            animation: quickScaleDown 0s 0.5s linear forwards;
				.modal {
				    animation: modalFadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
				}
	            .modal-background {
	                animation: fadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	            }
	        }
	    }
	    &.bond {
	        transform: scale(1);
			.modal {
			    height: 75px;
			    width: 75px;
			    border-radius: 75px;
			    overflow: hidden;
			    animation: bondJamesBond 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
			}
	        .modal-background {
	            background: rgba(0, 0, 0, 0);
	            animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	        }
	        &.out {
	            animation: slowFade 0.5s 1.5s linear forwards;
				.modal {
				    border-radius: 3px;
				    height: 162px;
				    width: 227px;
				    animation: killShot 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
				}
	            .modal-background {
	                background-color: rgba(0, 0, 0, 0.4);
	                animation: fadeToGrey 2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	            }
	        }
	    }
	}
	.modal-container .modal h2, .modal-container .modal p {
	    opacity: 0;
	    position: relative;
	    animation: modalContentFadeIn 0.5s 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	}
	.modal-container.out .modal h2, .modal-container.out .modal p {
	    animation: modalContentFadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	}
	.modal-container .modal h2, .modal-container .modal p {
	    opacity: 0;
	    position: relative;
	    animation: modalContentFadeIn 0.5s 1.4s linear forwards;
	}
	.modal-container.out .modal h2, .modal-container.out .modal p {
	    animation: modalContentFadeOut 0.5s 0.5 cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
	}
	.content {
	    min-height: 100%;
	    height: 100%;
	    background: white;
	    position: relative;
	    z-index: 0;
	    h1 {
	        padding: 75px 0 30px 0;
	        text-align: center;
	        font-size: 30px;
	        line-height: 30px;
	    }
	    .buttons {
	        max-width: 800px;
	        margin: 0 auto;
	        padding: 0;
	        text-align: center;
	        .button {
	            display: inline-block;
	            text-align: center;
	            padding: 10px 15px;
	            margin: 10px;
	            background: red;
	            font-size: 18px;
	            background-color: #efefef;
	            border-radius: 3px;
	            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	            cursor: pointer;
	            &:hover {
	                color: white;
	                background: #009bd5;
	            }
	        }
	    }
	}
	@keyframes unfoldIn {
		0% {
			transform: scaleY(.002) scaleX(0);
		}
	
		50% {
			transform: scaleY(.002) scaleX(1);
		}
	
		100% {
			transform: scaleY(1) scaleX(1);
		}
	}
	
	@keyframes unfoldOut {
		0% {
			transform: scaleY(1) scaleX(1);
		}
	
		50% {
			transform: scaleY(.05) scaleX(1);
		}
	
		100% {
			transform: scaleY(.05) scaleX(0);
		}
	}
	
	@keyframes zoomIn {
		0% {
			transform: scale(0);
		}
	
		100% {
			transform: scale(1);
		}
	}
	
	@keyframes zoomOut {
		0% {
			transform: scale(1);
		}
	
		100% {
			transform: scale(0);
		}
	}
	
	@keyframes fadeIn {
		0% {
			background: rgba(0,0,0,.0);
		}
	
		100% {
			background: rgba(0,0,0,.4);
		}
	}
	
	@keyframes fadeOut {
		0% {
			background: rgba(0,0,0,.4);
		}
	
		100% {
			background: rgba(0,0,0,.0);
		}
	}
	
	@keyframes scaleUp {
		0% {
			transform: scale(.8) translateY(1000px);
			opacity: 0;
		}
	
		100% {
			transform: scale(1) translateY(0px);
			opacity: 1;
		}
	}
	
	@keyframes scaleDown {
		0% {
			transform: scale(1) translateY(0px);
			opacity: 1;
		}
	
		100% {
			transform: scale(.8) translateY(1000px);
			opacity: 0;
		}
	}
	
	@keyframes scaleBack {
		0% {
			transform: scale(1);
		}
	
		100% {
			transform: scale(.85);
		}
	}
	
	@keyframes scaleForward {
		0% {
			transform: scale(.85);
		}
	
		100% {
			transform: scale(1);
		}
	}
	
	@keyframes quickScaleDown {
		0% {
			transform: scale(1);
		}
	
		99.9% {
			transform: scale(1);
		}
	
		100% {
			transform: scale(0);
		}
	}
	
	@keyframes slideUpLarge {
		0% {
			transform: translateY(0%);
		}
	
		100% {
			transform: translateY(-100%);
		}
	}
	
	@keyframes slideDownLarge {
		0% {
			transform: translateY(-100%);
		}
	
		100% {
			transform: translateY(0%);
		}
	}
	
	@keyframes moveUp {
		0% {
			transform: translateY(150px);
		}
	
		100% {
			transform: translateY(0);
		}
	}
	
	@keyframes moveDown {
		0% {
			transform: translateY(0px);
		}
	
		100% {
			transform: translateY(150px);
		}
	}
	
	@keyframes blowUpContent {
		0% {
			transform: scale(1);
			opacity: 1;
		}
	
		99.9% {
			transform: scale(2);
			opacity: 0;
		}
	
		100% {
			transform: scale(0);
		}
	}
	
	@keyframes blowUpContentTwo {
		0% {
			transform: scale(2);
			opacity: 0;
		}
	
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
	
	@keyframes blowUpModal {
		0% {
			transform: scale(0);
		}
	
		100% {
			transform: scale(1);
		}
	}
	
	@keyframes blowUpModalTwo {
		0% {
			transform: scale(1);
			opacity: 1;
		}
	
		100% {
			transform: scale(0);
			opacity: 0;
		}
	}
	
	@keyframes roadRunnerIn {
		0% {
			transform: translateX(-1500px) skewX(30deg) scaleX(1.3);
		}
	
		70% {
			transform: translateX(30px) skewX(0deg) scaleX(.9);
		}
	
		100% {
			transform: translateX(0px) skewX(0deg) scaleX(1);
		}
	}
	
	@keyframes roadRunnerOut {
		0% {
			transform: translateX(0px) skewX(0deg) scaleX(1);
		}
	
		30% {
			transform: translateX(-30px) skewX(-5deg) scaleX(.9);
		}
	
		100% {
			transform: translateX(1500px) skewX(30deg) scaleX(1.3);
		}
	}
	
	@keyframes sketchIn {
		0% {
			stroke-dashoffset: 778;
		}
	
		100% {
			stroke-dashoffset: 0;
		}
	}
	
	@keyframes sketchOut {
		0% {
			stroke-dashoffset: 0;
		}
	
		100% {
			stroke-dashoffset: 778;
		}
	}
	
	@keyframes modalFadeIn {
		0% {
			background-color: transparent;
		}
	
		100% {
			background-color: white;
		}
	}
	
	@keyframes modalFadeOut {
		0% {
			background-color: white;
		}
	
		100% {
			background-color: transparent;
		}
	}
	
	@keyframes modalContentFadeIn {
		0% {
			opacity: 0;
			top: -20px;
		}
	
		100% {
			opacity: 1;
			top: 0;
		}
	}
	
	@keyframes modalContentFadeOut {
		0% {
			opacity: 1;
			top: 0px;
		}
	
		100% {
			opacity: 0;
			top: -20px;
		}
	}
	
	@keyframes bondJamesBond {
		0% {
			transform: translateX(1000px);
		}
	
		80% {
			transform: translateX(0px);
			border-radius: 75px;
			height: 75px;
			width: 75px;
		}
	
		90% {
			border-radius: 3px;
			height: 182px;
			width: 247px;
		}
	
		100% {
			border-radius: 3px;
			height: 162px;
			width: 227px;
		}
	}
	
	@keyframes killShot {
		0% {
			transform: translateY(0) rotate(0deg);
			opacity: 1;
		}
	
		100% {
			transform: translateY(300px) rotate(45deg);
			opacity: 0;
		}
	}
	
	@keyframes fadeToGrey {
		0% {
			
		}
	
		100% {
			background-color: rgba(black,.4);
		}
	}
	
	@keyframes slowFade {
		0% {
			opacity: 1;
		}
	
		99.9% {
			opacity: 0;
			transform: scale(1);
		}
	
		100% {
			transform: scale(0);
		}
	}
</style>



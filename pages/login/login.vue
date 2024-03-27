<template>
	<div 
		v-if="!rotate"
		class="ncu-login"
		:style="{
			transform: `translateX(-50%) rotateY(${rotate ? 180 : 0}deg)`,
		}">
		
		<ncu-form-item :animaDelay="0">
			<image mode="aspectFit" src="/static/mall2.png"></image>
		</ncu-form-item>
		<ncu-form-item :animaDelay="0.2">
			<v-input
				icon="people"
				placeholder="用户名"
				v-model="userInfo.student_id">
			</v-input>
		</ncu-form-item>
		<ncu-form-item
			:marginBottom="20"
			:animaDelay="0.4">
			<v-input
				icon="lock"
				placeholder="密码"
				type="password"
				v-model="userInfo.password">
			</v-input>
		</ncu-form-item>
		<ncu-form-item :animaDelay="0.6">
			<ncu-button
				bgImage="white"
				width="80%"
				shadow
				:radius="true"
				@click="login">
				登录
			</ncu-button> 
		</ncu-form-item>
		<ncu-form-item :animaDelay="0.8">
			<ncu-button
			 	bgColor="white"
				width="80%"
				shadow
				:hollowOut="true"
			 	:radius="true"
			 	@click="register">
			 	注册
			</ncu-button> 
		</ncu-form-item>
		<!-- <ncu-form-item
			:animaDelay="1"
			:style="{
				position: 'absolute',
				left: '50%',
				bottom: '30px',
				width: '80%',
				transform: 'translateX(-50%)',
			}">
			<ncu-button
			 	bgImage="green"
			 	openType="getUserInfo"
				width="80%"
				shadow
			 	:radius="true"
			 	@click="wxLogin">
			 	<span class="cuIcon-weixin"></span>微信登录
			</ncu-button> 
						
		</ncu-form-item> -->
		
	</div>
</template>

<script>
	import GlobalData from '../../common/global.js'
	import { validator } from '../../common/func.js'
	import { httpPost } from '../../common/http.js'
	import { login_api, wechatLogin_api } from '../../common/api.js'
	import { projectTitle } from '../../common/config.js'
    export default {
		props: {
			rotate: {
				type: Boolean,
				default: () => false
			},
			isLoading: {
				type: Boolean,
				default: () => false
			}
		},
		model: {
			prop: 'isLoading',
			event: 'input',
		},
        data() {
            return {
				userInfo: {
					student_id: '8002119299',
					password: 'sun19961203@'
				},
				projectTitle: projectTitle,
            }
        },
		methods: {
			userInfoValidator() {
				const requiredFields = ['student_id', 'password']
				const requiredFieldsHans = ['学号', '密码']
				return validator(this.userInfo, requiredFields, requiredFieldsHans)
			},
			async login() {
				if(this.isLoading) return
				this.$emit('input', true)
				let valid_err = this.userInfoValidator()
				if(valid_err) {
					this.$emit('messageOpen', [
						valid_err+'不能为空', 'danger'
					]);
					return
				}
				const [res, err] = await httpPost(login_api, 
											this.userInfo, 2002)
				this.isLoading = false
				this.$emit('input', false)
				if(err) {
					this.$emit('messageOpen', [
						err, 'danger'
					]);
					return
				}
				this.saveData(res)
				
				// this.isLoading = true
				// setTimeout(() => {
				// 	this.isLoading = false
				// }, 4000)
			},
			async wxLogin() {
				if(this.isLoading) return
				this.$emit('input', true)
				uni.login({
					provider: 'weixin',
					success: async (authRes) => {
						let js_code = authRes.code
						const [res, err] = await httpPost(wechatLogin_api, {
							js_code,
						}, 2003)
						this.isLoading = false
						this.$emit('input', false)
						// 有错误说明该用户未注册
						if(err) {
							// 这里需要重新获取 js_code ，
							// 因为在上面的 login 请求中已经使用过一次了
							uni.login({
								provider: 'weixin',
								success: async (reAuthres) => {
									js_code = reAuthres.code
									GlobalData.wechatLoginJsCode = js_code
									this.$emit('messageOpen', [
										'前往注册界面完善信息', 'info'
									]);
									this.register()
								}
							})
							return
						} else {
							this.saveData(res)
						}
					}
				})
				
			},
			saveData(res) {
				GlobalData.userInfo = res.data
				GlobalData.userInfo['isLogin'] = true
				GlobalData.focusUserInfo = {}
				
				// 将 set-cookie 字段内容保存至 storage
				uni.setStorageSync('cookie', res.header['Set-Cookie'])
				uni.navigateTo({
					url: '/pages/index/index'
				})
				GlobalData.login.noticeWatcher()
			},
			register() {
				this.$emit('onRotate', !this.rotate)
			},
		}
    }
</script>

<style lang="scss" scoped>
	
	.ncu-login {
		width: 90%;
		height: 60vh;
		margin: 0 auto;
		padding: 20% 30px;
		// background-color: var(--main-bg-color);
		background-position: bottom center;
		background-repeat: no-repeat;
		background-size: 300%;
		
		border-radius: 6px;
		text-align: center;
		position: absolute;
		top: 0;
		left: 50%;
		transform-style: preserve-3d;
		transition: all 600ms ease-out;
		
		.cuIcon-weixin {
			font-size: 1.5em;
			margin-right: .3em;
		}
		
	}
</style>



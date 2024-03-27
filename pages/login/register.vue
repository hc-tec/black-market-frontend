<template>
	<div>
		<div 
			v-if="rotate"
			class="ncu-register"
			:style="{
				transform: `translateX(-50%) rotateY(${rotate ? 0 : 180}deg)`,
				zIndex: rotate ? 1 : 0
			}">
			<ncu-form-item :animaDelay="0">
				<image mode="aspectFit" src="/static/mall2.png"></image>
			</ncu-form-item>
			<!-- <ncu-form-item :animaDelay="0.2">
				<ncu-img-choose
					:src="userInfo.avatar"
					@change="chooseAvatar">
				</ncu-img-choose>
			</ncu-form-item> -->
			
			<!-- <ncu-form-item :animaDelay="0.4">
				<v-input
					icon="people"
					placeholder="用户名"
					size="big"
					v-model="userInfo.user_name">
				</v-input>
			</ncu-form-item> -->
			<!-- <ncu-form-item :animaDelay="0.6">
				<v-input
					icon="addressbook"
					placeholder="学号"
					size="big"
					v-model="userInfo.student_id">
				</v-input>
			</ncu-form-item> -->
			
			<!-- <ncu-form-item :animaDelay="0.8">
				<v-input
					icon="lock"
					placeholder="密码,至少含1个小写字母，1个数字，1个特殊字符"
					type="password"
					size="big"
					v-model="userInfo.password">
				</v-input>
			</ncu-form-item> -->
			
			<!-- <ncu-form-item :animaDelay="1">
				<v-input
					icon="message"
					placeholder="联系方式"
					size="big"
					v-model="userInfo.contact">
				</v-input>
			</ncu-form-item> -->
			
			<ncu-form-item :animaDelay="0.4">
				<v-input
					icon="message"
					placeholder="请输入邮箱"
					size="big"
					v-model="userInfo.email">
				</v-input>
			</ncu-form-item>
			
			<ncu-form-item
				:animaDelay="0.6"
				:marginBottom="20">
				<v-valid-input
					ref="validCodeInput"
					icon="focus"
					placeholder="验证码,未收到请查询垃圾邮箱"
					size="big"
					v-model="userInfo.ver_code"
					@send="validCodeSend">
					
				</v-valid-input>
			</ncu-form-item>
			
			<!-- <ncu-form-item :animaDelay="0.8" >
				<v-input
					:value="getSchoolZoneLabelByValue()"
					icon="shop"
					size="big"
					placeholder="请选择校区"
					disabled
					@click="schoolZoneItem.open=true">
				</v-input>
			</ncu-form-item> -->
			
			<!-- <ncu-form-item
				:animaDelay="1.4">
				<v-input
					type="textarea"
					icon="profile"
					placeholder="个人简介"
					v-model="userInfo.profile">
				</v-input>
			</ncu-form-item> -->
			
			
			
			<ncu-form-item :animaDelay="0.8">
				<ncu-button
					bgImage="white"
					width="80%"
					shadow
					:radius="true"
					@click="loginOrRegister">
					登录 / 注册
				</ncu-button> 
			</ncu-form-item>
			
			<!-- <ncu-form-item :animaDelay="1.8">
				<ncu-button
					bgColor="white"
					width="80%"
					shadow
					:hollowOut="true"
					:radius="true"
					@click="login">
					返回登录界面
				</ncu-button> 
			</ncu-form-item> -->
			
		</div>
		
		<ncu-popup-select
			v-model="schoolZoneItem.school_zone"
			title="选择校区"
			:open="schoolZoneItem.open"
			:items="schoolZones"
			@confirm="schoolZoneModifyConfirm"
			@cancel="schoolZoneItem.open=false"
			@layer-click="schoolZoneItem.open=false">
		</ncu-popup-select>
		
	</div>
</template>

<script>
	import GlobalData from '../../common/global.js'
	import { uniFileUploader, httpPost } from '../../common/http.js'
	import { Host, loginOrRegister_api, image_upload_api, getEmailCode_api, wechatRegister_api } from '../../common/api.js'
	import { validator } from '../../common/func.js'
	import { schoolZones, projectTitle } from '../../common/config.js'
    export default {
		props: {
			rotate: {
				type: Boolean,
				default: () => true
			},
			isLoading: {
				type: Boolean,
				default: () => false
			},
		},
		model: {
			prop: 'isLoading',
			event: 'input',
		},
        data() {
            return {
				projectTitle: projectTitle,
				pickerIndex: -1,
				schoolZones: schoolZones,
				schoolZoneItem: {
					open: false,
					school_zone: 0,
				},
				userInfo: {
					student_id: '8002119303',
					user_name: 'test3',
					password: 'sun19961203@',
					email: '2598772546@qq.com',
					contact: '2598772546',
					profile: '',
					avatar: '',
					school_zone: 1,
					ver_code: 'fbb6e2',
				},
				
            }
        },
		methods: {
			getUserInfo() {
				return new Promise((resolve, reject) => {
					uni.getUserInfo({
						success(res) {
							resolve(res)
						},
						fail(res) {
							reject(res)
						}
					})
				})
			},
			async validCodeSend() {
				if(this.isLoading) return
				this.$emit('input', true)
				if(!this.userInfo.email) {
					this.$emit('messageOpen', ['email不能为空', 'danger'])
					return
				}
				this.$refs.validCodeInput.send()
				const [res, err] = await httpPost(getEmailCode_api,
												{email: this.userInfo.email},
												2006)
				this.$emit('input', false)
				if (err) {
					this.$emit('messageOpen', [err, 'danger'])
				} else {
					this.$emit('messageOpen', ['验证码发送成功'])
				}
			},
			getSchoolZoneLabelByValue() {
				const schoolZoneIndex = 
					this.schoolZones
					.map(zone => zone.value === this.userInfo.school_zone)
					.indexOf(true)
				return schoolZoneIndex !== -1 ? 
					this.schoolZones[schoolZoneIndex].label : 
					''
			},
			schoolZoneModifyConfirm() {
				this.schoolZoneItem.open = false
				this.userInfo.school_zone = this.schoolZoneItem.school_zone
				this.getSchoolZoneLabelByValue()
			},
			login() {
				// this.$emit('onRotate', !this.rotate)
				// GlobalData.wechatLoginJsCode = ''
			},
			userInfoValidator() {
				const requiredFields = ['email',  'ver_code']
				const requiredFieldsHans = ['邮箱', '验证码']
				return validator(this.userInfo, requiredFields, requiredFieldsHans)
			},
			async handleAvatarUpload() {
				const {res, err} = await uniFileUploader(image_upload_api, 
												this.userInfo.avatar,
												1002)
				if(err) {
					this.$emit('messageOpen', [err, 'danger'])
					return
				}
				return res
			},
			async loginOrRegister() {
				if(this.isLoading) return
				this.$emit('input', true)
				let res;
				let err = this.userInfoValidator()
				if(err) {
					this.$emit('messageOpen', [err+'不能为空', 'danger'])
					return
				}
				const userInfo = JSON.parse(JSON.stringify(this.userInfo))
				const isAvatarUpload = userInfo.avatar.startsWith(Host)
				if(userInfo.avatar 
					&& !isAvatarUpload 
					&& !userInfo.avatar.startsWith("https://thirdwx.qlogo.cn")) {
					const avatar_res = await this.handleAvatarUpload()	
					userInfo.avatar = avatar_res.data.data.path
				}
				
				if(GlobalData.wechatLoginJsCode) {
					[res, err] = await this.wechatRegister(userInfo);
				} else {
					[res, err] = await this.normalRegister(userInfo);
				}
				this.$emit('input', false)
				err && this.$emit('messageOpen', [err, 'danger'])
				!err && (this.$emit('messageOpen', ['注册成功']),
						this.saveData(res))
				
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
			async normalRegister(data) {
				return await httpPost(loginOrRegister_api, data, 2000);
			},
			async wechatRegister(data) {
				data.js_code = GlobalData.wechatLoginJsCode
				return await httpPost(wechatRegister_api, data, 2001);
			},
			chooseAvatar(src) {
				this.userInfo.avatar = src
			}
		},
		async created() {
			
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-register {
		width: 90%;
		height: 60vh;
		margin: 0 auto;
		padding: 20% 30px;
		// background-color: var(--main-bg-color);
		// background-image: url(http://neumorphic.cn/static/50bf7e26-4f8b-4205-9f7c-60787297c668.svg);
		background-position: bottom center;
		background-repeat: no-repeat;
		background-size: 300%;
		border-radius: 6px;
		text-align: center;
		backdrop-filter: blur(30px);
		position: absolute;
		top: 0;
		left: 50%;
		transform-style: preserve-3d;
		// transition: all 600ms ease-out;
		overflow: auto;
	
	}
	
</style>



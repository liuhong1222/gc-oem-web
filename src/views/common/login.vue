<template>
  <div class="site-wrapper site-page--login">
    <div class="login-con">
      <div class="login-img">
        <img src="~@/assets/img/lo_pic.jpg" alt="">
      </div>
      <div class="login-main">
        <!-- <img src="~@/assets/img/logo.png" alt=""> -->
        <div class="context">
          <span></span>
          <h3 class="login-title">登录</h3>
          <p>欢迎您！亲爱的用户，请登录</p>
        </div>
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
          <el-form-item prop="userName">
            <img src="~@/assets/img/phoneUser.jpg" alt="" class="icon">
            <el-input v-model="dataForm.userName" placeholder="请输入手机号" class="account"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <img src="~@/assets/img/keylogin.jpg" alt="" class="icon">
            <el-input v-model="dataForm.password" type="password" placeholder="请输入密码" class="account"></el-input>
          </el-form-item>
          <span style="color:#999;font-size:14px;">如需开户请联系管理员</span>
          <el-button type="text" class="forgetPwd" @click="forgetPwd" style="display:none">忘记密码</el-button>
          <el-form-item style="margin-top:30px">
            <el-button class="login-btn-submit loginBtn" type="primary" @click="dataFormSubmit()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  export default {
    data() {
      return {
        dataForm: {
          userName: '',
          password: '',
          uuid: '',
          captcha: ''
        },
        dataRule: {
          userName: [
            { required: true, message: '帐号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
    },
    methods: {
      // 提交表单
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/sys/login'),
              method: 'post',
              data: this.$http.adornData({
                'username': this.dataForm.userName,
                'password': md5(this.dataForm.password),
                'uuid': this.dataForm.uuid,
                'captcha': '1111'
              })
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.$cookie.set('token', data.token)
                // 初始密码：true是没修改过,false是修改过
                sessionStorage.setItem('isFirstLogin', data.isFirstLogin)
                // 判断哪个，进入不同的工作台
                // if (data.roleIdList[0] == 1) {
                //   this.$router.replace({ name: 'console-admin' })
                //   sessionStorage.setItem('msjRoleName', '1')
                // } else 

                if (data.roleIdList[0] == 2) {
                  this.$router.replace({ name: 'console-agent' })
                  sessionStorage.setItem('msjRoleName', '2')
                  this.auditStatus()
                } else {
                  this.$router.replace({ name: 'console-admin' })
                  sessionStorage.setItem('msjRoleName', '1')
                }
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      forgetPwd() {
        this.$router.replace({ name: 'forget' })
      },
      // 查询审核状态
      auditStatus() {
        this.$http({
          url: this.$http.adornUrl(`agent/set/audit/state?token=${this.$cookie.get('token')}`),
          method: 'get',
        }).then(({ data }) => {
          if (data && data.code === 0) {
            if (data.auditState == 2) { //驳回
              sessionStorage.setItem('isExamine', 'reject')  //我的代办
              sessionStorage.setItem('remarkCon', data.remark)
              sessionStorage.setItem('remarkDialog', 'remarkDialogTr')  //弹出框
            } else {
              sessionStorage.setItem('isExamine', '')  //我的代办
              sessionStorage.setItem('remarkDialog', '')  //弹出框
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    }
  }

</script>

<style lang="scss">
  $bc:#4680ff;
  $lbc:#6192FC;

  .site-wrapper.site-page--login {
    min-height: 100vh;
    width: 100%;
    background-image: linear-gradient(0deg, #152151 0%, #09102c 100%);
  }

  .login-con {
    width: 915px;
    height: 514px;
    position: absolute;
    left: 50%;
    top: 20%;
    margin-left: -475.5px;
  }

  .login-main {
    position: absolute;
    top: 0;
    right: 1px;
    padding: 26px 31px 0px 39px;
    min-height: 100%;
    background-color: #eee;

    >img {
      float: right;
    }

    >.context {
      margin-top: 90px;
      margin-bottom: 25px;

      >span {
        width: 4px;
        display: inline-block;
        height: 20px;
        background-color: #4680ff;
        vertical-align: middle;
      }

      >h3 {
        font-size: 18px;
        color: #333;
        font-weight: 700;
        display: inline;
        margin-left: 5px;
        vertical-align: middle;
      }

      >p {
        font-size: 14px;
        color: #999;
        margin-left: 15px;
      }
    }
  }

  .account {
    width: 280px !important;
    height: 44px;
    line-height: 44px;
    background-color: #ffffff;
    border-radius: 3px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    margin-left: -3px;
  }

  .account .el-input__inner {
    border: none !important;
  }

  .loginBtn {
    width: 334px;
    height: 44px;
    background-color: $bc;
    border-radius: 3px;
    border: none !important;
  }

  .loginBtn:hover,
  .loginBtn:focus {
    background-color: $lbc !important;
  }

  .icon {
    margin-top: -2px;
  }

  .el-button--text:focus,
  .el-button--text:hover {
    color: $lbc !important;
  }

  .forgetPwd {
    float: right;
    color: $bc;
    ;
    font-size: 14px;
    margin-top: -15px;
    margin-bottom: 20px;
  }
</style>
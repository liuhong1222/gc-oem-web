<template>
    <div class="mainEditPwd">
        <h3>修改密码</h3>
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
            <el-form-item label="账号">
                <span>{{ userName }}</span>
            </el-form-item>
            <el-form-item label="原密码" prop="password">
                <el-input type="password" v-model="dataForm.password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="dataForm.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="dataForm.confirmPassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import md5 from 'js-md5';
    export default {
        data() {
            var validateConfirmPassword = (rule, value, callback) => {
                if (this.dataForm.newPassword !== value) {
                    callback(new Error('确认密码与新密码不一致'))
                } else {
                    callback()
                }
            }
            return {
                dataForm: {
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                },
                dataRule: {
                    password: [
                        { required: true, message: '原密码不能为空', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: '新密码不能为空', trigger: 'blur' }
                    ],
                    confirmPassword: [
                        { required: true, message: '确认密码不能为空', trigger: 'blur' },
                        { validator: validateConfirmPassword, trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            userName: {
                get() { return this.$store.state.user.name }
            },
            mainTabs: {
                get() { return this.$store.state.common.mainTabs },
                set(val) { this.$store.commit('common/updateMainTabs', val) }
            }
        },
        methods: {
            // 表单提交
            dataFormSubmit() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.$http({
                            url: this.$http.adornUrl('/sys/user/password'),
                            method: 'post',
                            data: this.$http.adornData({
                                'password': md5(this.dataForm.password),
                                'newPassword': md5(this.dataForm.newPassword)
                            })
                        }).then(({ data }) => {
                            if (data && data.code === 0) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success',
                                    duration: 1500,
                                    onClose: () => {
                                        this.visible = false
                                        this.$nextTick(() => {
                                            this.mainTabs = []
                                            this.$cookie.delete('token')
                                            this.$router.replace({ name: 'login' })
                                        })
                                    }
                                })
                            } else {
                                this.$message.error(data.msg)
                            }
                        })
                    }
                })
            }
        }
    }

</script>

<style>
    .mainEditPwd {
        width: 100%;
        padding: 20px 23px 40px;
        background-color: #fff;
        box-shadow: 0px 7px 9px 0px rgba(153, 153, 153, 0.05);

    }

    .mainEditPwd .el-input__inner {
        width: 45%
    }
</style>
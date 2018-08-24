<template>
    <el-dialog :title="!accountdataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible" @close='closeDialog'>
        <el-form :model="accountdataForm" :rules="accdatarules" ref="accountdataFormref" label-width="150px" class="demo-ruleForm"
            :label-position="labelPosition">
            <!-- <el-form-item label="用户编号：" prop="agentNumber" id="agentNumberAcc">
                <el-input v-model="accountdataForm.agentNumber" placeholder="用户编号" :readonly="readonly"></el-input>
            </el-form-item> -->
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="accountdataForm.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="mobile">
                <el-input v-model="accountdataForm.mobile" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码：" :prop="!accountdataForm.id ? 'password' : ''">
                <el-input v-model="accountdataForm.password" placeholder="密码"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="accDataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import md5 from 'js-md5';
    import { isEmail, isMobile } from '@/utils/validate'
    export default {
        data() {
            var validateMobile = (rule, value, callback) => {
                if (!isMobile(value)) {
                    callback(new Error('手机号格式错误'))
                } else {
                    callback()
                }
            }
            return {
                visible: false,
                readonly: false,
                labelPosition: 'right',
                accountdataForm: {
                    id: '',
                    // agentNumber: '',
                    name: '',
                    mobile: '',
                    password: ''
                },
                accdatarules: {
                    // agentNumber: [
                    //     { required: true, message: '请输入用户编号', trigger: 'blur' }
                    // ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入联系电话', trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                },

            }
        },
        methods: {
            updateInit(paramArr) {
                console.log(paramArr)
                this.visible = true
                this.readonly = false
                if (paramArr !== "") {
                    this.readonly = true
                    this.accountdataForm.id = paramArr[0] || 0
                    // this.accountdataForm.agentNumber = paramArr[0]
                    this.accountdataForm.name = paramArr[1]
                    this.accountdataForm.mobile = paramArr[2]
                }

            },
            accDataFormSubmit() {
                this.$refs['accountdataFormref'].validate((valid) => {
                    if (valid) {
                        // console.log('验证通过')
                        this.$http({
                            url: this.$http.adornUrl(`agent/agentSysUser/${!this.accountdataForm.id ? 'save' : 'update'}?token=${this.$cookie.get('token')}`),
                            method: 'post',
                            params: this.$http.adornParams({
                                'userId': this.accountdataForm.id || undefined,
                                'realName': this.accountdataForm.name,
                                'mobile': this.accountdataForm.mobile,
                                'password': (this.accountdataForm.password) ? md5(this.accountdataForm.password) : this.accountdataForm.password
                            })
                        }).then(({ data }) => {
                            console.log(data)
                            if (data && data.code === 0) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success',
                                    duration: 1500,
                                    onClose: () => {
                                        this.visible = false
                                        this.$emit('refreshDataList')
                                    }
                                })
                            } else {
                                this.$message.error(data.msg)
                            }
                        })
                    }
                })
            },
            closeDialog() {
                this.accountdataForm.id = ""
                // this.accountdataForm.agentNumber = ""
                this.accountdataForm.name = ""
                this.accountdataForm.mobile = ""
                this.accountdataForm.password = ""
            }
        }
    }

</script>

<style lang="scss">

</style>
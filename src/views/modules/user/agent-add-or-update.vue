<template>
    <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
        <el-form :model="dataForm" :rules="datarules" ref="dataForm" label-width="150px" class="demo-ruleForm" :label-position="labelPosition">
            <h3>基本信息</h3>
            <el-form-item label="代理商编号：" prop="agentNumber">
                <el-input v-model="dataForm.agentNumber" placeholder="代理商编号" ></el-input>
            </el-form-item>
            <el-form-item label="营业执照：" prop="agentNumber">
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span>（上传后，以下部分信息可自动导入）</span>
            </el-form-item>

            <el-form-item label="商户编号：" prop="businNumber">
                <el-input v-model="dataForm.businNumber" placeholder="商户编号"></el-input>
            </el-form-item>
            <el-form-item label="公司名称：" prop="companyName">
                <el-input v-model="dataForm.companyName" placeholder="公司名称"></el-input>
            </el-form-item>
            <el-form-item label="营业执照所在地：" prop="bussicAdress">
                <el-input v-model="dataForm.bussicAdress" placeholder="营业执照所在地"></el-input>
            </el-form-item>
            <el-form-item label="法人姓名：" prop="lawName">
                <el-input v-model="dataForm.lawName" placeholder="法人姓名"></el-input>
            </el-form-item>
            <el-form-item label="营业执照号：" prop="businNum">
                <el-input v-model="dataForm.businNum" placeholder="营业执照号"></el-input>
            </el-form-item>
            <el-form-item label="营业期限：" prop="busindate">
                <el-input v-model="dataForm.busindate1" placeholder="营业执照号" style="width:35%;"></el-input>至
                <el-input v-model="dataForm.busindate2" placeholder="营业执照号" style="width:35%;"></el-input>
            </el-form-item>
            <h3>联系人信息</h3>
            <el-form-item label="联系人姓名：" prop="username">
                <el-input v-model="dataForm.username" placeholder="联系人姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系人手机号：" prop="mobile">
                <el-input v-model="dataForm.mobile" placeholder="联系人手机号"></el-input>
            </el-form-item>
            <el-form-item label="联系人邮箱：" prop="email">
                <el-input v-model="dataForm.email" placeholder="联系人邮箱"></el-input>
            </el-form-item>
            <el-form-item label="职务：" prop="work">
                <el-input v-model="dataForm.work" placeholder="职务"></el-input>
            </el-form-item>
            <h3>账号信息</h3>
            <el-form-item label="登录账号：" prop="loginAcc">
                <el-input v-model="dataForm.loginAcc" placeholder="登录账号"></el-input>
            </el-form-item>
            <el-form-item label="初始密码：" prop="pwd">
                <el-input v-model="dataForm.pwd" placeholder="初始密码"></el-input>
            </el-form-item>
            <h3>代理商级别</h3>
            <el-form-item label="代理级别：" prop="agencylevel">
                <el-select v-model="dataForm.agencylevel" placeholder="请选择代理级别">
                    <el-option label="一级" value="1"></el-option>
                    <el-option label="二级" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单价：" prop="price">
                <el-input v-model="dataForm.price" placeholder="单价"></el-input>
            </el-form-item>
            <el-form-item label="允许超出条数：" prop="allowCounts">
                <el-input v-model="dataForm.allowCounts" placeholder="允许超出条数"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>

</template>
<script>
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
                imageUrl: '',
                visible: false,
                labelPosition: 'right',
                dataForm: {
                    id: 0,
                    userName: ''
                },
                datarules: {
                    agentNumber: [
                        { required: true, message: '请输入代理商编号', trigger: 'blur' }
                    ],
                    businNumber: [
                        { required: true, message: '请输入商家编号', trigger: 'blur' }
                    ],
                    companyName: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' }
                    ],
                    bussicAdress: [
                        { required: true, message: '请输入营业执照所在地', trigger: 'blur' }
                    ],
                    lawName: [
                        { required: true, message: '请输入法人姓名', trigger: 'blur' }
                    ],
                    businNum: [
                        { required: true, message: '请输入营业执照号', trigger: 'blur' }
                    ],
                    busindate: [
                        { required: true, message: '请输入营业期限', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请输入联系人姓名', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入联系电话', trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    loginAcc: [
                        { required: true, message: '请输入登录账号', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请输入初始密码', trigger: 'blur' }
                    ],
                    agencylevel: [
                        { required: true, message: '请选择代理商级别', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入单价', trigger: 'blur' }
                    ],
                    allowCounts: [
                        { required: true, message: '请输入允许超出条数', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            showInit(id) {
                this.dataForm.id = id || 0
                this.visible = true
                console.log(this.$http.adornParams())
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields()
                })
            },
            dataFormSubmit() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log('表单验证通过')
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }

</script>
<style lang="scss">
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
</style>
<template>
    <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible" :before-close="closeDialog">
        <el-form :model="dataForm" :rules="datarules" ref="dataForm" label-width="150px" class="demo-ruleForm" :label-position="labelPosition">
            <h3>基本信息</h3>
            <el-form-item label="代理商编号：" prop="agentNumber">
                <el-input v-model="dataForm.agentNumber" placeholder="代理商编号"></el-input>
            </el-form-item>
            <el-form-item label="营业执照：" prop="">
                <el-upload class="avatar-uploader" :action="priseurl" accept="image/jpeg,image/jpg,image/png" :show-file-list="false" :on-success="perisehandleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="priseimageUrl" :src="priseimageUrl" class="avatar">
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
                <el-input v-model="dataForm.busindate1" placeholder="2018-08-18" style="width:35%;"></el-input>至
                <el-input v-model="dataForm.busindate2" placeholder="2020-12-25" style="width:35%;"></el-input>
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
                    <el-option :value="item.id" :label="item.name" v-for="(item,index) in agencylevelArr" :key="index">
                    </el-option>
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
                priseimageUrl: "",
                priseurl: "",
                licensePicNo: '',
                visible: false,
                labelPosition: 'right',
                agencylevelArr: [],  //级别数组
                dataForm: {
                    id: 0,
                    agentNumber: '',
                    businNumber: '',
                    companyName: '',
                    bussicAdress: '',
                    lawName: '',
                    businNum: '',
                    busindate1: '',
                    busindate2: '',
                    username: '',
                    mobile: '',
                    email: '',
                    work: '',
                    loginAcc: '',
                    pwd: '',
                    agencylevel: '',  //级别
                    price: '',
                    allowCounts: ''

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
                    // busindate: [
                    //     { required: true, message: '请输入营业期限', trigger: 'blur' }
                    // ],
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
                    // agencylevel: [
                    //     { required: true, message: '请选择代理商级别', trigger: 'blur' }
                    // ],
                    price: [
                        { required: true, message: '请输入单价', trigger: 'blur' }
                    ],
                    allowCounts: [
                        { required: true, message: '请输入允许超出条数', trigger: 'blur' }
                    ]
                }
            }
        },
        watch: {
            dataForm: {
                handler: function (val, oldVal) {
                    this.dataForm.loginAcc = this.dataForm.mobile
                },
                deep: true
            }
        },
        methods: {
            showInit(id) {
                this.dataForm.id = id || 0
                this.visible = true
                console.log('id' + id)
                console.log(this.$http.adornParams())
                this.$http({
                    url: this.$http.adornUrl(`agent/level/list?token=${this.$cookie.get('token')}`),
                    method: 'get',
                }).then(({ data }) => {
                    if (data && data.code === 0) {

                        this.agencylevelArr = data.data
                    } else {
                        this.agencylevelArr = []
                    }
                })
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields()
                })
                this.priseurl = this.$http.adornUrl(`agent/agentInfo/license/upload?token=${this.$cookie.get('token')}`)
                if (this.dataForm.id) {

                    this.$http({
                        url: this.$http.adornUrl(`agent/agentInfo/detail?token=${this.$cookie.get('token')}&agentId=${this.dataForm.id}`),
                        method: 'get',
                        params: this.$http.adornParams()
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            this.priseimageUrl = data.data.licenseUrl
                            this.dataForm.agentNumber = data.data.agentNo
                            this.dataForm.businNumber = data.data.mchId
                            this.dataForm.companyName = data.data.companyName
                            this.dataForm.bussicAdress = data.data.address
                            this.dataForm.lawName = data.data.legalPerson
                            this.dataForm.businNum = data.data.licenseNo
                            this.dataForm.busindate1 = data.data.effectDate
                            this.dataForm.busindate2 = data.data.expireDate
                            this.dataForm.username = data.data.contactName
                            this.dataForm.mobile = data.data.mobile
                            this.dataForm.email = data.data.email
                            this.dataForm.work = data.data.position
                            this.dataForm.loginAcc = data.data.mobile
                            this.dataForm.agencylevel = data.data.levelId
                            this.dataForm.price = data.data.price
                            this.dataForm.allowCounts = data.data.emptyCreditNumber
                        }
                    })
                }

            },
            dataFormSubmit() {
                // console.log(this.dataForm.busindate1)
                // console.log(this.dataForm.busindate2)
                // console.log(this.dataForm.allowCounts)
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.$http({
                            url: this.$http.adornUrl(`agent/agentInfo/${!this.dataForm.id ? 'save' : 'update'}?token=${this.$cookie.get('token')}`),
                            method: 'post',
                            params: this.$http.adornParams({
                                'agentId': this.dataForm.id || undefined,
                                'licensePicNo': this.licensePicNo,
                                'companyName': this.dataForm.companyName,
                                'mchId': this.dataForm.businNumber,
                                'address': this.dataForm.bussicAdress,
                                'email': this.dataForm.email,
                                'legalPerson': this.dataForm.lawName,
                                'licenseNo': this.dataForm.businNum,
                                'effectDate': this.dataForm.busindate1,
                                'expireDate': this.dataForm.busindate2,
                                'contactName': this.dataForm.username,
                                'position': this.dataForm.work,
                                'mobile': this.dataForm.mobile,
                                'email': this.dataForm.email,
                                'password': this.dataForm.pwd,
                                'levelId': this.dataForm.agencylevel,
                                'price': this.dataForm.price,
                                'emptyCreditNumber': this.dataForm.allowCounts
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
            beforeAvatarUpload(file) {
                const isJPG = (file.type === 'image/jpeg') || (file.type == 'image/png') || (file.type == 'image/jpg');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            perisehandleAvatarSuccess(res, file) {
                console.log(res.data.licensePicNo)
                this.priseimageUrl = URL.createObjectURL(file.raw);
                this.licensePicNo = res.data.licensePicNo
            },
            closeDialog(done) {
                done();
                this.priseimageUrl = ""
                this.dataForm.busindate1 = ""
                this.dataForm.busindate2 = ""
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
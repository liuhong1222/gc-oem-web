<template>
    <div id="seeAgent">
        <!-- 个人客户修改 -->
        <el-dialog title="修改个人客户" :visible.sync="perVisible" width="52%">
            个人客户修改
            <el-form :model="perDataForm" :rules="perdatarules" ref="perDataForm" label-width="150px" :label-position="labelPosition">
                <el-form-item label="手机号码：" prop="mobile">
                    <el-input v-model="perDataForm.mobile" placeholder="手机号码"></el-input>
                </el-form-item>
                <el-form-item label="客户编号" prop="custNum">
                    <el-input v-model="perDataForm.custNum" placeholder="客户编号"></el-input>
                </el-form-item>
                <el-form-item label="身份证照片" prop="indoPic">
                    <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="otherhandleAvatarSuccess" :before-upload="beforeAvatarUpload"
                        style="display:inline-block">
                        <img v-if="perfaceimageUrl" :src="perfaceimageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:14px">正面</i>
                    </el-upload>
                    <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="otherhandleAvatarSuccess" :before-upload="beforeAvatarUpload"
                        style="display:inline-block">
                        <img v-if="perbackimageUrl" :src="perbackimageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:14px">反面</i>
                    </el-upload>
                    <span>（上传后，以下部分信息可自动导入）</span>
                </el-form-item>
                <el-form-item label="客户姓名" prop="custNanme">
                    <el-input v-model="perDataForm.custNanme" placeholder="客户姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码" prop="perIdno">
                    <el-input v-model="perDataForm.perIdno" placeholder="身份证号码"></el-input>
                </el-form-item>
                <el-form-item label="详细地址" prop="peraddress">
                    <el-input v-model="perDataForm.peraddress" placeholder="详细地址"></el-input>
                </el-form-item>
                <el-form-item label="证件期限" prop="pertimelimit1">

                    <el-input v-model="perDataForm.pertimelimit1" placeholder="开始" style="width:35%"></el-input> 至
                    <el-input v-model="perDataForm.pertimelimit2" placeholder="结束" style="width:35%"></el-input>
                </el-form-item>
                <el-form-item label="联系邮箱" prop="peremail">
                    <el-input v-model="perDataForm.peremail" placeholder="联系邮箱"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="perVisible = false">取 消</el-button>
                <el-button type="primary" @click="perDataFormTrue">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 企业客户修改 -->
        <el-dialog title=" 修改企业客户" :visible.sync="entriseVisible" width="52%">
            企业客户修改
            <el-form :model="priseDataForm" :rules="prisedatarules" ref="priseDataFormref" label-width="150px" :label-position="labelPosition">
                <el-form-item label="手机号码：" prop="mobile">
                    <el-input v-model="priseDataForm.mobile" placeholder="手机号码"></el-input>
                </el-form-item>
                <el-form-item label="客户编号：" prop="prisecustNum">
                    <el-input v-model="priseDataForm.prisecustNum" placeholder="客户编号"></el-input>
                </el-form-item>
                <el-form-item label="营业执照：" prop="bussicLice">
                    <el-upload class="avatar-uploader" :action="priseurl" accept="image/jpeg,image/jpg,image/png" :show-file-list="false" :on-success="perisehandleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="priseimageUrl" :src="priseimageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span>（上传后，以下部分信息可自动导入）</span>
                </el-form-item>
                <el-form-item label="公司名称：" prop="priseComName">
                    <el-input v-model="priseDataForm.priseComName" placeholder="公司名称"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号：" prop="businNum">
                    <el-input v-model="priseDataForm.businNum" placeholder="营业执照号"></el-input>
                </el-form-item>
                <el-form-item label="公司地址：" prop="priseaddress">
                    <el-input v-model="priseDataForm.priseaddress" placeholder="公司地址"></el-input>
                </el-form-item>
                <el-form-item label="法人姓名：" prop="priseName">
                    <el-input v-model="priseDataForm.priseName" placeholder="法人姓名"></el-input>
                </el-form-item>
                <el-form-item label="营业期限：" prop="prisetimelimit1">
                    <el-input v-model="priseDataForm.prisetimelimit1" placeholder="开始" style="width:35%"></el-input> 至
                    <el-input v-model="priseDataForm.prisetimelimit2" placeholder="结束" style="width:35%"></el-input>
                </el-form-item>
                <el-form-item label="经营范围：" prop="priseDesc">
                    <el-input type="textarea" v-model="priseDataForm.priseDesc" placeholder="经营范围"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="entriseVisible = false">取 消</el-button>
                <el-button type="primary" @click="priseDataSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
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
            var validateEmail = (rule, value, callback) => {
                if (!isEmail(value)) {
                    callback(new Error('邮箱格式错误'))
                } else {
                    callback()
                }
            }

            return {
                priseimageUrl: "",
                priseurl: "",
                perVisible: false,
                entriseVisible: false,
                labelPosition: 'right',
                perbackimageUrl: '',
                perfaceimageUrl: '',
                perDataForm: {
                    id: '',
                    creUserId: '',
                    mobile: '',
                    custNum: '',
                    custNanme: '',
                    perIdno: '',
                    peraddress: '',
                    pertimelimit: '',
                    peremail: '',
                },
                perdatarules: {
                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    custNum: [
                        { required: true, message: '请输入客户编号', trigger: 'blur' }
                    ],
                    // indoPic: [
                    //     { required: true, message: '请上传身份证照片', trigger: 'blur' }
                    // ],
                    custNanme: [
                        { required: true, message: '请输入客户姓名', trigger: 'blur' }
                    ],
                    perIdno: [
                        { required: true, message: '请输入身份证号码', trigger: 'blur' }
                    ],
                    peraddress: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    pertimelimit1: [
                        { required: true, message: '请输入证件期限', trigger: 'blur' }
                    ],
                    peremail: [
                        { required: true, message: '请输入联系邮箱', trigger: 'blur' },
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                },
                priseDataForm: {
                    id: '',
                    creUserId: '',
                    mobile: '',
                    prisecustNum: '',
                    priseComName: '',
                    businNum: '',
                    priseaddress: '',
                    priseName: '',
                    prisetimelimit: '',
                    priseDesc: '',
                    bussicLice: ''
                },
                prisedatarules: {
                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    prisecustNum: [
                        { required: true, message: '请输入客户编号', trigger: 'blur' }
                    ],
                    priseComName: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' }
                    ],
                    businNum: [
                        { required: true, message: '请输入营业执照号', trigger: 'blur' }
                    ],
                    priseaddress: [
                        { required: true, message: '请输入公司地址', trigger: 'blur' }
                    ],
                    priseName: [
                        { required: true, message: '请输入法人姓名', trigger: 'blur' }
                    ],
                    prisetimelimit1: [
                        { required: true, message: '请输入营业期限', trigger: 'blur' }
                    ],
                    priseDesc: [
                        { required: true, message: '请输入经营范围', trigger: 'blur' }
                    ],
                    // bussicLice: [
                    //     { required: true, message: '请上传营业执照', trigger: 'blur' }
                    // ]
                }
            }
        },
        methods: {
            updateInit(arr) {
                console.log(arr[0])  //id
                console.log(arr[1])  //个人 （0，null） 还是企业（1）
                console.log(arr[2])  //creUserId
                if (arr[1] == 0) {  //个人
                    this.perVisible = true
                    this.$nextTick(() => {
                        this.$refs['perDataForm'].resetFields()
                    })
                    this.perDataForm.id = arr[0]
                    this.perDataForm.creUserId = arr[2]
                    this.$http({
                        url: this.$http.adornUrl(`agent/cust/findPersonById?token=${this.$cookie.get('token')}&id=${this.perDataForm.id === null ? "" : this.perDataForm.id}&creUserId=${this.perDataForm.creUserId}`),
                        method: 'get',
                        params: this.$http.adornParams()
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            console.log(data)
                            this.perfaceimageUrl = data.idCardInfo.faceUrl
                            this.perbackimageUrl = data.idCardInfo.backUrl
                            this.perDataForm.mobile = data.mobile,
                                this.perDataForm.custNum = data.idCardInfo.creUserId
                            this.perDataForm.custNanme = data.idCardInfo.username
                            this.perDataForm.perIdno = data.idCardInfo.idno
                            this.perDataForm.peraddress = data.idCardInfo.address
                            this.perDataForm.pertimelimit1 = data.idCardInfo.effectdate
                            this.perDataForm.pertimelimit2 = data.idCardInfo.expiredate
                            this.perDataForm.peremail = data.mail
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                } else if (arr[1] == 1) { //企业
                    this.priseurl = this.$http.adornUrl(`agent/agentInfo/license/upload?token=${this.$cookie.get('token')}`)
                    this.entriseVisible = true
                    this.$nextTick(() => {
                        this.$refs['priseDataFormref'].resetFields()
                    })
                    this.priseDataForm.id = arr[0]
                    this.priseDataForm.creUserId = arr[2]
                    this.$http({
                        url: this.$http.adornUrl(`agent/cust/findCompanyById?token=${this.$cookie.get('token')}&id=${this.priseDataForm.id === null ? "" : this.priseDataForm.id}&creUserId=${this.priseDataForm.creUserId}`),
                        method: 'get',
                        params: this.$http.adornParams()
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            console.log(data)
                            this.priseDataForm.mobile = data.mobile
                            this.priseimageUrl = data.businessLicenceInfo.pictureUrl
                            this.priseDataForm.prisecustNum = data.businessLicenceInfo.creUserId
                            this.priseDataForm.priseComName = data.businessLicenceInfo.name
                            this.priseDataForm.businNum = data.businessLicenceInfo.regnum
                            this.priseDataForm.priseaddress = data.businessLicenceInfo.address
                            this.priseDataForm.priseName = data.businessLicenceInfo.person
                            this.priseDataForm.prisetimelimit1 = data.businessLicenceInfo.effectdate
                            this.priseDataForm.prisetimelimit2 = data.businessLicenceInfo.expiredate
                            this.priseDataForm.priseDesc = data.businessLicenceInfo.business
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                }
            },
            // 提价个人修改
            perDataFormTrue() {
                this.$refs['perDataForm'].validate((valid) => {
                    if (valid) {
                        console.log('表单验证通过')
                        this.$http({
                            url: this.$http.adornUrl(`agent/cust/updatePerson?token=${this.$cookie.get('token')}`),
                            method: 'post',
                            params: this.$http.adornParams({
                                'id': this.perDataForm.id,
                                'creUserId': this.perDataForm.creUserId,
                                'username': this.perDataForm.custNanme,
                                'address': this.perDataForm.peraddress,
                                'idno': this.perDataForm.perIdno,
                                'effectdate': this.perDataForm.pertimelimit1,
                                'expiredate': this.perDataForm.pertimelimit2,
                                'faceUrl': this.perfaceimageUrl,
                                'backUrl': this.perbackimageUrl,
                                'email': this.perDataForm.peremail
                            })
                        }).then(({ data }) => {
                            console.log(data)
                            if (data && data.code === 0) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success',
                                    duration: 1500,
                                    onClose: () => {
                                        this.perVisible = false
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
            // 上传成功
            // otherhandleAvatarSuccess(res, file) {
            //     this.imageUrl = URL.createObjectURL(file.raw);
            // },
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
            // 企业操作
            priseDataSubmit() {
                this.$refs['priseDataFormref'].validate((valid) => {
                    if (valid) {
                        console.log('表单验证通过')
                        this.$http({
                            url: this.$http.adornUrl(`agent/cust/updateCompany?token=${this.$cookie.get('token')}`),
                            method: 'post',
                            params: this.$http.adornParams({
                                'id': this.priseDataForm.id,
                                'creUserId': this.priseDataForm.creUserId,
                                'name': this.priseDataForm.priseComName,
                                'regnum': this.priseDataForm.businNum,
                                'person': this.priseDataForm.priseName,
                                'effectdate': this.priseDataForm.prisetimelimit1,
                                'expiredate': this.priseDataForm.prisetimelimit2,
                                'address': this.priseDataForm.priseaddress,
                                'business': this.priseDataForm.priseDesc,
                                'pictureUrl': this.priseimageUrl
                            })
                        }).then(({ data }) => {
                            console.log(data)
                            if (data && data.code === 0) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success',
                                    duration: 1500,
                                    onClose: () => {
                                        this.entriseVisible = false
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
            perisehandleAvatarSuccess(res, file) {
                console.log(URL.createObjectURL(file.raw))
                this.priseimageUrl = URL.createObjectURL(file.raw);
            }
        }
    }

</script>
<style>
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
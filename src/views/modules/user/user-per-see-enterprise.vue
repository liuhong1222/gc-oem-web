<template>
    <div class="seecuslog">
        <!-- 查看个人信息 -->
        <el-dialog title="查看个人客户" :visible.sync="perseeVisible" width="48%">

            <el-form :model="perseeDataForm" ref="perDataForm" label-width="150px" :label-position="labelPosition">
                <el-form-item label="手机号码：">
                    <el-input v-model="perseeDataForm.mobile" placeholder="手机号码" readonly></el-input>
                </el-form-item>
                <!-- <el-form-item label="客户编号">
                    <el-input v-model="perseeDataForm.custNum" placeholder="客户编号" readonly></el-input>
                </el-form-item> -->
                <el-form-item label="身份证照片">
                    <el-upload class="avatar-uploader" action="" :show-file-list="false" style="display:inline-block" disabled>
                        <img v-if="imageUrlFace" :src="imageUrlFace" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:14px">正面</i>
                    </el-upload>
                    <el-upload class="avatar-uploader" action="" :show-file-list="false" style="display:inline-block" disabled>
                        <img v-if="imageUrlback" :src="imageUrlback" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:14px">反面</i>
                    </el-upload>

                </el-form-item>
                <el-form-item label="客户姓名">
                    <el-input v-model="perseeDataForm.custNanme" placeholder="客户姓名" readonly></el-input>
                </el-form-item>
                <el-form-item label="身份证号码">
                    <el-input v-model="perseeDataForm.perIdno" placeholder="身份证号码" readonly></el-input>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="perseeDataForm.peraddress" placeholder="详细地址" readonly></el-input>
                </el-form-item>
                <el-form-item label="证件期限">
                    <el-input v-model="perseeDataForm.pertimelimit1" placeholder="开始" style="width:35%" readonly></el-input> 至
                    <el-input v-model="perseeDataForm.pertimelimit2" placeholder="结束" style="width:35%" readonly></el-input>
                </el-form-item>
                <el-form-item label="联系邮箱">
                    <el-input v-model="perseeDataForm.peremail" placeholder="联系邮箱" readonly></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="perseeVisible = false">取 消</el-button>
                <el-button type="primary"  @click="perseeVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 查看企业信息 -->
        <el-dialog title=" 查看企业客户" :visible.sync="entriseVisible" width="52%">

            <el-form :model="seepriseDataForm" ref="seepriseDataFormref" label-width="150px" :label-position="labelPosition">
                <el-form-item label="手机号码：">
                    <el-input v-model="seepriseDataForm.mobile" placeholder="手机号码"></el-input>
                </el-form-item>
                <!-- <el-form-item label="客户编号：">
                    <el-input v-model="seepriseDataForm.prisecustNum" placeholder="客户编号"></el-input>
                </el-form-item> -->
                <el-form-item label="营业执照：">
                    <el-upload class="avatar-uploader" action="" :show-file-list="false" readonly>
                        <img v-if="priseimageUrl" :src="priseimageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="公司名称：">
                    <el-input v-model="seepriseDataForm.priseComName" placeholder="公司名称"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号：">
                    <el-input v-model="seepriseDataForm.businNum" placeholder="营业执照号"></el-input>
                </el-form-item>
                <el-form-item label="公司地址：">
                    <el-input v-model="seepriseDataForm.priseaddress" placeholder="公司地址"></el-input>
                </el-form-item>
                <el-form-item label="法人姓名：">
                    <el-input v-model="seepriseDataForm.priseName" placeholder="法人姓名"></el-input>
                </el-form-item>
                <el-form-item label="营业期限：">
                    <el-input v-model="seepriseDataForm.prisetimelimit1" placeholder="开始" style="width:35%"></el-input> 至
                    <el-input v-model="seepriseDataForm.prisetimelimit2" placeholder="结束" style="width:35%"></el-input>
                </el-form-item>
                <el-form-item label="经营范围：">
                    <el-input type="textarea" v-model="seepriseDataForm.priseDesc" placeholder="经营范围" readonly></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="entriseVisible = false">取 消</el-button>
                    <el-button type="primary" @click="entriseVisible = false">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>
<script>
    import imgUrl from '@/utils/imgUrl'
    export default {
        data() {
            return {
                perseeVisible: false,
                entriseVisible: false,
                imageUrlFace: '',
                imageUrlback: '',
                priseimageUrl: '',
                perseeDataForm: {  //个人
                    id: '',
                    creUserId: '',
                    mobile: '',
                    // custNum: '',
                    custNanme: '',
                    perIdno: '',
                    peraddress: '',
                    pertimelimit: '',
                    peremail: '',
                },
                seepriseDataForm: {//企业
                    id: '',
                    creUserId: '',
                    mobile: '',
                    // prisecustNum: '',
                    priseComName: '',
                    businNum: '',
                    priseaddress: '',
                    priseName: '',
                    prisetimelimit: '',
                    priseDesc: '',
                    bussicLice: ''
                },
                labelPosition: 'right',
            }
        },
        methods: {
            seeInit(arr) {
                // console.log(arr[0])  //id
                // console.log(arr[1])  //个人 （0，null） 还是企业（1）
                // console.log(arr[2])  //creUserId
                if (arr[1] == 0 || arr[1] == null) {  //个人
                    this.perseeVisible = true
                    this.perseeDataForm.id = arr[0]
                    this.perseeDataForm.creUserId = arr[2]
                    this.$http({
                        url: this.$http.adornUrl(`agent/cust/findPersonById?token=${this.$cookie.get('token')}&id=${this.perseeDataForm.id === null ? "" : this.perseeDataForm.id}&creUserId=${this.perseeDataForm.creUserId}`),
                        method: 'get',
                        params: this.$http.adornParams()
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            // console.log(data)
                            this.perseeDataForm.mobile = data.mobile
                            this.perseeDataForm.peremail = data.mail
                            this.imageUrlFace = imgUrl.imgUrl + data.idCardInfo.faceUrl
                            this.imageUrlback = imgUrl.imgUrl + data.idCardInfo.backUrl
                            // this.perseeDataForm.custNum = data.idCardInfo.creUserId
                            this.perseeDataForm.custNanme = data.idCardInfo.username
                            this.perseeDataForm.perIdno = data.idCardInfo.idno
                            this.perseeDataForm.peraddress = data.idCardInfo.address
                            this.perseeDataForm.pertimelimit1 = data.idCardInfo.effectdate
                            this.perseeDataForm.pertimelimit2 = data.idCardInfo.expiredate

                        } else {
                            this.$message.error(data.msg)
                        }
                    })

                } else if (arr[1] == 1) { //企业
                    this.entriseVisible = true
                    this.seepriseDataForm.id = arr[0]
                    this.seepriseDataForm.creUserId = arr[2]
                    this.$http({
                        url: this.$http.adornUrl(`agent/cust/findCompanyById?token=${this.$cookie.get('token')}&id=${this.seepriseDataForm.id}&creUserId=${this.seepriseDataForm.creUserId}`),
                        method: 'get',
                        params: this.$http.adornParams()
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            // console.log(data)
                            this.seepriseDataForm.mobile = data.mobile
                            this.priseimageUrl = imgUrl.imgUrl + data.businessLicenceInfo.pictureUrl
                            // this.seepriseDataForm.prisecustNum = data.businessLicenceInfo.creUserId
                            this.seepriseDataForm.priseComName = data.businessLicenceInfo.name
                            this.seepriseDataForm.businNum = data.businessLicenceInfo.regnum
                            this.seepriseDataForm.priseaddress = data.businessLicenceInfo.address
                            this.seepriseDataForm.priseName = data.businessLicenceInfo.person
                            this.seepriseDataForm.prisetimelimit1 = data.businessLicenceInfo.effectdate
                            this.seepriseDataForm.prisetimelimit2 = data.businessLicenceInfo.expiredate
                            this.seepriseDataForm.priseDesc = data.businessLicenceInfo.business
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                }

            }
        }
    }

</script>
<style>
    .seecuslog .el-input__inner,
    .seecuslog .el-textarea__inner {
        border: none;
    }
</style>
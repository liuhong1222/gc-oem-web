<template>
    <div class="mainAess">
        <el-dialog title="查看" :visible.sync="dialogVisible" width="50%" @close="closeDialog">
            <el-collapse v-model="activeNames" @change="handleChange" accordion>
                <el-collapse-item title="基本信息 ✚" name="1">
                    <el-form :model="basicdataForm" ref="basicdataForm" label-width="150px" class="demo-ruleForm"
                        :label-position="labelPosition">
                        <!-- <el-form-item label="代理商序号：">
                            <el-input v-model="basicdataForm.agentNumber" placeholder="代理商序号" readonly></el-input>
                        </el-form-item> -->
                        <el-form-item label="商户编号：">
                            <el-input v-model="basicdataForm.businNumber" placeholder="商户编号" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="代理商名称：">
                            <el-input v-model="basicdataForm.agentName" placeholder="代理商名称" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="logo：" id="logoseeImg">
                            <el-upload class="avatar-uploader" action="" :show-file-list="false" disabled>
                                <img v-if="logoImageUrl" :src="logoImageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="icon：" id="iconseeImg">
                            <el-upload class="avatar-uploader" action="" :show-file-list="false" disabled>
                                <img v-if="iconImageUrl" :src="iconImageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="代表签字：" id="picImgSizeDemo">
                            <el-upload class="avatar-uploader" action="" :show-file-list="false" disabled>
                                <img v-if="dqImageUrl" :src="dqImageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="公司红章：" id="picImgSizeDemo1">
                            <el-upload class="avatar-uploader" action="" :show-file-list="false" disabled>
                                <img v-if="gzImageUrl" :src="gzImageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="短信签名：">
                            <el-input v-model="basicdataForm.dxName" placeholder="短信签名" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="代理商域名：">
                            <el-input v-model="basicdataForm.domaintName" placeholder="代理商域名" readonly></el-input>
                        </el-form-item>
                    </el-form>

                </el-collapse-item>
                <el-collapse-item title="客服资料 ✚" name="2">
                    <el-form label-width="110px" :model="customerDataForm" ref="customerdataList" class="demo-ruleForm">
                        <el-form-item label="客服热线：">
                            <el-input v-model="customerDataForm.kfLine" placeholder="客服热线" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="客服qq：">
                            <el-input v-model="customerDataForm.keyqq" placeholder="客服qq" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="美洽ID：">
                            <el-input v-model="customerDataForm.beautyID" placeholder="美洽ID" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="商务合作号：">
                            <el-input v-model="customerDataForm.businNO" placeholder="商务合作号" readonly></el-input>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item title="域名备案信息 ✚" name="3">
                    <el-form label-width="180px" :model="domainDataForm" ref="domaindataList" class="demo-ruleForm">
                        <el-form-item label="版权信息：">
                            <el-input v-model="domainDataForm.copyinfo" placeholder="版权信息" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="公司地址：">
                            <el-input v-model="domainDataForm.compAdress" placeholder="公司地址" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式：">
                            <el-input v-model="domainDataForm.custHotline" placeholder="联系方式" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="增值电信业务经营许可证：">
                            <el-input v-model="domainDataForm.telservice" placeholder="增值电信业务经营许可证" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="ICP备案：">
                            <el-input v-model="domainDataForm.icpInfo" placeholder="请输入ICP备案，例：沪ICP备案：15046301号-2
                            " readonly></el-input>
                        </el-form-item>
                        <el-form-item label="公安备案：">
                            <el-input v-model="domainDataForm.secrecord" placeholder="请输入公安备案，例：沪公网安备案 31011702001190号" readonly></el-input>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item title=" 支付宝资料 ✚" name="4">
                    <el-form :model="alipaydataForm" ref="alipaydataFormref" label-width="110px" class="demo-ruleForm">
                        <el-form-item label="appid">
                            <el-input v-model="alipaydataForm.aliappid" placeholder="appid" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="支付宝调用地址">
                            <el-input v-model="alipaydataForm.alicallUrl" placeholder="支付宝调用地址" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="支付回调地址">
                            <el-input v-model="alipaydataForm.alicallbackUrl" placeholder="支付回调地址" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="公钥">
                            <el-input type="textarea" v-model="alipaydataForm.alipublicKey" placeholder="公钥" :rows="5"
                                readonly></el-input>
                        </el-form-item>
                        <el-form-item label="私钥">
                            <el-input type="textarea" v-model="alipaydataForm.aliprivateKey" placeholder="私钥" :rows="5"
                                readonly></el-input>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item title="合同资料 ✚" name="5">
                    <el-form :model="contractdataForm" ref="contractdataFormref" label-width="110px" class="demo-ruleForm">
                        <el-form-item label="公司名称">
                            <el-input v-model="contractdataForm.comName" placeholder="公司名称" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="公司地址">
                            <el-input v-model="contractdataForm.comAdress" placeholder="公司地址" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="账号">
                            <el-input v-model="contractdataForm.comAccount" placeholder="账号" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="开户行">
                            <el-input v-model="contractdataForm.openBank" placeholder="开户行" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="邮编">
                            <el-input v-model="contractdataForm.zipcode" placeholder="邮编" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="电话">
                            <el-input v-model="contractdataForm.phone" placeholder="电话" readonly></el-input>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>

                <el-collapse-item title="微信收款资料 ✚" name="6">
                    <el-form :model="wxdataForm" ref="wxdataFormref" label-width="110px" class="demo-ruleForm">
                        <el-form-item label="微信调用地址">
                            <el-input v-model="wxdataForm.wxcallUrl" placeholder="微信调用地址" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="微信回调地址">
                            <el-input v-model="wxdataForm.wxcallbackUrl" placeholder="微信回调地址" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="appid">
                            <el-input v-model="wxdataForm.wxappid" placeholder="appid" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="mchid">
                            <el-input v-model="wxdataForm.wxmchid" placeholder="mchid" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="key">
                            <el-input v-model="wxdataForm.wxkey" placeholder="key" readonly></el-input>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item title="微信登录资料 ✚" name="7">
                    <el-form :model="wxLoginForm" ref="wxLoginFormref" label-width="110px" class="demo-ruleForm">
                        <el-form-item label="APPID">
                            <el-input v-model="wxLoginForm.wxLoginAPPID" placeholder="APPID" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="APPSECRET">
                            <el-input v-model="wxLoginForm.APPSECRETLogin" placeholder="APPSECRET" readonly></el-input>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </el-dialog>
    </div>
</template>

<script>
    import imgUrl from '@/utils/imgUrl'
    export default {
        data() {
            return {
                agentId: "",
                activeNames: ['1'],
                dialogVisible: false,
                labelPosition: 'right',
                logoImageUrl: '',
                iconImageUrl: '',
                dqImageUrl: '',
                gzImageUrl: '',
                basicdataForm: { //基本信息
                    // agentNumber: '',
                    businNumber: '',
                    agentName: '',
                    dxName: '',
                    domaintName: '',

                },
                domainDataForm: { //域名备案信息
                    copyinfo: '',
                    compAdress: '',
                    custHotline: '',
                    telservice: '',
                    icpInfo: '',
                    secrecord: '',
                    id: ''  //后端返回的id
                },
                customerDataForm: {  //客服资料信息
                    kfLine: '',
                    keyqq: '',
                    businNO: '',
                    beautyID: ''
                },
                contractdataForm: {  //合同信息
                    comName: '',
                    comAdress: '',
                    comAccount: '',
                    openBank: '',
                    zipcode: '',
                    phone: '',
                },
                alipaydataForm: { //支付宝信息
                    aliappid: '',
                    alicallUrl: '',
                    alicallbackUrl: '',
                    alipublicKey: '',
                    aliprivateKey: ''
                },
                wxdataForm: {
                    wxkey: '',
                    wxappid: '',
                    wxmchid: '',
                    wxcallbackUrl: '',
                    wxcallUrl: ''
                },
                wxLoginForm: {
                    wxLoginAPPID: '',
                    APPSECRETLogin: ''
                }
            }
        },
        methods: {
            seeInit({ agentId }) {
                // console.log('查看弹出层')
                this.dialogVisible = true
                this.agentId = agentId;

                this.logoImageUrl = ""
                this.iconImageUrl = ""
                this.dqImageUrl = ""
                this.gzImageUrl = ""
                // 获取基本信息
                this.$http({
                    url: this.$http.adornUrl(`agent/set/findBasicInfo?token=${this.$cookie.get('token')}&agentId=${this.agentId}`),
                    method: 'post',
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        // this.basicdataForm.agentNumber = data.data[0].agentId
                        this.basicdataForm.businNumber = data.data[0].agent_no
                        this.basicdataForm.agentName = data.data[0].company_name
                        this.basicdataForm.dxName = data.data[0].sms_sign
                        this.basicdataForm.domaintName = data.data[0].name
                        this.logoImageUrl = imgUrl.imgUrl + data.data[0].logo_url
                        this.iconImageUrl = imgUrl.imgUrl + data.data[0].icon_url
                        this.dqImageUrl = imgUrl.imgUrl + data.data[0].sign_url
                        this.gzImageUrl = imgUrl.imgUrl + data.data[0].seal_url
                    }
                })
            },
            handleChange(val) {
                if (val == 2) {  //客服
                    this.customerDataForm.kfLine = ""
                    this.customerDataForm.keyqq = ""
                    this.customerDataForm.beautyID = ""
                    this.customerDataForm.businNO = ""
                    this.$http({
                        url: this.$http.adornUrl(`agent/set/findCustService?token=${this.$cookie.get('token')}&agentId=${this.agentId}`),
                        method: 'post',
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            // console.log(data)
                            if (data.data !== null) {
                                this.customerDataForm.kfLine = data.data.hotline
                                this.customerDataForm.keyqq = data.data.qq
                                this.customerDataForm.beautyID = data.data.meiqiaEntid
                                this.customerDataForm.businNO = data.data.bizNo
                            }
                        }
                    })
                } else if (val == 3) {  //域名
                    this.domainDataForm.copyinfo = ""
                    this.domainDataForm.compAdress = ""
                    this.domainDataForm.telservice = ""
                    this.domainDataForm.icpInfo = ""
                    this.domainDataForm.secrecord = ""
                    this.domainDataForm.custHotline = ""
                    this.domainDataForm.id = ""

                    this.$http({
                        url: this.$http.adornUrl(`agent/set/findDomainInfo?token=${this.$cookie.get('token')}&agentId=${this.agentId}`),
                        method: 'post',
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            if (data.data !== null) {
                                this.domainDataForm.copyinfo = data.data.copyright
                                this.domainDataForm.compAdress = data.data.address
                                this.domainDataForm.telservice = data.data.licence
                                this.domainDataForm.icpInfo = data.data.icpRecord
                                this.domainDataForm.secrecord = data.data.policeRecord
                                this.domainDataForm.custHotline = data.data.contactInfo
                                this.domainDataForm.id = data.data.id
                            }
                        }
                    })
                } else if (val == 4) { //支付宝资料

                    this.alipaydataForm.aliappid = ""
                    this.alipaydataForm.alicallUrl = ""
                    this.alipaydataForm.alicallbackUrl = ""
                    this.alipaydataForm.alipublicKey = ""
                    this.alipaydataForm.aliprivateKey = ""
                    this.$http({
                        url: this.$http.adornUrl(`agent/set/findAlipay?token=${this.$cookie.get('token')}&agentId=${this.agentId}`),
                        method: 'post',
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            // console.log(data)
                            if (data.data !== null) {
                                this.alipaydataForm.aliappid = data.data.appid
                                this.alipaydataForm.alicallUrl = data.data.callUrl
                                this.alipaydataForm.alicallbackUrl = data.data.callbackUrl
                                this.alipaydataForm.alipublicKey = data.data.publicKey
                                this.alipaydataForm.aliprivateKey = data.data.privateKey
                            }
                        }
                    })
                } else if (val == 5) {  //合同

                    this.contractdataForm.comName = ""
                    this.contractdataForm.comAdress = ""
                    this.contractdataForm.comAccount = ""
                    this.contractdataForm.openBank = ""
                    this.contractdataForm.zipcode = ""
                    this.contractdataForm.phone = ""
                    this.$http({
                        url: this.$http.adornUrl(`agent/set/findContract?token=${this.$cookie.get('token')}&agentId=${this.agentId}`),
                        method: 'post',
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            // console.log(data)
                            if (data.data !== null) {
                                this.contractdataForm.comName = data.data.companyName
                                this.contractdataForm.comAdress = data.data.companyAddress
                                this.contractdataForm.comAccount = data.data.accountNo
                                this.contractdataForm.openBank = data.data.bankName
                                this.contractdataForm.zipcode = data.data.postcode
                                this.contractdataForm.phone = data.data.mobile
                            }
                        }
                    })
                }
                else if (val == 6) {
                    this.wxdataForm.wxkey = ""
                    this.wxdataForm.wxappid = ""
                    this.wxdataForm.wxmchid = ""
                    this.wxdataForm.wxcallbackUrl = ""
                    this.wxdataForm.wxcallUrl = ""
                    this.$http({
                        url: this.$http.adornUrl(`agent/set/findWeixinpay?token=${this.$cookie.get('token')}&agentId=${this.agentId}`),
                        method: 'post',
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            if (data.data !== null) {
                                this.wxdataForm.wxkey = data.data.wxkey
                                this.wxdataForm.wxappid = data.data.appid
                                this.wxdataForm.wxmchid = data.data.mchid
                                this.wxdataForm.wxcallbackUrl = data.data.callbackUrl
                                this.wxdataForm.wxcallUrl = data.data.callUrl
                            }
                        }
                    })
                } else if (val == 7) {
                    // alert('微信登录信息')
                    this.wxLoginForm.wxLoginAPPID = ""
                    this.wxLoginForm.APPSECRETLogin = ""
                    this.$http({
                        url: this.$http.adornUrl(`agent/set/findWxLogin?token=${this.$cookie.get('token')}&agentId=${this.agentId}`),
                        method: 'post',
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            if (data.data !== null) {
                                this.wxLoginForm.wxLoginAPPID = data.data.appid
                                this.wxLoginForm.APPSECRETLogin = data.data.appSecret
                            }
                        }
                    })
                }
            },
            closeDialog() {
                this.activeNames = []
                this.activeNames.push('1')  //获取第一步  关闭之前
            }
        }
    }

</script>

<style lang="scss">
    #logoseeImg .el-upload,
    #logoseeImg .el-upload .avatar {
        width: 150px;
        height: 50px;
    }

    #iconseeImg .el-upload,
    #iconseeImg .el-upload .avatar {
        width: 40px;
        height: 40px;
    }

    .mainAess .el-input__inner {
        border: none
    }

    #picImgSizeDemo .el-upload,
    #picImgSizeDemo1 .el-upload {
        width: 180px;
        height: 150px;
    }

    #picImgSizeDemo .el-upload img,
    #picImgSizeDemo1 .el-upload img {
        width: 100%;
        height: 100%
    }
</style>
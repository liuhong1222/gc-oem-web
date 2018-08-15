<template>
    <div id="seeAgent">
        <el-dialog title="查看" :visible.sync="dialogVisible" width="52%">
            <el-form :model="dataForm" ref="dataForm" label-width="150px" class="demo-ruleForm" :label-position="labelPosition">
                <!-- <h3>基本信息</h3> -->
                <el-form-item label="代理商编号：" prop="agentNumber">
                    <el-input v-model="dataForm.agentNumber" placeholder="代理商编号" readonly></el-input>
                </el-form-item>
                <el-form-item label="营业执照：" prop="agentNumber">
                    <el-upload class="avatar-uploader" action="" :show-file-list="false" disabled>
                        <img v-if="seeImageUrl" :src="seeImageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="商户编号：" prop="businNumber">
                    <el-input v-model="dataForm.businNumber" placeholder="商户编号" readonly></el-input>
                </el-form-item>
                <el-form-item label="公司名称：" prop="companyName">
                    <el-input v-model="dataForm.companyName" placeholder="公司名称" readonly></el-input>
                </el-form-item>
                <el-form-item label="营业执照所在地：" prop="bussicAdress">
                    <el-input v-model="dataForm.bussicAdress" placeholder="营业执照所在地" readonly></el-input>
                </el-form-item>
                <el-form-item label="法人姓名：" prop="lawName">
                    <el-input v-model="dataForm.lawName" placeholder="法人姓名" readonly></el-input>
                </el-form-item>
                <el-form-item label="营业执照号：" prop="businNum">
                    <el-input v-model="dataForm.businNum" placeholder="营业执照号" readonly></el-input>
                </el-form-item>
                <el-form-item label="营业期限：" prop="busindate">
                    <el-input v-model="dataForm.busindate1" placeholder="营业执照号" style="width:35%;" readonly></el-input>至
                    <el-input v-model="dataForm.busindate2" placeholder="营业执照号" style="width:35%;" readonly></el-input>
                </el-form-item>
                <!-- <h3>联系人信息</h3> -->
                <el-form-item label="联系人姓名：" prop="username">
                    <el-input v-model="dataForm.username" placeholder="联系人姓名" readonly></el-input>
                </el-form-item>
                <el-form-item label="联系人手机号：" prop="mobile">
                    <el-input v-model="dataForm.mobile" placeholder="联系人手机号" readonly></el-input>
                </el-form-item>
                <el-form-item label="联系人邮箱：" prop="email">
                    <el-input v-model="dataForm.email" placeholder="联系人邮箱" readonly></el-input>
                </el-form-item>
                <el-form-item label="职务：" prop="work">
                    <el-input v-model="dataForm.work" placeholder="职务" readonly></el-input>
                </el-form-item>
                <!-- <h3>账号信息</h3> -->
                <el-form-item label="登录账号：" prop="loginAcc">
                    <el-input v-model="dataForm.loginAcc" placeholder="登录账号" readonly></el-input>
                </el-form-item>
                <!-- <el-form-item label="初始密码：" prop="pwd">
                    <el-input v-model="dataForm.pwd" placeholder="初始密码" readonly></el-input>
                </el-form-item> -->
                <!-- <h3>代理商级别</h3> -->
                <el-form-item label="代理级别：" prop="agencylevel">
                    <el-input v-model="dataForm.agencylevel" placeholder="代理级别" readonly></el-input>
                    <!-- <el-select v-model="dataForm.agencylevel" placeholder="请选择代理级别">
                        <el-option label="一级" value="1"></el-option>
                        <el-option label="二级" value="2"></el-option>
                    </el-select> -->
                </el-form-item>
                <el-form-item label="单价：" prop="price">
                    <el-input v-model="dataForm.price" placeholder="单价" readonly></el-input>
                </el-form-item>
                <el-form-item label="允许超出条数：" prop="allowCounts">
                    <el-input v-model="dataForm.allowCounts" placeholder="允许超出条数" readonly></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {

            return {
                dialogVisible: false,
                labelPosition: 'right',
                seeImageUrl:'',
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
            }
        },
        methods: {
            showInit(id) {
                this.dialogVisible = true;
                this.dataForm.id = id
                this.$http({
                    url: this.$http.adornUrl(`agent/agentInfo/detail?token=${this.$cookie.get('token')}&agentId=${this.dataForm.id}`),
                    method: 'get',
                    params: this.$http.adornParams()
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.seeImageUrl=data.data.licenseUrl
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
        }
    }

</script>
<style>
    #seeAgent .el-input__inner {
        border: none !important;
    }
</style>
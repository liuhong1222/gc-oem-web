<template>
    <!-- :before-close="handleClose" -->
    <el-dialog title="入账申请" :visible.sync="dialogVisible" width="45%">
        <el-form :model="applicateDataForm" :rules="applicateDataRules" ref="applicateDataFormRef" label-width="120px"
            :label-position="labelPosition">
            <el-form-item label="手机号码：">
                <el-input v-model="applicateDataForm.mobile" placeholder="手机号码" id="mobile" readonly></el-input>
            </el-form-item>
            <el-form-item label="充值产品：">
                <el-input v-model="applicateDataForm.proReg" placeholder="空号在线检测" id="proReg" readonly></el-input>
            </el-form-item>
            <el-form-item label="充值金额：" prop="regMoney">
                <el-input v-model="applicateDataForm.regMoney" placeholder="请输入充值金额……" @keyup.native="proving1"></el-input>
                <span>元</span>
            </el-form-item>
            <el-form-item label="产品单价：" prop="proPrice">
                <el-input v-model="applicateDataForm.proPrice" placeholder="请输入充值单价……"></el-input>
                <span>元/条</span>
            </el-form-item>
            <el-form-item label="产品条数：" prop="proNumber">
                <el-input v-model="applicateDataForm.proNumber" placeholder="根据充值金额和单价自动计算" readonly></el-input>
                <span>条</span>
            </el-form-item>
            <el-form-item label="赠送条数：">
                <el-input v-model="applicateDataForm.GiveNumber" placeholder="请输入赠送条数……"></el-input>
                <span>条</span>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input type="textarea" v-model="applicateDataForm.desc" placeholder="请输入财务备注信息……"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="applicateDataFormTrue" :disabled="disabled">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                labelPosition: 'right',
                disabled: false,
                applicateDataForm: {
                    creUserId: '',
                    mobile: '',
                    proReg: '空号在线检测',
                    regMoney: '',
                    proPrice: '',
                    proNumber: '',
                    GiveNumber: '',
                    desc: ''
                },
                applicateDataRules: {
                    regMoney: [
                        { required: true, message: '请输入充值金额', trigger: 'blur' },
                    ],
                    proPrice: [
                        { required: true, message: '请输入充值单价', trigger: 'blur' }
                    ],
                    // proNumber: [
                    //     { required: true, message: '充值条数', trigger: 'blur' }
                    // ]
                },
            }
        },
        watch: {
            'applicateDataForm.regMoney'() {
                if (this.applicateDataForm.regMoney !== "" && this.applicateDataForm.proPrice !== "") {
                    this.applicateDataForm.proNumber = Math.ceil((Number(this.applicateDataForm.regMoney) / (this.applicateDataForm.proPrice)))
                } else {
                    this.applicateDataForm.proNumber = ""
                }
            },
            'applicateDataForm.proPrice'() {
                if (this.applicateDataForm.proPrice !== "" && this.applicateDataForm.regMoney !== "") {
                    this.applicateDataForm.proNumber = Math.ceil((Number(this.applicateDataForm.regMoney) / (this.applicateDataForm.proPrice)))
                } else {
                    this.applicateDataForm.proNumber = ""
                }
            }
        },
        methods: {
            entryApplicateInit(arr) {
                this.applicateDataForm.creUserId = arr.creUserId
                this.dialogVisible = true;
                this.applicateDataForm.mobile = arr.user_phone;
                this.applicateDataForm.GiveNumber = "";
                this.applicateDataForm.desc = "";
                this.$nextTick(() => {
                    this.$refs['applicateDataFormRef'].resetFields()
                })
            },
            applicateDataFormTrue() {
                this.$refs['applicateDataFormRef'].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认要入账申请吗？')
                            .then(_ => {
                                this.applicateSubmit()
                            })
                            .catch(_ => { })
                    }
                })
            },
            applicateSubmit() {
                this.$http({
                    url: this.$http.adornUrl(`agent/cust/recharge?token=${this.$cookie.get('token')}`),
                    method: 'post',
                    params: this.$http.adornParams({
                        'agentPackageId': "4",
                        'creUserId': this.applicateDataForm.creUserId,
                        'number': this.applicateDataForm.proNumber,
                        'amount': this.applicateDataForm.regMoney,
                        'payType': '6',
                        'freeNumber': this.applicateDataForm.GiveNumber,
                        'remark': this.applicateDataForm.desc   
                    })
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.disabled = true
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.dialogVisible = false
                                this.disabled = false
                                this.applicateDataForm.desc = "";
                                this.applicateDataForm.GiveNumber = "";
                            }
                        })
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            },
            proving1() {
                this.applicateDataForm.regMoney = (this.applicateDataForm.regMoney).toString().replace(/[^\.\d]/g, '');
                this.applicateDataForm.regMoney = (this.applicateDataForm.regMoney).toString().replace('.', '');
            }
        }
    }

</script>

<style>
    #proReg,
    #mobile {
        border: none
    }
</style>
<template>
    <div class="finnceAudit">
        <el-dialog title="入账审核" :visible.sync="dialogVisible" width="45%">
            <el-form :model="applicateDataForm" ref="applicateDataFormRef" :rules="applicateDataFRules" label-width="120px"
                :label-position="labelPosition">
                <el-form-item label="手机号码：">
                    <el-input v-model="applicateDataForm.mobile" placeholder="手机号码" readonly></el-input>
                </el-form-item>
                <el-form-item label="充值产品：">
                    <el-input v-model="applicateDataForm.proReg" placeholder="空号在线检测" readonly></el-input>
                </el-form-item>
                <el-form-item label="充值金额：" prop="regMoney">
                    <el-input v-model="applicateDataForm.regMoney" placeholder="充值金额" readonly></el-input>
                    <span>元</span>
                </el-form-item>
                <el-form-item label="产品单价：" prop="proPrice">
                    <el-input v-model="applicateDataForm.proPrice" placeholder="充值单价" readonly></el-input>
                    <span>元/条</span>
                </el-form-item>
                <el-form-item label="产品条数：" prop="proNumber">
                    <el-input v-model="applicateDataForm.proNumber" placeholder="根据充值金额和单价自动计算" readonly></el-input>
                    <span>条</span>
                </el-form-item>
                <el-form-item label="赠送条数：">
                    <el-input v-model="applicateDataForm.GiveNumber" placeholder="赠送条数" readonly></el-input>
                    <span>条</span>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input type="textarea" v-model="applicateDataForm.desc" placeholder="财务备注信息" readonly></el-input>
                </el-form-item>
                <el-form-item label="审核结果：" prop="resource">
                    <el-radio-group v-model="applicateDataForm.resource">
                        <el-radio :label="1">通过</el-radio>
                        <el-radio :label="0">驳回</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- <el-form-item label="驳回原因：" prop="bohuidesc" v-if="auditDisable">
                    <el-input type="textarea" v-model="applicateDataForm.bohuidesc"></el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="disabled" @click="applicateDataSubmit()">确 定</el-button>
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
                disabled: false,
                auditDisable: false,
                applicateDataForm: {
                    creUserId: '',
                    mobile: '',
                    proReg: '空号在线检测',
                    regMoney: '',
                    proPrice: '',
                    proNumber: '',
                    GiveNumber: '',
                    desc: '',
                    // bohuidesc: '',
                    resource: '',
                },
                applicateDataFRules: {
                    resource: [
                        { required: true, message: '请选中审核', trigger: 'blur' }
                    ],
                    // bohuidesc: [
                    //     { required: true, message: '请输入驳回原因', trigger: 'blur' }
                    // ],
                }
            }
        },
        methods: {
            auditAccountInit(arr) {
                this.applicateDataForm.orderId = arr.orderId
                this.dialogVisible = true;
                this.applicateDataForm.resource = ""
                this.auditDisable = false;
                // this.applicateDataForm.bohuidesc = ""
                this.$nextTick(() => {
                    this.$refs['applicateDataFormRef'].resetFields();
                })
                this.$http({
                    url: this.$http.adornUrl(`agent/finance/user/rechargeCheck/list/check`),
                    method: 'get',
                    params: this.$http.adornParams({
                        'orderId': this.applicateDataForm.orderId,
                    })
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.applicateDataForm.mobile = data.data.mobile;
                        this.applicateDataForm.regMoney = data.data.money;
                        this.applicateDataForm.proPrice = data.data.price;
                        this.applicateDataForm.proNumber = data.data.number;
                        this.applicateDataForm.GiveNumber = data.data.freeNumber;
                        this.applicateDataForm.desc = data.data.remark;
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            },
            applicateDataSubmit() {
                this.$refs['applicateDataFormRef'].validate((valid) => {
                    if (valid) {
                        this.$http({
                            url: this.$http.adornUrl(`agent/finance/user/rechargeCheck/list/check/checkSure?token=${this.$cookie.get('token')}`),
                            method: 'get',
                            params: this.$http.adornParams({
                                'orderId': this.applicateDataForm.orderId,
                                'checkStatus': this.applicateDataForm.resource,
                                'remark': this.applicateDataForm.bohuidesc
                            })
                        }).then(({ data }) => {
                            if (data && data.code === 0) {
                                this.$message.success('操作成功!')
                                this.dialogVisible = false
                                this.$emit('refreshaccAuditList')
                            } else {
                                this.$message.error(data.msg)
                            }
                        })
                    }
                })
            },
            // auditChangeHandler(val) {
            //     if (val == 0) {
            //         this.auditDisable = true
            //     } else {
            //         this.auditDisable = false
            //         this.applicateDataForm.bohuidesc = ""
            //     }
            // },
        }
    }
</script>

<style>
    .finnceAudit .el-input__inner {
        border: none
    }

    /* .finnceAudit .el-textarea__inner {
        border: none;
        resize: none
    } */
</style>
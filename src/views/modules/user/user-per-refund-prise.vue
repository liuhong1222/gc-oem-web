<template>
    <div>
        <el-dialog title="退款" :visible.sync="refundVisible" width="52%">
            <el-form :model="refundDataForm" :rules="refunddatarules" ref="refundDataFormRef" label-width="150px" :label-position="labelPosition">
                <el-form-item label="手机号码：" prop="mobile">
                    <el-input v-model="refundDataForm.mobile" placeholder="手机号码" id="mobile" readonly ></el-input>
                </el-form-item>
                <el-form-item label="客户名称：" prop="custNanme">
                    <el-input v-model="refundDataForm.custNanme" placeholder="客户名称" id="custNanme" readonly></el-input>
                </el-form-item>
                <el-form-item label="剩余条数：" prop="refunCounts">
                    <el-input v-model="refundDataForm.refunCounts" placeholder="剩余条数" id="refunCounts" readonly></el-input>
                </el-form-item>
                <el-form-item label="退款条数：" prop="refunNumber">
                    <el-input v-model="refundDataForm.refunNumber" placeholder="退款条数"></el-input>
                    <span>条</span>
                </el-form-item>
                <el-form-item label="单价：" prop="refunPrice">
                    <el-input v-model="refundDataForm.refunPrice" placeholder="单价"></el-input>
                    <span>元/条</span>
                </el-form-item>
                <el-form-item label="退款金额：" prop="refunMoney">
                    <el-input v-model="refundDataForm.refunMoney" placeholder="退款金额"></el-input>
                    <span>元</span>
                </el-form-item>
                <el-form-item label="备注：" prop="desc">
                    <el-input type="textarea" v-model="refundDataForm.desc" placeholder="备注..."></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="refundVisible = false">取 消</el-button>
                        <el-button type="primary" @click="refundDataFormTrue">确 定</el-button>
                    </span>
        </el-dialog>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                refundVisible: false,
                labelPosition:'right',
                refundDataForm: {
                    mobile:'',
                    custNanme:'',
                    refunCounts:'',
                    refunNumber:'',
                    refunPrice:'',
                    refunMoney:'',
                    desc:''
                },
                refunddatarules: {
                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    custNanme: [
                        { required: true, message: '请输入客户名称', trigger: 'blur' }
                    ],
                    refunCounts: [
                        { required: true, message: '请输入剩余条数', trigger: 'blur' }
                    ],
                    refunNumber: [
                        { required: true, message: '请输入退款条数', trigger: 'blur' }
                      
                    ],
                    refunPrice: [
                        { required: true, message: '请输入单价', trigger: 'blur' }
                       
                    ],
                    refunMoney: [
                        { required: true, message: '请输入退款金额', trigger: 'blur' }
                     
                    ],
                },

            }
        },
        methods: {
            refundInit(arr) {
                console.log(arr[0])
                console.log(arr[1])
                this.refundVisible=true
                // if (arr[1] == 1) {  //个人
                //     this.perVisible = true
                //     this.$nextTick(() => {
                //         this.$refs['perDataForm'].resetFields()
                //     })
                // } else { //企业
                //     this.priseurl = this.$http.adornUrl(`agent/agentInfo/license/upload?token=${this.$cookie.get('token')}`)
                //     this.entriseVisible = true
                //     this.$nextTick(() => {
                //         this.$refs['priseDataFormref'].resetFields()
                //     })
                // }
            },
            refundDataFormTrue(){
                this.$refs['refundDataFormRef'].validate((valid) => {
                    if (valid) {
                        console.log('表单验证通过')
                    }
                })
            }
        }
    }

</script>
<style>
    #mobile,#custNanme ,#refunCounts{
        border:none
    }
</style>
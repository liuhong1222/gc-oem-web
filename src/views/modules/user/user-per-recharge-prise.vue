<template>
    <el-dialog title="充值" :visible.sync="chargeVisible" width="40%">
        <el-form :model="rechargeDataForm" :rules="rechargerules" ref="rechargeRef" label-width="150px" :label-position="labelPosition">
            <el-form-item label="手机号码：" prop="mobile"  >
                <el-input v-model="rechargeDataForm.mobile" placeholder="手机号码" id="mobile" readonly  ></el-input>
            </el-form-item>
            <el-form-item label="套餐选择：" prop="packageList">
                <el-select v-model="rechargeDataForm.packageList" placeholder="请选择套餐" @change="selectT">
                    <el-option label="套餐A" value="0"></el-option>
                    <el-option label="套餐B" value="1"></el-option>
                    <el-option label="套餐C" value="2"></el-option>
                    <el-option label="其他" value="-1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单价：" prop="price">
                <el-input v-model="rechargeDataForm.price" placeholder="单价" :readonly="readPrice"></el-input>
                <span>元/条</span>
            </el-form-item>

            <el-form-item label="充值条数：" prop="rechargeCounts">
                <el-input v-model="rechargeDataForm.rechargeCounts" placeholder="充值条数" :readonly="readCounts"></el-input>
                <span>万条</span>
            </el-form-item>
            <el-form-item label="充值金额：" prop="rechargeMoney">
                <el-input v-model="rechargeDataForm.rechargeMoney" placeholder="充值金额" :readonly="readMoney"></el-input>
                <span>元</span>
            </el-form-item>
            <el-form-item label="我的余额：" prop="myCounts">
                <el-input v-model="rechargeDataForm.myCounts" placeholder="我的余额"  id="myCounts" readonly ></el-input>
                <span>万条</span>
            </el-form-item>
            <el-form-item label="充值方式：" prop="rechargeMethod">
                <el-select v-model="rechargeDataForm.rechargeMethod" placeholder="请选择充值方式">
                    <el-option label="支付宝" value="0"></el-option>
                    <el-option label="对公转账" value="1"></el-option>
                    <el-option label="赠送" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注：" prop="rechargeDesc">
                <el-input type="textarea" v-model="rechargeDataForm.rechargeDesc" placeholder="备注"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                    <el-button @click="entriseVisible = false">取 消</el-button>
                    <el-button type="primary" @click="rechargeDataSubmit">确 定</el-button>
                </span>
    </el-dialog>
</template>
<script>
    export default {
        data() {
            return {
                readPrice: true,
                readCounts: true,
                readMoney: true,
                chargeVisible: false,
                labelPosition: 'right',
                rechargeDataForm: {
                    mobile: '',
                    packageList: '',
                    price: '',
                    rechargeCounts: '',
                    rechargeMoney: '',
                    myCounts: '',
                    rechargeMethod: '',
                    rechargeDesc: '',
                },
                rechargerules: {
                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ],
                    packageList: [
                        { required: true, message: '请选择套餐', trigger: 'blur' },
                    ],
                    price: [
                        { required: true, message: '请输入单价', trigger: 'blur' },
                    ],
                    rechargeCounts: [
                        { required: true, message: '请输入充值条数', trigger: 'blur' },
                    ],
                    rechargeMoney: [
                        { required: true, message: '请输入充值金额', trigger: 'blur' },
                    ],
                    myCounts: [
                        { required: true, message: '请输我的余额', trigger: 'blur' },
                    ],
                    rechargeMethod: [
                        { required: true, message: '请选择充值方式', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            rechargeInit(arr) {
                this.chargeVisible = true
                console.log(arr[0])
                console.log(arr[1])    //保存起来  ，提交充值的时候，传过去，这样就知道是个人还是企业的充值
                // if (arr[1] == 1) {  //个人
                //     this.perVisible = true
                //     this.$nextTick(() => {
                //         this.$refs['rechargeDataForm'].resetFields()
                //     })
                // } else { //企业
                //     this.priseurl = this.$http.adornUrl(`agent/agentInfo/license/upload?token=${this.$cookie.get('token')}`)
                //     this.entriseVisible = true
                //     this.$nextTick(() => {
                //         this.$refs['rechargeDataForm'].resetFields()
                //     })
                // }
            },
            // 点击套餐出信息
            selectT() {
                // 点击套餐，ajax获取套餐列表 判断是点击的那个进行赋值，如果为其他 就可以编辑，不赋值
                // console.log(this.rechargeDataForm.packageList)
                if (this.rechargeDataForm.packageList == "-1") {
                    console.log(333)
                    this.readPrice=false,
                    this.readCounts=false,
                    this.readMoney=false
                    }
               
            },

            // 提价充值
            rechargeDataSubmit() {
                this.$refs['rechargeRef'].validate((valid) => {
                    if (valid) {
                        console.log('表单验证通过')
                    }
                })
            }
        }
    }
    
</script>
<style>
    #mobile,#myCounts {
        border:none
    }
</style>
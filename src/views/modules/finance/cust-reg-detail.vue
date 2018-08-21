<template>
    <div id="regMethodsForm">
        <el-dialog title="查看详情" :close-on-click-modal="false" :visible.sync="regMethodsvisible">
            <el-form :model="regMethodsForm" :rules="regMethodsRule" ref="dataForm" :label-position="labelPosition" label-width="123px"
                class="cf">
                <el-form-item label="充值时间:" prop="regTime">
                    <el-input v-model="regMethodsForm.regTime" placeholder="充值时间" readonly></el-input>
                </el-form-item>
                <el-form-item label="客户编号:" prop="mchId">
                    <el-input v-model="regMethodsForm.mchId" placeholder="客户编号" readonly></el-input>
                </el-form-item>
                <el-form-item label="客户名称:" prop="userName">
                    <el-input v-model="regMethodsForm.userName" placeholder="客户名称" readonly></el-input>
                </el-form-item>
                <el-form-item label="代理商名称:" prop="userName">
                    <el-input v-model="regMethodsForm.userName" placeholder="客户名称" readonly></el-input>
                </el-form-item>
                <el-form-item label="订单编号：" prop="order">
                    <el-input v-model="regMethodsForm.order" placeholder="订单编号" readonly></el-input>
                </el-form-item>
                <el-form-item label="套餐选择：" prop="packageSel">
                    <el-input v-model="regMethodsForm.packageSel" placeholder="套餐选择" readonly></el-input>
                </el-form-item>
                <el-form-item label="单价：" prop="price">
                    <el-input v-model="regMethodsForm.price" placeholder="单价" readonly></el-input>
                </el-form-item>
                <el-form-item label="充值金额：" prop="regMoney">
                    <el-input v-model="regMethodsForm.regMoney" placeholder="充值金额" readonly></el-input>
                </el-form-item>
                <el-form-item label="收款账号：" prop="reveAcc">
                    <el-input v-model="regMethodsForm.reveAcc" placeholder="收款账号" readonly></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="deac">
                    <el-input type="textarea" v-model="regMethodsForm.desc" placeholder="备注" readonly></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="regMethodsvisible = false">取消</el-button>
                        <el-button type="primary"  @click="regMethodsvisible = false">确定</el-button>
                    </span>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                regMethodsvisible: false,
                labelPosition: 'right',
                regMethodsForm: {
                    regTime: '',
                    mchId: '',
                    userName: '',
                    order: '',
                    packageSel: '',
                    price: '',
                    regCounts: '',
                    regMethods: '',
                    reveAcc: '',
                    desc: ''
                },
                regMethodsRule: {}
            }
        },
        methods: {
            regDetailInit(id) {
                // console.log("id" + id)
                this.regMethodsvisible = true
                
            }
        }
    }

</script>

<style lang="scss">
    #regMethodsForm .el-input .el-input__inner {
        border: none 
    }
</style>
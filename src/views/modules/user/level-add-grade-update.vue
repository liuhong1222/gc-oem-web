<template>
    <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="levelvisible">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="123px">
            <el-form-item label="代理商等级：" prop="level">
                <el-input v-model="dataForm.level" placeholder="代理商等级"></el-input>
            </el-form-item>
            <el-form-item label="单价：" prop="price">
                <el-input v-model="dataForm.price" placeholder="单价"></el-input>
                <span>元/条</span>
            </el-form-item>
            <el-form-item label="允许超出条数：" prop="moreCounts">
                <el-input v-model="dataForm.moreCounts" placeholder="单价"></el-input>
                <span>万条</span>
            </el-form-item>
            <el-form-item label="充值金额：" prop="reMoney">
                <el-input v-model="dataForm.reMoney1" style="width:35%"></el-input>—
                <el-input v-model="dataForm.reMoney2" style="width:35%"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="levelvisible = false">取消</el-button>
            <el-button type="primary"  @click="levelSubmit()">确定</el-button>
          </span>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                levelvisible: false,
                dataForm: {
                    id: 0,
                    level: '',
                    price: '',
                    moreCounts: '',
                    reMoney: ''
                },
                dataRule: {
                    level: [
                        { required: true, message: '请输入代理商等级', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入单价', trigger: 'blur' }
                    ],
                    moreCounts: [
                        { required: true, message: '请输入允许超出条数', trigger: 'blur' }
                    ],
                    reMoney: [
                        { required: true, message: '请输入充值金额', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            levelInit(id) {
                this.dataForm.id = id || 0
                this.levelvisible = true
                console.log(id)
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields()
                })
            },
            levelSubmit() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(3333)
                    }
                })

            }
        }
    }

</script>

<style lang="scss">

</style>
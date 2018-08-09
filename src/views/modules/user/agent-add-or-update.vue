<template>
    <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
        <el-form :model="dataForm" :rules="datarules" ref="dataForm" label-width="80%" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="dataForm.userName" placeholder="登录帐号"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>

</template>
<script>
    export default {
        data() {
            return {
                visible: false,
                dataForm: {
                    id: 0,
                    userName: ''
                },
                datarules: {
                    userName: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            showInit(id) {
                this.dataForm.id = id || 0
                this.visible = true
                console.log(this.$http.adornParams())
            },
            dataFormSubmit() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log('表单验证通过')
                    }
                })
            }
        }
    }

</script>
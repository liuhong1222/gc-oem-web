<template>
    <el-dialog title="重新绑定手机号" :visible.sync="dialogVisible" width="38%">
        <el-form :model="rePhoneForm" ref="rePhoneRef" label-width="150px" class="demo-ruleForm" :label-position="labelPosition">
            <el-form-item label="原手机号：">
                <el-input v-model="rePhoneForm.phone" placeholder="原手机号" readonly></el-input>
            </el-form-item>
            <el-form-item label="短信验证码：" style="margin-bottom:-20px;line-height: 20px;">
                <el-input v-model="rePhoneForm.oldCode" placeholder="请输入手机验证码..." style="width:44%;"></el-input>
                <el-input v-model="rePhoneForm.getoldCode" value="" readonly id="getCode"></el-input>
            </el-form-item>
            <el-form-item label="新手机号：">
                <el-input v-model="rePhoneForm.newPhone" placeholder="请输入新手机号"></el-input>
            </el-form-item>
            <el-form-item label="短信验证码：">
                <el-input v-model="rePhoneForm.newCode" placeholder="请输入手机验证码..." style="width:44%;"></el-input>
                <el-input v-model="rePhoneForm.getNewCode" value="" readonly id="getCode"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                labelPosition: 'right',
                rePhoneForm: {
                    phone: '17612163551',
                    oldCode: '',
                    getoldCode: '获取验证码',
                    newPhone: '',
                    newCode: '',
                    getNewCode: '获取验证码'
                }
            }
        },
        methods: {
            showInit() {
                this.dialogVisible = true
                // console.log('重新绑定手机哈')
            }
        }
    }

</script>

<style lang="scss">
    #getCode {
        width: 40%;
        background-color: #3E8EF7;
        float: right;
        margin-top: -65px;
        text-align: center;
        cursor: pointer;
        color: #fff;
    }

    #getCode:hove {
        background-color: #559AF3;
    }
</style>
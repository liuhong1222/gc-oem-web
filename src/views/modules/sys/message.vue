<template>
    <div class="main">
        <h2 style="margin-bottom:35px">消息管理</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="消息标题" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="消息类别" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择消息类别">
                    <!-- <el-option label="区域一" value="shanghai"></el-option> -->
                    <el-option label="系统消息" value="1"></el-option>
                    <el-option label="更新通知" value="4"></el-option>
                    <el-option label="活动通知" value="2"></el-option>
                    <el-option label="故障通知" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发送对象" prop="object">
                <el-radio-group v-model="ruleForm.object" @change="changeHandler">
                    <el-radio :label="0">所有用户</el-radio>
                    <el-radio :label="1">选定用户</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="消息内容" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" :rows="20"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认发布</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 选定用户弹窗 -->
        <select-user v-if="selectUserVisible" ref="selectUserRef" v-on:childByValue="childByValue"></select-user>
    </div>
</template>
<script>
    import selectUser from './mess-select-user'
    export default {
        data() {
            return {
                selectUserVisible: false,
                childValues: "",
                ruleForm: {
                    name: '',
                    type: '',
                    object: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入消息标题', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择消息类别', trigger: 'change' }
                    ],
                    object: [
                        { required: true, message: '请选择发送对象', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写消息内容', trigger: 'blur' }
                    ]
                }
            };
        },
        components: {
            selectUser
        },
        methods: {
            changeHandler(val) {
                if (val == 1) {
                    // console.log('显示弹窗')
                    this.selectUserVisible = true
                    this.$nextTick(() => {
                        this.$refs.selectUserRef.showInit()
                    })
                } else {
                    this.childValues = ""
                    // console.log('隐藏弹窗')
                }
            },
            childByValue(childValue) {
                this.childValues = childValue
            },
            submitForm(formName) {
                console.log(this.childValues)  //选定的手机号
                console.log(this.ruleForm.type)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认要发布吗？')
                            .then(_ => {
                                this.message()
                            })
                            .catch(_ => { })
                    }
                });
            },
            message() {
                this.$http({
                    url: this.$http.adornUrl(`agent/message/addMessage?token=${this.$cookie.get('token')}`),
                    method: 'post',
                    params: this.$http.adornParams({
                        'type': this.ruleForm.type,
                        'userIdList': JSON.stringify(this.childValues),
                        'title': this.ruleForm.name,
                        'message': this.ruleForm.desc
                    })
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.$message.success('消息发布成功!')
                        this.$nextTick(() => {
                            this.$refs['ruleForm'].resetFields();
                        })
                    } else {
                        this.$message.error(data.msg)
                        this.$nextTick(() => {
                            this.$refs['ruleForm'].resetFields();
                        })
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }

</script>
<style>
    .main {
        background: #fff;
        padding: 20px
    }
</style>
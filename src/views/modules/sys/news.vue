<template>
    <div class="content">
        <h2>新闻管理</h2>
        <el-form ref="newsForm" :model="newsform" :rules="newrules" label-width="120px">
            <el-form-item label="新闻标题：" prop="name">
                <el-input v-model="newsform.name"></el-input>
            </el-form-item>
            <el-form-item label="新闻内容：" prop="newsCon">
                <el-input type="textarea" v-model="newsform.newsCon" :rows="20"></el-input>
            </el-form-item>
            <el-form-item id="newConBtn">
                <el-button type="primary" @click="onSubmitNews">确认发布</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                newsform: {
                    newsCon: '',
                    name: ''
                },
                newrules: {
                    name: [
                        { required: true, message: '请输入新闻名称', trigger: 'blur' },
                    ],
                    newsCon: [
                        { required: true, message: '请填写新闻内容', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            onSubmitNews() {
                this.$refs['newsForm'].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm() {
                this.$refs['newsForm'].resetFields();
            }
        }
    }

</script>

<style lang="scss">
    .content {
        background-color: #fff;
        padding: 10px 20px;
    }

    #newConBtn button {
        width: 120px;
        font-size: 14px;
    }
</style>
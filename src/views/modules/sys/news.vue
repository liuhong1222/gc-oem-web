<template>
    <div class="content">
        <h2 style="margin-bottom:35px">新闻管理</h2>
        <el-form ref="newsForm" :model="newsform" :rules="newrules" label-width="120px">
            <el-form-item label="新闻标题：" prop="name">
                <el-input v-model="newsform.name"></el-input>
            </el-form-item>
            <el-form-item label="新闻内容：" prop="newsCon">
                <el-input type="textarea" v-model="newsform.newsCon" :rows="20"></el-input>
            </el-form-item>
            <el-form-item id="newConBtn">
                <el-button type="primary" @click="onSubmitNews">确认发布</el-button>
                <el-button @click="resetForm('newsForm')">重置</el-button>
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
                        this.$confirm('确认要发布吗？')
                            .then(_ => {
                                this.news()
                            })
                            .catch(_ => { })
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            news() {
                this.$http({
                    url: this.$http.adornUrl(`agent/news/addNews?token=${this.$cookie.get('token')}`),
                    method: 'post',
                    params: this.$http.adornParams({
                        'title': this.newsform.name,
                        'message': this.newsform.newsCon,
                    })
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.$message.success('新闻发布成功!')
                        this.$nextTick(() => {
                            this.$refs['newsForm'].resetFields()
                        })
                    }
                })
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
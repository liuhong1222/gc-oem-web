<template>
    <div class="main">
        <h2 style="display:inline-block">OEM代理商等级管理</h2>
        <el-button type="primary" style="float:right" @click="addUpdateLevel()">新增</el-button>
        <div class="userTable">
            <el-table :data="oemTableData" style="width: 100%" v-loading="dataListLoading" :header-cell-style="getRowClass">
                <el-table-column type="index" header-align="center" align="center" width="80" fixed label="序号">
                </el-table-column>
                <el-table-column prop="name" label=" 代理商级别" align="center">
                </el-table-column>
                <el-table-column prop="price" label=单价（元/条） align="center">
                </el-table-column>
                <el-table-column prop="emptyWarnNumber" label="预警条数(条) " align="center">
                </el-table-column>
                <el-table-column prop="minRecharge" label=" 最小充值金额（元） " align="center">
                </el-table-column>
                <el-table-column prop="maxRecharge" label=" 最大充值金额（元） " align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="del(scope.row.id,scope.row.name)">删除</el-button>
                        <el-button type="text" size="small" @click="addUpdateLevel(scope.row.id)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 删除代理商等级 -->
        <add-grade-update v-if="gradeVisible" ref="gradeCon" @refreshDataList="levelList"></add-grade-update>
    </div>
</template>

<script>
    import AddGradeUpdate from './level-add-grade-update'
    export default {
        data() {
            return {
                gradeVisible: false,
                oemTableData: [],
                dataListLoading: false,
            }
        },
        components: {
            AddGradeUpdate
        },
        activated() {
            this.levelList()
        },
        methods: {
            levelList() {
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl(`agent/level/list?token=${this.$cookie.get('token')}`),
                    method: 'get',
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        // console.log(data)
                        this.oemTableData = data.data
                    } else {
                        this.oemTableData = []
                    }
                    this.dataListLoading = false
                })
            },
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background-color: #f8f8f8;color:#666;'
                } else {
                    return ''
                }
            },
            // 点击修改 ，新增
            addUpdateLevel(id) {
                this.gradeVisible = true
                this.$nextTick(() => {
                    this.$refs.gradeCon.levelInit(id)
                })
            },
            // 点击删除
            del(id, name) {
                this.$confirm(`是否删除${name}以及相关信息？`, '删除代理商等级', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: this.$http.adornUrl(`agent/level/delete?token=${this.$cookie.get('token')}`),
                        method: 'post',
                        params: this.$http.adornParams({
                            'id': id
                        })
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1500,
                                onClose: () => {
                                    this.levelList()
                                }
                            })
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                }).catch(() => { })
            }
        }
    }

</script>
<style lang="scss">
    .main {
        width: 100%;
        padding: 10px 23px 20px;
        background-color: #ffffff;
        margin-bottom: 24px;
        box-shadow: 0px 7px 9px 0px rgba(153, 153, 153, 0.05);
    }
</style>
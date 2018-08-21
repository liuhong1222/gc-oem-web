<template>
    <div class="main">
        <div class="topSearch">
            <h2>账号管理</h2>
            <el-form :inline="true" :model="accountData">
                <el-form-item label="手机号：">
                    <el-input v-model="accountData.mobile" placeholder="手机号" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="agentSysUserList()">查询</el-button>
                    <el-button type="primary" @click="agentExport()" :disabled="disabled">导出</el-button>
                    <el-button type="primary" @click="addUpdateAgent()">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="agentTable">
            <el-table :data="accountTableData" style="width: 100%" :header-cell-style="getRowClass">
                <el-table-column type="index" header-align="center" align="center" width="80" fixed label="序号">
                </el-table-column>
                <el-table-column prop="userId" label=" 用户编号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="realName" label=" 用户名称" align="center">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号码" width="120" align="center">
                </el-table-column>
                <!-- <el-table-column prop="password" label="密码" width="90" align="center">
                </el-table-column> -->
                <el-table-column prop="createTime" label="创建时间" align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="addUpdateAgent(scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="delAcc(scope.row.userId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 新增，修改代理商管理 -->
        <add-agent-update v-if="accountVisible" ref="accountCon" @refreshDataList="agentSysUserList"></add-agent-update>
    </div>
</template>

<script>
   
    import addAgentUpdate from './acc-add-agent-update'
    export default {
        data() {
            return {
                paramArr: [],
                accountVisible: false,
                disabled: false,
                accountData: {
                    mobile: ""
                },
                accountTableData: [],
            }
        },
        components: {
            addAgentUpdate
        },
        activated() {
            this.agentSysUserList()
        },
        methods: {
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background-color: #f8f8f8;color:#666;'
                } else {
                    return ''
                }
            },
            // 代理商账号列表
            agentSysUserList() {
                this.$http({
                    url: this.$http.adornUrl(`agent/agentSysUser/list?token=${this.$cookie.get('token')}`),
                    method: 'get',
                    params: this.$http.adornParams({
                        mobile: this.accountData.mobile
                    })
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.accountTableData = data.data.list
                        if (data.data.list.length == 0) {
                            this.disabled = true
                        } else {
                            this.disabled = false
                        }
                    } else {
                        this.accountTableData = []
                    }
                })
            },
            // 新增，修改
            addUpdateAgent(row) {
                let paramArr = this.paramArr;
                if (row !== undefined) {
                    this.paramArr[0] = row.userId
                    this.paramArr[1] = row.realName
                    this.paramArr[2] = row.mobile
                } else {
                    paramArr = ""
                }

                this.accountVisible = true
                this.$nextTick(() => {
                    this.$refs.accountCon.updateInit(paramArr)
                })
            },
            // 删除
            delAcc(id) {
                this.$confirm(`是否删除用户编号为${id}的用户以及相关信息？`, '删除账号', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: this.$http.adornUrl(`agent/agentSysUser/delete?token=${this.$cookie.get('token')}`),
                        method: 'post',
                        params: this.$http.adornParams({
                            'userId': id
                        })
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1500,
                                onClose: () => {
                                    this.agentSysUserList()
                                }
                            })
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                }).catch(() => { })
            },
            // 导出
            agentExport() {
                window.open(this.$http.adornUrl(`agent/agentSysUser/list/export?token=${this.$cookie.get('token')}&mobile=${this.accountData.mobile}`))
            }
        }
    }

</script>
<style lang="scss">
    .topSearch {
        width: 100%;
        padding: 10px 23px 20px;
        background-color: #ffffff;
        margin-bottom: 24px;
        box-shadow: 0px 7px 9px 0px rgba(153, 153, 153, 0.05);
    }
</style>
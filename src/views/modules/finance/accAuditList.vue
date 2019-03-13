<template>
    <div class="main">
        <div class="topSearch accAuditData">
            <h2>入账审核列表</h2>
            <el-form :inline="true" :model="accAuditDataList" @keyup.enter.native="accAuditList()">
                <el-form-item label="手机号：">
                    <el-input v-model="accAuditDataList.mobile" placeholder="请输入客户手机号……" clearable></el-input>
                </el-form-item>
                <el-form-item label="代理商：">
                    <el-input v-model="accAuditDataList.agent" placeholder="请输入代理商名称……" clearable></el-input>
                </el-form-item>
                <el-form-item style="margin-left:6px">
                    <el-button type="primary" @click="accAuditList()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="agentTable">
            <el-table :data="accountTableData" style="width: 100%" v-loading="dataListLoading" :header-cell-style="getRowClass">
                <el-table-column type="index" header-align="center" align="center" width="80" label="序号">
                </el-table-column>
                <el-table-column prop="userPhone" label="手机号" align="center">
                </el-table-column>
                <el-table-column prop="agentCompanyName" label="代理商名称" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="申请时间" align="center">
                </el-table-column>
                <el-table-column prop="agentId" label="充值产品" align="center">
                    <template slot-scope="scope">
                        空号检测
                    </template>
                </el-table-column>
                <el-table-column prop="money" label=" 充值金额" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center">
                </el-table-column>
                <el-table-column label=" 审核状态" align="center">
                    <template slot-scope="scope">
                        待审核
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label=" 操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="auditAccBtn(scope.row)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="agentPage">
            <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
                :page-sizes="[10, 20,30,50]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <!-- 审核 -->
        <audit-to-account v-if="auditAccountVisible" ref="auditAccountCon" @refreshaccAuditList="accAuditList"></audit-to-account>
    </div>
</template>
<script>
    import auditToAccount from './finance-audit-to-account'
    export default {
        data() {
            return {
                accAuditDataList: {
                    mobile: '',
                    agent: ''
                },
                auditAccountVisible: false,
                accountTableData: [],
                dataListLoading: false,
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
            }
        },
        components: {
            auditToAccount
        },
        activated() {
            this.accAuditList()
        },
        methods: {
            accAuditList() {
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl(`agent/finance/user/rechargeCheck/list?token=${this.$cookie.get('token')}`),
                    method: 'get',
                    params: this.$http.adornParams({
                        'currentPage': this.pageIndex,
                        'pageSize': this.pageSize,
                        'companyName': this.accAuditDataList.agent,
                        'userMobile': this.accAuditDataList.mobile
                    })
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.accountTableData = data.data.list
                        this.totalPage = data.data.total
                    } else {
                        this.accountTableData = []
                        this.totalPage = 0
                    }
                    this.dataListLoading = false
                })
            },
            // 每页数
            sizeChangeHandle(val) {
                this.pageSize = val
                this.pageIndex = 1
                this.accAuditList()
            },
            // 当前页
            currentChangeHandle(val) {
                this.pageIndex = val
                this.accAuditList()
            },
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background-color: #f8f8f8;color:#666;'
                } else {
                    return ''
                }
            },
            auditAccBtn(row) {
                this.auditAccountVisible = true;
                this.$nextTick(() => {
                    this.$refs.auditAccountCon.auditAccountInit(row)
                })
            }
        }
    }

</script>

<style lang="scss">
    .topSearch {
        width: 100%;
        padding: 10px 23px 20px;
        background-color: #fff;
        margin-bottom: 24px;
        box-shadow: 0px 7px 9px 0px rgba(153, 153, 153, 0.05);
    }

    .accAuditData .el-input,
    .accAuditData .el-input__inner {
        width: 100%;
    }
</style>
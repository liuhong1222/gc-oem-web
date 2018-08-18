<template>
    <div class="main">
        <div class="topSearch">
            <h2>客户消耗记录</h2>
            <el-form :inline="true" :model="consumeSearchData">
                <el-form-item label="创建时间：">
                    <el-date-picker v-model="consumeSearchData.dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="客户手机号：" style="margin-left:35px;">
                    <el-input v-model="consumeSearchData.mobile" placeholder="客户手机号" clearable></el-input>
                </el-form-item>
                <el-form-item label="代理商名称：">
                    <el-input v-model="consumeSearchData.agentName" placeholder="代理商名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="客户名称：" style="margin-left:-2px;">
                    <el-input v-model="consumeSearchData.custName" placeholder="客户名称" clearable></el-input>
                </el-form-item>
                <el-form-item style="margin-left:6px">
                    <el-button type="primary" @click="consumeList()">查询</el-button>
                    <el-button type="primary" :disabled="disabled" @click="consumeExport()">导出</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="agentTable">
            <el-table :data="consumeTableData" style="width: 100%" show-summary :summary-method="getTotal" v-loading="dataListLoading"
                :header-cell-style="getRowClass">
                <el-table-column type="index" header-align="center" align="center" width="80" label="序号">
                </el-table-column>
                <el-table-column prop="userId" label=" 客户编号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="userName" label=" 客户名称" align="center">
                </el-table-column>
                <el-table-column prop="agentCompanyName" label="代理商名称" align="center">
                </el-table-column>
                <el-table-column prop="consumeTime" label="消耗时间" align="center">
                </el-table-column>
                <el-table-column prop="number" label="消耗条数" width="120" align="center">
                </el-table-column>
                <el-table-column prop="userMobile" label="手机号" width="100" align="center">
                </el-table-column>
            </el-table>
        </div>
        <div class="agentPage">
            <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[3, 5]"
                :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataListLoading: false,
                disabled: false,
                consumeSearchData: {
                    dateTime: [],
                    agentName: "",
                    custName: '',
                    mobile: ''
                },
                consumeTableData: [],
                pageIndex: 1,
                pageSize: 3,
                totalPage: 0,
            }
        },
        activated() {
            this.consumeList()
        },
        methods: {
            // 获取消耗记录接口
            consumeList() {
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl(`agent/finance/user/consume/list?token=${this.$cookie.get('token')}`),
                    method: 'get',
                    params: this.$http.adornParams({
                        'currentPage': this.pageIndex,
                        'pageSize': this.pageSize,
                        'userMobile': this.consumeSearchData.mobile,
                        'companyName': this.consumeSearchData.agentName,
                        'userName': this.consumeSearchData.custName,
                        'startTime': '' || this.consumeSearchData.dateTime == null ? '' : this.consumeSearchData.dateTime[0],
                        'endTime': '' || this.consumeSearchData.dateTime == null ? '' : this.consumeSearchData.dateTime[1]
                    })
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.consumeTableData = data.data.list
                        this.totalPage = data.data.total
                        if (data.data.list.length == 0) {
                            this.disabled = true
                        } else {
                            this.disabled = false
                        }
                    } else {
                        this.consumeTableData = []
                        this.totalPage = 0
                    }
                    this.dataListLoading = false
                })
            },
            // 每页数
            sizeChangeHandle(val) {
                this.pageSize = val
                this.pageIndex = 1
                this.agentRechargeList()
            },
            // 当前页
            currentChangeHandle(val) {
                this.pageIndex = val
                this.agentRechargeList()
            },
            getTotal(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    // console.log(column.property)
                    if (column.property === 'number') {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        // sums[index];])
                        sums[index] += ' 条';
                    } else {
                        sums[index] = '--';
                    }
                });

                return sums;
            },
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background-color: #f8f8f8;color:#666;'
                } else {
                    return ''
                }
            },
            consumeExport() {
                let startTime;
                let endTime;
                if (this.consumeSearchData.dateTime == null) {
                    startTime = ""
                    endTime = ""
                } else {
                    if (this.consumeSearchData.dateTime.length == 0) {
                        startTime = ""
                        endTime = ""
                    } else {
                        startTime = this.consumeSearchData.dateTime[0]
                        endTime = this.consumeSearchData.dateTime[1]
                    }
                }
                window.open(this.$http.adornUrl(`agent/finance/user/consume/list/export?token=${this.$cookie.get('token')}&currentPage=${this.pageIndex}&pageSize=${this.pageSize}&userName=${this.consumeSearchData.custName}&companyName=${this.consumeSearchData.agentName}&userMobile=${this.consumeSearchData.mobile}&startTime=${startTime}&endTime=${endTime}`))

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
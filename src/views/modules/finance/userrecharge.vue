<template>
    <div class="main">
        <div class="topSearch">
            <h2>客户充值明细记录</h2>
            <el-form :inline="true" :model="customerSearchData">
                <el-form-item label="创建时间：">
                    <el-date-picker v-model="customerSearchData.dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="代理商名称：" style="margin-left:5px;">
                    <el-input v-model="customerSearchData.agentName" placeholder="代理商名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="客户名称：" style="margin-left:-2px;">
                    <el-input v-model="customerSearchData.custName" placeholder="客户名称" clearable></el-input>
                </el-form-item>
                <el-form-item style="margin-left:6px">
                    <el-button type="primary">查询</el-button>
                    <el-button type="primary">导出</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="agentTable">
            <el-table :data="customerTableData" style="width: 100%" show-summary :summary-method="getTotal" v-loading="dataListLoading"
                :header-cell-style="getRowClass">
                <el-table-column type="index" header-align="center" align="center" width="80" label="序号">
                </el-table-column>
                <el-table-column prop="payTime" label="充值时间" align="center">
                </el-table-column>
                <el-table-column prop="userId" label=" 客户编号" align="center">
                </el-table-column>
                <el-table-column prop="userName" label=" 客户名称" align="center">
                </el-table-column>
                <el-table-column prop="agentCompanyName" label="代理商名称" align="center">
                </el-table-column>
                <el-table-column prop="userMobile" label="手机号" align="center">
                </el-table-column>
                <el-table-column prop="orderNo" label="订单编号" align="center">
                </el-table-column>
                <el-table-column prop="packageName" label="套餐选择" align="center">
                </el-table-column>
                <el-table-column prop="price" label="单价（元）" align="center">
                </el-table-column>
                <el-table-column prop="number" label="条数（元）" align="center">
                </el-table-column>
                <el-table-column prop="money" label="金额（元）" align="center">
                </el-table-column>
                <el-table-column prop="payTypeName" label="充值方式（元）" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center">
                </el-table-column>
            </el-table>
        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataListLoading: false,
                customerSearchData: {
                    dateTime: [],
                    agentName: "",
                    custName: '',
                },
                customerTableData: [],
                pageIndex: 1,
                pageSize: 3,
                totalPage: 0,
            }
        },
        activated() {
            this.uerRechargeList()
        },
        methods: {
            uerRechargeList() {
                this.dataListLoading = true;
                this.$http({
                    url: this.$http.adornUrl(`agent/finance/user/recharge/list?token=${this.$cookie.get('token')}`),
                    method: 'get',
                    params: this.$http.adornParams({
                        'currentPage': this.pageIndex,
                        'pageSize': this.pageSize,
                        'companyName': this.customerSearchData.agentName,
                        'userName': this.customerSearchData.custName,
                        'startTime': '' || this.customerSearchData.dateTime == null ? '' : this.customerSearchData.dateTime[0],
                        'endTime': '' || this.customerSearchData.dateTime == null ? '' : this.customerSearchData.dateTime[1]
                    })
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.customerTableData = data.data.list
                        this.totalPage = data.data.total

                    } else {
                        this.customerTableData = []
                        this.totalPage = 0
                    }
                    this.dataListLoading = false
                })
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
                    if (column.property === 'number' || column.property === 'money') {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        if (column.property === 'number') {
                            sums[index] += ' 条';

                            console.log(sums[index])
                        } else if (column.property === 'money') {
                            sums[index] += ' 元';
                        }

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
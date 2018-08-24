<template>
    <div class="main">
        <div class="topSearch">
            <h2>客户退款记录</h2>
            <el-form :inline="true" :model="refundSearchData">
                <el-form-item label="申请时间：">
                    <el-date-picker v-model="refundSearchData.dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        value-format="yyyy-MM-dd" :picker-options="pickerOptions0">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="客户手机号：" style="margin-left:35px;">
                    <el-input v-model="refundSearchData.mobile" placeholder="客户手机号" clearable></el-input>
                </el-form-item>
                <el-form-item label="代理商名称：" style="margin-left:-15px;" v-if="disableAgent">
                    <el-input v-model="refundSearchData.agentName" placeholder="代理商名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="客户名称：" style="margin-left:-2px;">
                    <el-input v-model="refundSearchData.custName" placeholder="客户名称" clearable></el-input>
                </el-form-item>
                <el-form-item style="margin-left:6px">
                    <el-button type="primary" @click="refundList">查询</el-button>
                    <el-button type="primary" @click="refundExport" :disabled="disabled">导出</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="agentTable">
            <el-table :data="refundTableData" style="width: 100%" v-loading="dataListLoading" show-summary :summary-method="getTotal"
                :header-cell-style="getRowClass">
                <el-table-column type="index" header-align="center" align="center" width="70" label="序号">
                </el-table-column>
                <el-table-column prop="payTime" label="退款时间" align="center">
                </el-table-column>
                <!-- <el-table-column prop="userId" label=" 客户编号" width="80" align="center">
                </el-table-column> -->
                <el-table-column prop="userName" label=" 客户名称" align="center">
                </el-table-column>
                <el-table-column prop="userMobile" label="手机号" align="center">
                </el-table-column>
                <el-table-column prop="agentCompanyName" label="代理名称" align="center" v-if="disableAgentName">
                </el-table-column>
                <el-table-column prop="price" label="单价（元/条）" align="center">
                </el-table-column>
                <el-table-column prop="number" label="条数" align="center">
                </el-table-column>
                <el-table-column prop="money" label="金额（元）" align="center">
                </el-table-column>
                <el-table-column  prop="remark" label="备注" align="center">
                </el-table-column>
            </el-table>
        </div>
        <div class="agentPage">
            <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10,20,30,50]"
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
                disableAgent: true,
                disableAgentName: true,
                refundSearchData: {
                    dateTime: [],
                    agentName: "",
                    custName: '',
                    mobile: ''
                },
                refundTableData: [],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6
                    }
                }
            }
        },
        activated() {
            this.refundList()
        },
        methods: {
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background-color: #f8f8f8;color:#666;'
                } else {
                    return ''
                }
            },

            // 获取退款记录接口
            refundList() {
                if (sessionStorage.getItem('msjRoleName') == '2') {
                    this.disableAgent = false
                    this.disableAgentName = false
                }
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl(`agent/finance/user/refund/list?token=${this.$cookie.get('token')}`),
                    method: 'get',
                    params: this.$http.adornParams({
                        'currentPage': this.pageIndex,
                        'pageSize': this.pageSize,
                        'userMobile': this.refundSearchData.mobile,
                        'companyName': this.refundSearchData.agentName,
                        'userName': this.refundSearchData.custName,
                        'startTime': '' || this.refundSearchData.dateTime == null ? '' : this.refundSearchData.dateTime[0],
                        'endTime': '' || this.refundSearchData.dateTime == null ? '' : this.refundSearchData.dateTime[1]
                    })
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.refundTableData = data.data.list
                        this.totalPage = data.data.total
                        if (data.data.list.length == 0) {
                            this.disabled = true
                        } else {
                            this.disabled = false
                        }
                    } else {
                        this.refundTableData = []
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
                    if (column.property === 'number' || column.property === 'money') {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        if (column.property === 'money') {
                            sums[index] += ' 元';
                        } else if (column.property === 'number') {
                            sums[index] += ' 条';
                        }

                    } else {
                        sums[index] = '--';
                    }
                });

                return sums;
            },
            refundExport() {
                let startTime;
                let endTime;
                if (this.refundSearchData.dateTime == null) {
                    startTime = ""
                    endTime = ""
                } else {
                    if (this.refundSearchData.dateTime.length == 0) {
                        startTime = ""
                        endTime = ""
                    } else {
                        startTime = this.refundSearchData.dateTime[0]
                        endTime = this.refundSearchData.dateTime[1]
                    }
                }
                window.open(this.$http.adornUrl(`agent/finance/user/refund/list/export?token=${this.$cookie.get('token')}&currentPage=${this.pageIndex}&pageSize=${this.pageSize}&companyName=${this.refundSearchData.agentName}&userMobile=${this.refundSearchData.mobile}&startTime=${startTime}&endTime=${endTime}`))
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
</style>
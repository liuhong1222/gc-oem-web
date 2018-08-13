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
                <el-form-item label="代理商名称：" style="margin-left:5px;">
                    <el-input v-model="consumeSearchData.agentName" placeholder="代理商名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="客户名称：" style="margin-left:-2px;">
                    <el-input v-model="consumeSearchData.custName" placeholder="客户名称" clearable></el-input>
                </el-form-item>
                <el-form-item style="margin-left:6px">
                    <el-button type="primary">查询</el-button>
                    <el-button type="primary">导出</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="agentTable">
            <el-table :data="consumeTableData" style="width: 100%" show-summary :summary-method="getTotal" v-loading="dataListLoading"
                :header-cell-style="getRowClass">
                <el-table-column type="index" header-align="center" align="center" width="80" label="序号">
                </el-table-column>
                <el-table-column prop="mchId" label=" 客户编号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="companyName" label=" 客户名称" align="center">
                </el-table-column>
                <el-table-column prop="statusName" label="代理商名称" align="center">
                </el-table-column>
                <el-table-column prop="consumeTime" label="消耗时间" align="center">
                </el-table-column>
                <el-table-column prop="consumeNumber" label="消耗条数" width="120" align="center">
                </el-table-column>
                <el-table-column prop="contact" label="联系人" width="120" align="center">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号" width="100" align="center">
                </el-table-column>

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
                consumeSearchData: {
                    dateTime: [],
                    agentName: "",
                    custName: '',
                },
                consumeTableData: [
                    {
                        mchId: '51254',
                        mobile: '17612163551',
                        companyName: '上海创蓝文化传播有限公司',
                        statusName: '******公司',
                        contact: '张三',
                        consumeTime: '2018.06.22 08:44  ',
                        consumeNumber: '1000',
                    },
                    {
                        mchId: '51254',
                        mobile: '17612163551',
                        companyName: '上海创蓝文化传播有限公司',
                        statusName: '******公司',
                        contact: '张三',
                        consumeTime: '2018.06.22 08:44  ',
                        consumeNumber: '5000 ',
                    }
                ],
            }
        },
        methods: {
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
                    if (column.property === 'consumeNumber') {
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

            // 获取退款记录接口

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
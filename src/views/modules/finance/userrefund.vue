<template>
    <div class="main">
        <div class="topSearch">
            <h2>客户退款记录</h2>
            <el-form :inline="true" :model="refundSearchData">
                <el-form-item label="创建时间：">
                    <el-date-picker v-model="refundSearchData.dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="代理商名称：" style="margin-left:5px;">
                    <el-input v-model="refundSearchData.agentName" placeholder="代理商名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="客户名称：" style="margin-left:-2px;">
                    <el-input v-model="refundSearchData.custName" placeholder="客户名称" clearable></el-input>
                </el-form-item>
                <el-form-item style="margin-left:6px">
                    <el-button type="primary">查询</el-button>
                    <el-button type="primary">导出</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="agentTable">
            <el-table :data="refundTableData" style="width: 100%" v-loading="dataListLoading" :header-cell-style="getRowClass">
                <el-table-column type="index" header-align="center" align="center" width="80" fixed label="序号">
                </el-table-column>
                <el-table-column prop="createTime" label="注册时间" align="center">
                </el-table-column>
                <el-table-column prop="mchId" label=" 客户编号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="companyName" label=" 客户名称" align="center">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号" width="100" align="center">
                </el-table-column>
                <el-table-column prop="statusName" label="代理名称" align="center">
                </el-table-column>
                <el-table-column prop="price" label="单价（元/条）" width="120" align="center">
                </el-table-column>
                <el-table-column prop="Number" label="条数" width="120" align="center">
                </el-table-column>
                <el-table-column prop="money" label="金额（元）" width="120" align="center">
                </el-table-column>
                <el-table-column fixed="right" label="备注" align="center" prop="desc">

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
                refundSearchData: {
                    dateTime: [],
                    agentName: "",
                    custName: '',
                },
                refundTableData: [
                    {
                        mchId: '51254',
                        mobile: '17612163551',
                        companyName: '上海创蓝文化传播有限公司',
                        statusName: '******公司',
                        createTime: '2018.06.22 08:44  ',
                        price: '1,000,000   ',
                        Number: '1,000,000   ',
                        money: '1,000,000   ',
                        desc: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注'
                    }
                ],
            }
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
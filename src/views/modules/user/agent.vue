<template>
    <div class="main">
        <div class="topSearch">
            <h2>OEM列表</h2>
            <el-form :inline="true" :model="searchData">
                <el-form-item label="创建时间：">
                    <el-date-picker v-model="searchData.dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="代理商名称：" style="margin-left:25px;">
                    <el-input v-model="searchData.agentName" placeholder="用户名" clearable></el-input>
                </el-form-item>
                <el-form-item label="代理商状态：" style="margin-left:-25px;">
                    <el-select v-model="searchData.status" placeholder="代理商状态">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="使用中" value="1"></el-option>
                        <el-option label="已禁用" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="exporTable">导出</el-button>
                    <el-button v-if="isAuth('sys:user:save')" type="primary" @click="addUpdateAgent()">新增代理商</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="agentTable">
            <el-table :data="agentTableData" style="width: 100%" :header-cell-style="getRowClass">
                <el-table-column fixed prop="agentId" label="序号" width="50" align="center">
                </el-table-column>
                <el-table-column prop="agentNumber" label="代理商编号" width="90" align="center">
                </el-table-column>
                <el-table-column prop="businNumber" label=" 商户编号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="companyName" label=" 代理商名称" width="165" align="center">
                </el-table-column>
                <el-table-column prop="statusName" label=" 代理商状态" width="90" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="日期" width="150" align="center">
                </el-table-column>
                <el-table-column prop="canUpgradeName" label="是否升级" width="80" align="center">
                </el-table-column>
                <el-table-column prop="levelName" label="代理等级" width="120" align="center">
                </el-table-column>
                <el-table-column prop="totalRechargeMoney" label="充值总计（元）" width="120" align="center">
                </el-table-column>
                <el-table-column prop="totalRechargeNumber" label="充值总条数" width="120" align="center">
                </el-table-column>
                <el-table-column prop="emptyBalance" label="剩余条数" width="120" align="center">
                </el-table-column>
                <el-table-column prop="emptyCreditNumber" label="允许超出条数" width="120" align="center">
                </el-table-column>
                <el-table-column prop="mobile" label="联系电话" width="120" align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="165" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small" @click="addUpdateAgent(1)">修改</el-button>
                        <el-button type="text" size="small">充值</el-button>
                        <el-button type="text" size="small">禁用</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="agentPage">
            <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <!-- 修改，查看，新增 -->
        <add-or-update v-if="addSeeUpdateVisible" ref="addOrUpdate"></add-or-update>
    </div>
</template>
<script>
    import AddOrUpdate from './agent-add-or-update'
    export default {
        data() {
            return {
                addSeeUpdateVisible: false,
                searchData: {
                    dateTime: "",
                    agentName: "",
                    status: "",
                },
                formInline: {
                    user: '',
                    region: ''
                },
                agentTableData: [],
                pageIndex: 1,
                pageSize: 3,
                totalPage: 0,
            }
        },
        components: {
            AddOrUpdate
        },
        activated() {
            this.getDataList()
        },
        methods: {
            // 获取代理商列表
            getDataList() {
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl(`agent/agentInfo/list?token=${this.$cookie.get('token')}`),
                    method: 'get',
                    params: this.$http.adornParams({
                        'currentPage': this.pageIndex,
                        'pageSize': this.pageSize,
                    })
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        console.log(data)
                        this.agentTableData = data.data.list
                        this.totalPage = data.data.total
                    } else {
                        this.agentTableData = []
                        this.totalPage = 0
                    }

                })
            },



            // 每页数
            sizeChangeHandle(val) {
                this.pageSize = val
                this.pageIndex = 1
                this.getDataList()
            },
            // 当前页
            currentChangeHandle(val) {
                this.pageIndex = val
                this.getDataList()
            },
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background-color: #f8f8f8;color:#666;'
                } else {
                    return ''
                }
            },
            onSubmit() {
                console.log('submit!');
            },
            exporTable() {

            },
            addUpdateAgent(id) {
                this.addSeeUpdateVisible = true
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.showInit(id)
                })
            },
            // 查看
            // handleClick(row) {

            // }
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

    .agentTable {
        width: 100%;
        padding: 20px 23px 10px;
        background-color: #fff;
        /* margin-bottom: 24px; */
        box-shadow: 0px 7px 9px 0px rgba(153, 153, 153, 0.05);
    }

    .agentPage {
        width: 100%;
        padding: 20px 23px 10px;
        background-color: #fff;
    }
</style>
<template>
    <div class="main">
        <div class="topSearch">
            <h2>OEM代理商设置</h2>
            <el-form :inline="true" :model="searchData">
                <el-form-item label="创建时间：">
                    <el-date-picker v-model="searchData.dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="代理商名称：" style="margin-left:5px;">
                    <el-input v-model="searchData.agentName" placeholder="代理商名称" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="userTable">
            <el-table :data="dataList" style="width: 100%">
                <el-table-column type="index" header-align="center" align="center" width="50" fixed label="序号">
                </el-table-column>
                <el-table-column prop="daiId" label=" 代理商序号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="mchId" label=" 客户编号" width="70" align="center">
                </el-table-column>
                <el-table-column prop="mchname" label=" 代理商名称" width="80" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center">
                </el-table-column>
                <el-table-column prop="logo" label="LOGO" align="center">
                </el-table-column>
                <el-table-column prop="icon" label="ICON" align="center">
                </el-table-column>
                <el-table-column prop="duanxin" label="短信签名" align="center">
                </el-table-column>
                <el-table-column prop="dayuming" label="代理商域名" align="center">
                </el-table-column>
                <el-table-column prop="beian" label="域名备案信息" align="center">
                </el-table-column>
                <el-table-column prop="kefy" label="客服资料" align="center">
                </el-table-column>
                <el-table-column prop="zbInfo" label="支付宝资料" align="center">
                </el-table-column>
                <el-table-column prop="weiinfo" label="支付宝资料" align="center">
                </el-table-column>
                <el-table-column prop="ht" label="合同信息" align="center">
                </el-table-column>
                <el-table-column prop="qianzi" label="代理商签字" align="center">
                </el-table-column>
                <el-table-column prop="gz" label="公章" align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">修改</el-button>
                        <el-button type="text" size="small" @click="seetingDialog(scope.row)">设置</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="sizeChangeHandle"
                @current-change="currentChangeHandle"
                :current-page="dataForm.page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="dataForm.size"
                :total="totalPage"
                layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>

        </div>
        <!-- 设置 -->
        <agent-setting-dialog v-if="agentSettingDialogVisible" ref="agentSettingDialog" @seetingData="seetingData"></agent-setting-dialog>
    </div>
</template>

<script>
    import AgentSettingDialog from './agent-setting-dialog.vue'

    export default {
        data() {
            return {
                searchData: {
                    dateTime: [],
                    agentName: "",
                    custType: "",
                    custName: '',
                    mobile: ""
                },
                dataForm:{
                    page: 1,
                    size: 10,
                },
                totalPage: null,
                dataList:[],
                agentSettingDialogVisible:false,
            }
        },
        components:{
            AgentSettingDialog
        },
        activated() {
            this.getDataList();
        },
        methods:{
            // 获取数据列表
            getDataList() {
                this.dataListLoading = true;
                this.$http({
                    url: this.$http.adornUrl("agent/agentInfo/list"),
                    method: "get",
                    params: this.$http.adornParams(this.dataForm)
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        console.log(data.data)
                        this.dataList = data.data.list;
                        this.totalPage = data.data.total;
                    } else {
                        this.dataList = [];
                        this.totaloage = 0;
                    }
                    this.dataListLoading = false;
                });
            },
            seetingDialog(e){
                this.agentSettingDialogVisible = true
                this.$nextTick(() =>{
                    this.$refs.agentSettingDialog.init(e)
                })
            },
            seetingData(){
                console.log('seetingData  ')
            },
            // 每页数
            sizeChangeHandle(val) {
                this.dataForm.size = val;
                this.dataForm.page = 1;
                this.getDataList();
            },
            // 当前页
            currentChangeHandle(val) {
                this.dataForm.page = val;
                this.page = val;
                this.getDataList();
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

    .el-table .cell {
        /* word-break:break-all; */
        white-space: pre-wrap;
    }
</style>
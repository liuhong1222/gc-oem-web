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
            <el-table :data="userTableData" style="width: 100%">
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
                        <el-button type="text" size="small">设置</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
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
                userTableData: [
                    {
                        mchId: '51254',
                        daiId: '525125',
                        mchname: '上海创蓝文化传播有限公司 ',
                        createTime: '2018.06.22 08:44  ',
                        logo: 'LOGO.PNG',
                        icon: 'ICON.PNG',
                        duanxin: '[]',
                        dayuming: 'www.253.com',
                        beian: '返回就是的好烦看电视播放',
                        kefy: '客服热线：400-200-000,<br> 客服热线：400-200-000',
                        zbInfo: '支付调用地址：此处为支付调用地址',
                        weiinfo: '微信调用地址：此处为支付调用地址',
                        ht: '名称',
                        qianzi: 'qianzi.png',
                        gz: 'gz.png'
                    }
                ],
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

    .el-table .cell {
        /* word-break:break-all; */
        white-space: pre-wrap;
    }
</style>
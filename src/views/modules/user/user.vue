<template>
  <div class="main">
    <div class="topSearch">
      <h2>客户列表</h2>
      <el-form :inline="true" :model="searchData">
        <el-form-item label="创建时间：">
          <el-date-picker v-model="searchData.dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号：" style="margin-left:25px;">
          <el-input v-model="searchData.mobile" placeholder="手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户类型：" style="margin-left:-25px;">
          <el-select v-model="searchData.custType" placeholder="客户类型">
            <el-option label="全部" value="0"></el-option>
            <el-option label="个人" value="1"></el-option>
            <el-option label="企业" value="2"></el-option>
            <el-option label="其他" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称：" style="margin-left:0px;">
          <el-input v-model="searchData.custName" placeholder="客户名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="代理商名称：">
          <el-input v-model="searchData.agentName" placeholder="代理商名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button type="primary">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="agentTable">
      <el-table :data="userTableData" style="width: 100%" :header-cell-style="getRowClass">
        <el-table-column type="index" header-align="center" align="center" width="80" fixed label="序号">
        </el-table-column>
        <el-table-column prop="mchId" label=" 客户编号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="100" align="center">
        </el-table-column>
        <el-table-column prop="userType" label="客户类型" width="90" align="center">
        </el-table-column>
        <el-table-column prop="companyName" label=" 客户名称" align="center">
        </el-table-column>
        <el-table-column prop="statusName" label=" 代理商" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" align="center">
        </el-table-column>
        <el-table-column prop="totalRechargeMoney" label="充值总计（元）" width="120" align="center">
        </el-table-column>
        <el-table-column prop="totalRechargeNumber" label="充值总条数" width="120" align="center">
        </el-table-column>
        <el-table-column prop="emptyBalance" label="剩余条数" width="120" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="perPriseSee()" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="perEnterEditBtn()">修改</el-button>
            <el-button type="text" size="small" @click="rechargedataBtn()">充值</el-button>
            <el-button type="text" size="small" @click="refundBtn()">退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="agentPage">
      <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[3, 5]"
        :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

    <!-- 个人，企业修改 -->
    <per-edit-enterise v-if="updateVisible" ref="updatecon"></per-edit-enterise>
    <!-- 个人，企业查看 -->
    <per-see-enterprise v-if="seeVisible" ref="seecon"></per-see-enterprise>
    <!-- 个人，企业充值 -->
    <per-recharge-prise v-if="chargeVisible" ref="rechargecon"></per-recharge-prise>
    <!-- 个人，企业退款 -->
    <per-refund-prise v-if="refundVisible" ref="refundcon"></per-refund-prise>
  </div>
</template>
<script>
  import perEditEnterise from './user-per-edit-enterise'
  import perSeeEnterprise from './user-per-see-enterprise'
  import perRechargePrise from './user-per-recharge-prise'
  import perRefundPrise from './user-per-refund-prise'
  export default {
    data() {
      return {
        seeVisible: false,
        updateVisible: false,
        chargeVisible: false,
        refundVisible: false,
        arr: [1, 2],  //保存点击的id和区分个人和企业的id
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
            mobile: '17612163551',
            userType: '个人',
            companyName: '上海创蓝文化传播有限公司',
            statusName: '******公司',
            createTime: '2018.06.22 08:44  ',
            totalRechargeMoney: '1,000,000   ',
            totalRechargeNumber: '1,000,000   ',
            emptyBalance: '1,000,000   ',
          }
        ],
        pageIndex: 1,
        pageSize: 3,
        totalPage: 100,
      }
    },
    components: {
      perEditEnterise,
      perSeeEnterprise,
      perRechargePrise,
      perRefundPrise
    },
    methods: {
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background-color: #f8f8f8;color:#666;'
        } else {
          return ''
        }
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
      // 修改个人、企业
      perEnterEditBtn() {
        let arr = this.arr; //传id和当前修改的是企业还是个人
        this.updateVisible = true
        this.$nextTick(() => {
          this.$refs.updatecon.updateInit(arr)
        })
      },
      // 查看个人、企业
      perPriseSee() {
        let arr = this.arr; //传id和当前修改的是企业还是个人
        this.seeVisible = true
        this.$nextTick(() => {
          this.$refs.seecon.seeInit(arr)
        })
      },
      // 充值个人，企业
      rechargedataBtn() {
        let arr = this.arr; //传id和当前修改的是企业还是个人
        this.chargeVisible = true
        this.$nextTick(() => {
          this.$refs.rechargecon.rechargeInit(arr)
        })
      },
      // 退款 个人，企业
      refundBtn() {
        let arr = this.arr; //传id和当前修改的是企业还是个人
        this.refundVisible = true
        this.$nextTick(() => {
          this.$refs.refundcon.refundInit(arr)
        })
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
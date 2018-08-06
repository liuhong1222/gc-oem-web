<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-select clearable style="width: 130px" class="filter-item" v-model="select" placeholder="归属公司" @change="chooseSelect">
          <el-option v-for="item in allList" :key="item.message" :label="item.message" :value="item.message" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input style="width:230px" v-model="inputDisabledValue" :placeholder="allListMessage"  @change="inputDisabledValueFn" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleFilter">查询</el-button>
        <!-- <el-button v-if="isAuth('biz:customer:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button> -->
        <!-- <el-button v-if="isAuth('biz:customer:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      v-loading="dataListLoading"
      @filter-change="filterChange"
      :header-cell-class-name="tableheaderClassName"
      @sort-change="changeData"
      style="width: 100%;height:100%">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        fixed
        width="60">
      </el-table-column>
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="80"
        fixed
        label="序号">
      </el-table-column>
      <el-table-column
        prop="companyName"
        width="180"
        fixed
        header-align="center"
        align="center"
        label="归属公司">
      </el-table-column> 
      <el-table-column
         prop="accountUsername"
         header-align="center"
         align="center"
         width="160"
         label="手机号">
      </el-table-column>
      <el-table-column
         prop="balance"
         header-align="center"
         align="center"
         width="100"
         label="余额">
      </el-table-column>
      <el-table-column
        prop="userName"
        header-align="center"
        align="center"
        width="100"
        label="负责人">
      </el-table-column>
      <el-table-column
        prop="pinName"
        header-align="center"
        align="center"
        width="100"
        label="销售负责人">
      </el-table-column>
      <el-table-column
        prop="serviceName"
        header-align="center"
        align="center"
        width="100"
        label="	运维负责人">
      </el-table-column>
      <el-table-column
         prop="createDate"
         header-align="center"
         align="center"
         width="200"
         sortable
         ref="createDate"
         label="创建时间">
      </el-table-column>            
      <!-- <el-table-column
         prop="balanceYuan"
         header-align="center"
         align="center"
         width="220"
         label="备注">
      </el-table-column> -->
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="350"
        label="操作">
        <template slot-scope="scope">
          <el-dropdown @command="enterAccount(scope.row)">
            <el-button size="mini">
                入账<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item>预付</el-dropdown-item>
              <el-dropdown-item>应急充值</el-dropdown-item>
              <el-dropdown-item>测试赠送</el-dropdown-item>
              <el-dropdown-item>失败返还</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        <el-dropdown @command="expenditureAccount(scope.row)">
            <el-button size="mini">
                出账<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item>退款申请</el-dropdown-item>
              <el-dropdown-item>应急还款</el-dropdown-item>
              <el-dropdown-item>额度扣除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="accountConfig(scope.row)">
            <el-button size="mini">
                配置<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item>改价</el-dropdown-item>
              <!-- <el-dropdown-item>业务配置</el-dropdown-item>
              <el-dropdown-item>合同管理</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-button v-if="isAuth('biz:customer:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.accountId)">修改</el-button> -->
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
    <!-- 入账 -->
    <account-enter v-if="accountEnterVisible" ref="accountEnter" ></account-enter>
    <!-- 应急充值 -->
    <account-emergency v-if="accountEmergencyVisible" ref="accountEmergency"></account-emergency>
    <!-- 测试赠送 -->
    <account-test-gift  v-if="accountTestGiftVisible"  ref="accountTestGift"></account-test-gift>
    <!-- 失败返还 -->
    <account-failure-return  v-if="accountFailureReturnVisible" ref="accountFailureReturn"></account-failure-return>
    <!-- 退款申请 -->
    <account-application-drawback v-if="accountApplicationDrawbackVisible" ref="accountApplicationDrawback"></account-application-drawback>
    <!-- 应急还款 -->
    <account-emergency-cancellation v-if="accountEmergencyCancellationVisible" ref="accountEmergencyCancellation"></account-emergency-cancellation>
    <!-- 额度扣除 -->
    <account-quota-deduction v-if="accountQuotaDeductionVisible" ref="accountQuotaDeduction"></account-quota-deduction>
    <!-- 改价 -->
    <account-price-change v-if="accountPriceChangeVisible" ref="accountPriceChange"></account-price-change>
  </div>

</template>

<script>
import AccountEnter from "./accounts/enter-accounts/account-enter.vue";
import AccountEmergency from "./accounts/enter-accounts/account-emergency.vue";
import AccountTestGift from "./accounts/enter-accounts/account-test-give.vue";
import AccountFailureReturn from "./accounts/enter-accounts/account-failure-return.vue";

import AccountApplicationDrawback from "./accounts/expenditure-accounts/account-application-drawback.vue";
import AccountEmergencyCancellation from "./accounts/expenditure-accounts/account-emergency-cancellation.vue";
import AccountQuotaDeduction from "./accounts/expenditure-accounts/account-quota-deduction.vue";

import AccountPriceChange from "./accounts/configure/account-price-change.vue";

export default {
  data() {
    return {
      dataForm: {
        page: 1,
        size: 10,
        username: undefined, //负责人姓名
        companyName: undefined, //归属公司
        phone: undefined, //	手机号
        orders: undefined
      },
      pageIndex: 1,
      dataList: [],
      allList: [
        { value: "accountId", message: "ID" },
        { value: "dutyMan", message: "负责人" },
        { value: "companyName", message: "归属公司" },
        { value: "phone", message: "手机号" }
      ],
      totalPage: undefined,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      accountEnterVisible: false,
      accountEmergencyVisible: false,
      accountTestGiftVisible: false,
      accountFailureReturnVisible: false,
      accountApplicationDrawbackVisible: false,
      accountEmergencyCancellationVisible: false,
      accountQuotaDeductionVisible: false,
      accountPriceChangeVisible: false,
      inputDisabledValue: "",
      paramsOneName: "",
      allListMessage: "归属公司",
      select: "归属公司"
    };
  },
  components: {
    AccountEnter,
    AccountEmergency,
    AccountTestGift,
    AccountFailureReturn,
    AccountApplicationDrawback,
    AccountEmergencyCancellation,
    AccountQuotaDeduction,
    AccountPriceChange
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      
      this.$http({
        url: this.$http.adornUrl("/biz/account/list"),
        method: "get",
        params: this.$http.adornParams(this.dataForm)
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.dataForm.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    //
    chooseSelect(message) {
      let text = message;
      let textA = this.$data.allList;
      textA.forEach(element => {
        let { message, value } = element;
        if (message == text) {
          this.dataForm = {
            page: 1,
            size: 10
          };
          this.paramsOneName = value;
        }
      });
      this.inputDisabledValue = "";
      this.dataForm = {
        page: 1,
        size: 10
      };
      return (this.allListMessage = text);
    },
    //获取input里的值
    inputDisabledValueFn(e) {
      if (this.paramsOneName === "") {
        this.paramsOneName = "companyName";
        this.dataForm.companyName = this.inputDisabledValue;
      } else if (this.paramsOneName === "companyName") {
        //公司名称
        this.dataForm.companyName = this.inputDisabledValue;
      } else if (this.paramsOneName === "phone") {
        //手机号
        this.dataForm.phone = this.inputDisabledValue;
      } else if (this.paramsOneName === "dutyMan") {
        //负责人
        this.dataForm.dutyMan = this.inputDisabledValue;
      } else if (this.paramsOneName === "accountId") {
        //id
        this.dataForm.accountId = this.inputDisabledValue;
      }
    },
    //查询
    handleFilter() {
      if (this.inputDisabledValue) {
        this.dataForm.page = 1
        this.dataForm.size = 10
        this.getDataList();
      } else {
        this.dataForm.companyName = null;
        this.dataForm.page = 1
        this.dataForm.size = 10
        this.getDataList();
      }
    },
    filterChange(e) {
      // console.log(e);
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
      this.getDataList();
    },
    //changeData
    changeData({ order, prop }) {
      // console.log(order,prop)// descending 递减    ascending 递增     prop 要排序的列的名字
      if (order === "descending") {
        this.dataForm.ascFlg = false;
        this.dataForm.orderCol = prop;
        this.getDataList();
      } else if (order === "ascending") {
        this.dataForm.ascFlg = true;
        this.dataForm.orderCol = prop;
        this.getDataList();
      } else {
        this.dataForm.ascFlg = null;
        this.dataForm.orderCol = null;
        this.getDataList();
      }
    },
    enterAccount(e) {
      let text = event.currentTarget.innerHTML;
      let accountId = e.accountId;
      if (text === "预付") {
        this.accountEnterVisible = true;
        this.$nextTick(() => {
          this.$refs.accountEnter.init(accountId, text);
        });
      } else if (text === "应急充值") {
        this.accountEmergencyVisible = true;
        this.$nextTick(() => {
          // this.$refs.accountEmergency.init(accountId, text);
          this.$refs.accountEmergency.init(e);
        });
      } else if (text === "测试赠送") {
        this.accountTestGiftVisible = true;
        this.$nextTick(() => {
          this.$refs.accountTestGift.init(accountId, text);
        });
      } else if (text === "失败返还") {
        this.accountFailureReturnVisible = true;
        this.$nextTick(() => {
          // this.$refs.accountFailureReturn.init(accountId, text);
          this.$refs.accountFailureReturn.init(e);
        });
      }
    },
    expenditureAccount(e) {
      let text = event.currentTarget.innerHTML;
      let accountId = e.accountId;
      if (text === "退款申请") {
        this.accountApplicationDrawbackVisible = true;
        this.$nextTick(() => {
          this.$refs.accountApplicationDrawback.init(e);
        });
      } else if (text === "应急还款") {
        this.accountEmergencyCancellationVisible = true;
        this.$nextTick(() => {
          this.$refs.accountEmergencyCancellation.init(e);
        });
      } else if (text === "额度扣除") {
        this.accountQuotaDeductionVisible = true;
        this.$nextTick(() => {
          this.$refs.accountQuotaDeduction.init(e);
        });
      }
    },
    accountConfig(e) {
      let text = event.currentTarget.innerHTML;
      let accountId = e.accountId;
      if (text === "改价") {
        this.accountPriceChangeVisible = true;
        this.$nextTick(() => {
          this.$refs.accountPriceChange.init(e);
        });
      }
    },

    // 新增 / 修改
    // addOrUpdateHandle (id) {
    //   this.addOrUpdateVisible = true
    //   this.$nextTick(() => {
    //     this.$refs.addOrUpdate.init(id)
    //   })
    // },
    // 删除
    // deleteHandle (id) {
    //   var ids = id ? [id] : this.dataListSelections.map(item => {
    //     return item.id
    //   })
    //   this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //       this.$http({
    //           url: this.$http.adornUrl('/biz/customer/delete'),
    //           method: 'post',
    //           data: this.$http.adornData(ids, false)
    //         }).then(({data}) => {
    //           if (data && data.code === 0) {
    //           this.$message({
    //             message: '操作成功',
    //             type: 'success',
    //             duration: 1500,
    //             onClose: () => {
    //             this.getDataList()
    //         }
    //         })
    //         } else {
    //           this.$message.error(data.msg)
    //         }
    //       })
    //   }).catch(() => {})
    // },
    //table th
    tableheaderClassName({ row, rowIndex }) {
      return "table-head-th";
    }
  }
};
</script>


<style scoped>
h4 {
  display: inline-block;
}
span {
  padding: 0 15px;
}
.account-selecet {
  width: 100px;
}
</style>


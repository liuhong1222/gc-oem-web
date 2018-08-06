<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-select clearable style="width: 130px" class="filter-item" v-model="select" placeholder="全部" @change="chooseSelect">
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
        prop="customerName"
        header-align="center"
        align="center"
        fixed
        width="180"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="orderNo"
        header-align="center"
        width="140"
        align="center"
        label="订单编号">
      </el-table-column>
      <el-table-column
         prop="accountPhone"
         header-align="center"
         align="center"
         width="110"
         label="万数账号">
      </el-table-column>
      <el-table-column
        prop="preMoney"
        align="center"
        header-align="center"
        label="充值金额"
        width="100"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="discountMoney"
        width="100"
        header-align="center"
        align="center"
        sortable
        label="优惠金额">
      </el-table-column>
      <el-table-column
        prop="actualMoney"
        header-align="center"
        align="center"
        width="100"
        sortable
        label="实付金额">
      </el-table-column>
      <el-table-column
        prop="orderNo"
        header-align="center"
        align="center"
        width="160"
        label="订单流水号">
      </el-table-column>
      <el-table-column
        prop="payMode"
        header-align="center"
        align="center"
        width="100"
        :formatter="formDataPayMode"
        label="支付方式">
      </el-table-column>
      <el-table-column
        prop="auditStatus"
        header-align="center"
        align="center"
        width="80"
        :formatter="formAuditStatus"
        label="支付状态">
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="140"
        header-align="center"
        align="center"
        sortable
        label="订单时间">
      </el-table-column>
      <el-table-column
        prop="payedDate"
        width="140"
        header-align="center"
        align="center"
        sortable
        label="到账时间 ">
      </el-table-column>
      <el-table-column
        prop="dutyManName"
        width="100"
        header-align="center"
        align="center"
        label="负责人">
      </el-table-column>
      <el-table-column
        prop="auditUserName"
        width="100"
        header-align="center"
        align="center"
        label="审核人">
      </el-table-column>
      <el-table-column
        prop="auditMark"
        width="140"
        header-align="center"
        align="center"
        label="审核备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        min-width="160"
        label="操作">
        <template slot-scope="scope">
          <!-- 只有待审核的才能 撤回 -->
            <el-button v-if="scope.row.auditStatus  == 1  " @click="advanceRecall(scope.row)">撤回</el-button>
          <!-- <el-button @click="deleteHandle(scope.row.id)">撤回</el-button> -->
        </template>
      </el-table-column>
      <!-- <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('biz:customer:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button v-if="isAuth('biz:customer:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>  -->
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

  <!-- 撤回 -->
  <recharge-recall v-if="accountEmergencyVisible" ref="accountEmergency" @refreshDataList="getDataList"></recharge-recall>


  </div>

</template>

<script>
import RechargeRecall from "./recharge-recall";

export default {
  data() {
    return {
      dataForm: {
        page: 1,
        size: 10,
        id: undefined, //订单ID
        orderNo: undefined, //订单编号
        accountPhone: undefined, //万数账号
        customerName: undefined //公司名称
      },
      accountEnterVisible: false,
      pageIndex: 1,
      dataList: [],
      accountEmergencyVisible: false,
      allList: [
        { value: "allQuery", message: "全部" },
        // { value: "id", message: "ID" },
        { value: "dutyManName", message: "负责人" },
        { value: "customerName", message: "公司名称" },
        { value: "orderNo", message: "订单编号" },
        { value: "accountPhone", message: "万数账号" }
      ],
      totalPage: undefined,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      inputDisabledValue: "",
      paramsOneName: "",
      allListMessage: "全部",
      select: "全部",
      payModes: []
    };
  },
  components: {
    RechargeRecall
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      
      this.$http({
        url: this.$http.adornUrl("/biz/bizprepayorder/list"),
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
        this.paramsOneName = "allQuery";
        this.dataForm.allQuery = this.inputDisabledValue;
      } else if (this.paramsOneName === "allQuery") {
        //全部
        this.dataForm.allQuery = this.inputDisabledValue;
      } else if (this.paramsOneName === "customerName") {
        //公司名称
        this.dataForm.customerName = this.inputDisabledValue;
      } else if (this.paramsOneName === "accountPhone") {
        //万数账号
        this.dataForm.accountPhone = this.inputDisabledValue;
      } else if (this.paramsOneName === "orderNo") {
        //订单编号
        this.dataForm.orderNo = this.inputDisabledValue;
      } else if (this.paramsOneName === "dutyManName") {
        //负责人
        this.dataForm.dutyManName = this.inputDisabledValue;
      } else if (this.paramsOneName === "id") {
        //id
        this.dataForm.id = this.inputDisabledValue;
      }
    },
    //查询
    handleFilter() {
      if (this.inputDisabledValue) {
        this.dataForm.size = 10;
        this.dataForm.page = 1;
        this.getDataList();
      } else {
        this.dataForm.allQuery = null;
        this.dataForm.size = 10;
        this.dataForm.page = 1;
        this.getDataList();
      }
    },
    filterChange(e) {
      // console.log(e);
    },
    //表格筛选
    filterTag(value, row) {
      return row.joinStatus === value;
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
    formAuditStatus(row, column) {
      switch (row.auditStatus) {
        case 1:
          return "待审核";
          break;

        case 2:
          return "已通过";
          break;

        case 3:
          return "已驳回";
          break;

        case 4:
          return "已支付";
          break;

        default:
          return "";
      }
    },
    formDataPayMode(row, column) {
      switch (row.payMode) {
        case 1:
          return "农业银行";
          break;

        case 3:
          return "招商银行";
          break;

        case 4:
          return "建设银行";
          break;

        case 5:
          return "创蓝对公支付宝";
          break;

        case 25:
          return "代理商代付";
          break;

        case 111:
          return "退款转产品";
          break;

        case 112:
          return "现金";
          break;

        default:
          return "";
      }
    },

    // 撤回
    advanceRecall(e) {
      this.accountEmergencyVisible = true;
      this.$nextTick(() => {
        this.$refs.accountEmergency.init(e, "advance");
      });
    },

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
</style>


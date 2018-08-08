<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-select clearable style="width: 130px" class="filter-item" v-model="select" placeholder="全部" @change="chooseSelect">
          <el-option v-for="item in allList" :key="item.message" :label="item.message" :value="item.message">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input style="width:230px" v-model="inputDisabledValue" :placeholder="allListMessage" @change="inputDisabledValueFn" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleFilter">查询</el-button>
        <!-- <el-button v-if="isAuth('biz:customer:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button> -->
        <!-- <el-button v-if="isAuth('biz:customer:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="dataList" v-loading="dataListLoading" @filter-change="filterChange" :header-cell-class-name="tableheaderClassName"
      @sort-change="changeData" style="width: 100%;height:100%">
      <el-table-column type="selection" header-align="center" align="center" fixed width="60">
      </el-table-column>
      <el-table-column type="index" header-align="center" align="center" width="80" fixed label="序号">
      </el-table-column>
      <el-table-column prop="companyName" header-align="center" align="center" fixed width="140" label="公司名称">
      </el-table-column>
      <el-table-column prop="orderNo" header-align="center" width="140" align="center" label="订单编号">
      </el-table-column>
      <!-- <el-table-column
         header-align="center"
         align="center"
         width="120"
         label="产品名称">
        <template slot-scope="scope">
          <p>
             创蓝万数
          </p>
        </template>
      </el-table-column> -->
      <el-table-column prop="accountPhone" header-align="center" align="center" width="110" label="万数账号">
      </el-table-column>
      <el-table-column label="订单类型" align="center" header-align="center" prop="orderTypeName">
      </el-table-column>
      <el-table-column prop="preMoney" header-align="center" align="center" width="100" sortable label="充值金额">
      </el-table-column>
      <el-table-column prop="discountMoney" header-align="center" align="center" width="120" sortable label="优惠金额">
      </el-table-column>
      <el-table-column prop="actualMoney" header-align="center" align="center" width="120" sortable label="实付金额">
      </el-table-column>
      <el-table-column prop="tradeNo" width="140" header-align="center" align="center" label="订单流水号">
      </el-table-column>
      <el-table-column prop="bankNo" header-align="center" align="center" label="支付方式" :formatter="forBankNo" width="100" :column-key="'keyValue'">
      </el-table-column>
      <el-table-column prop="auditStatus" width="100" header-align="center" align="center" :formatter="forAuditStatus" label="支付状态">
      </el-table-column>
      <el-table-column prop="createTime" header-align="center" align="center" width="140" label="订单时间">
      </el-table-column>
      <el-table-column prop="auditDate" header-align="center" align="center" width="140" label="到账时间">
        <template slot-scope="scope">
          <div v-if="scope.row.auditStatus == 3" style="color:red;"></div>
          <div v-if="scope.row.auditStatus !== 3">{{scope.row.auditDate}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="dutyManName" header-align="center" align="center" width="80" label="负责人">
      </el-table-column>
      <el-table-column prop="auditUserName" width="80" header-align="center" align="center" fixed="right" label="审核人">
      </el-table-column>
      <el-table-column prop="auditMark" width="140" header-align="center" align="center" fixed="right" label="审核备注">
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
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="dataForm.page" :page-sizes="[10, 20, 50, 100]"
      :page-size="dataForm.size" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <!-- <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update> -->
  </div>

</template>

<script>
  import AddOrUpdate from "../customer-edit";
  export default {
    data() {
      return {
        dataForm: {
          page: 1,
          size: 10,
          id: null, //订单ID
          orderNo: null, //订单编号
          companyName: null, //公司名称
          accountPhone: null, //账户手机号
          ascFlg: null,
          orderStatus: null,
          orderCol: null,
          allQuery: null
        },
        pageIndex: 1,
        dataList: [],
        allList: [
          { value: "allQuery", message: "全部" },
          { value: "id", message: "订单ID	" },
          { value: "orderNo", message: "订单编号" },
          // { value: "dutyManName", message: "负责人" },
          { value: "companyName", message: "公司名称" },
          { value: "accountPhone", message: "万数账号" }
        ],
        totalPage: undefined,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        inputDisabledValue: "",
        paramsOneName: "",
        allListMessage: "全部",
        select: "全部"
      };
    },
    components: {
      AddOrUpdate
    },
    activated() {
      this.getDataList();
    },
    methods: {
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true;

        this.$http({
          url: this.$http.adornUrl("/biz/incomeorder/list"),
          method: "get",
          params: this.$http.adornParams(this.dataForm)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataList = data.page.records;
            this.totalPage = data.page.total;
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
        } else if (this.paramsOneName === "id") {
          //订单ID
          this.dataForm.id = this.inputDisabledValue;
        } else if (this.paramsOneName === "orderNo") {
          //订单编号
          this.dataForm.orderNo = this.inputDisabledValue;
        } else if (this.paramsOneName === "dutyManName") {
          //负责人
          this.dataForm.dutyManName = this.inputDisabledValue;
        } else if (this.paramsOneName === "accountPhone") {
          //万数账号
          this.dataForm.accountPhone = this.inputDisabledValue;
        } else if (this.paramsOneName === "companyName") {
          this.dataForm.companyName = this.inputDisabledValue;
        }
      },
      //查询
      handleFilter() {
        if (this.inputDisabledValue) {
          this.dataForm.page = 1;
          this.dataForm.size = 10;
          this.getDataList();
        } else {
          this.dataForm.allQuery = null;
          this.dataForm.page = 1;
          this.dataForm.size = 10;
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
      //changeData
      changeData({ order, prop }) {
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

      forBankNo(row, column) {
        switch (row.bankNo) {
          case 1:
            return "创蓝对公农行";
            break;

          case 3:
            return "创蓝对公招行";
            break;

          case 4:
            return "创蓝对公建行";
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
      forAuditStatus(row, column) {
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
</style>
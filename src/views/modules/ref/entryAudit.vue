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
      :row-style="rowClass" @sort-change="changeData" style="width: 100%;height:100%">
      <el-table-column type="selection" header-align="center" align="center" fixed width="60">
      </el-table-column>
      <el-table-column type="index" header-align="center" align="center" width="80" fixed label="序号">
      </el-table-column>
      <el-table-column prop="companyName" width="180" fixed header-align="center" align="center" label="公司名称">
      </el-table-column>
      <el-table-column prop="accountPhone" header-align="center" align="center" width="160" label="万数账号">
      </el-table-column>
      <el-table-column prop="preMoney" header-align="center" align="center" width="100" sortable label="所涉金额">
      </el-table-column>
      <el-table-column prop="discountMoney" header-align="center" align="center" sortable width="100" label="优惠金额">
      </el-table-column>
      <el-table-column prop="actualMoney" header-align="center" align="center" width="100" sortable label="实付金额">
      </el-table-column>
      <el-table-column prop="bankNo" header-align="center" align="center" width="100" :formatter="formBankNo" label="所涉银行">
      </el-table-column>
      <el-table-column prop="orderTypeName" header-align="center" align="center" width="100" label="类型">
      </el-table-column>
      <!-- <el-table-column
         prop="createDate"
         header-align="center"
         align="center"
         width="100"
         label="是否首冲">
      </el-table-column> -->
      <el-table-column prop="createTime" header-align="center" align="center" width="140" sortable label="申请时间">
      </el-table-column>
      <el-table-column prop="createUserName" header-align="center" align="center" width="100" label="申请人">
      </el-table-column>
      <!-- <el-table-column
         prop="balanceYuan"
         header-align="center"
         align="center"
         width="220"
         label="备注">
      </el-table-column> -->
      <el-table-column fixed="right" header-align="center" align="center" width="350" label="操作">
        <template slot-scope="scope">
          <el-button @click="passOrderStatus(scope.row,'success')">通过</el-button>
          <el-button @click="passOrderStatus(scope.row,'error')">驳回</el-button>
          <!-- <el-button v-if="isAuth('biz:customer:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.accountId)">修改</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="dataForm.page" :page-sizes="[10, 20, 50, 100]"
      :page-size="dataForm.size" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

    <!-- 编辑 -->
    <account-emergency v-if="accountEmergencyVisible" ref="accountEmergency" @refreshDataList="getDataList"></account-emergency>

  </div>

</template>

<script>
  import AccountEmergency from "./entryAudit-pass-or-die";
  export default {
    data() {
      return {
        dataForm: {
          page: 1,
          size: 10,
          username: undefined, //负责人姓名
          companyName: undefined, //公司名称
          phone: undefined, //	手机号
          orderStatus: "1"
        },
        pageIndex: 1,
        dataList: [],
        allList: [
          { value: "allQuery", message: "全部" },
          { value: "id", message: "ID" },
          // { value: "dutyMan", message: "负责人" },
          { value: "companyName", message: "公司名称" },
          // { value: "orderNo", message: "订单编号" },
          { value: "accountPhone", message: "万数账号" }
        ],
        totalPage: undefined,
        dataListLoading: false,
        dataListSelections: [],
        accountEmergencyVisible: false,
        inputDisabledValue: "",
        paramsOneName: "",
        allListMessage: "全部",
        select: "全部"
      };
    },
    components: {
      AccountEmergency
    },
    activated() {
      this.getDataList();
    },
    methods: {
      rowClass(row, index) {
        // if(row.row.accountId === 13996){
        //   return { "color": "red" }
        // }
      },
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
        } else if (this.paramsOneName === "companyName") {
          //公司名称
          this.dataForm.companyName = this.inputDisabledValue;
        } else if (this.paramsOneName === "accountPhone") {
          //万数账号
          this.dataForm.accountPhone = this.inputDisabledValue;
        } else if (this.paramsOneName === "orderNo") {
          //订单编号
          this.dataForm.orderNo = this.inputDisabledValue;
        } else if (this.paramsOneName === "dutyMan") {
          //负责人
          this.dataForm.dutyMan = this.inputDisabledValue;
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
          this.dataForm.orderStatus = 1;
          this.getDataList();
        } else {
          this.dataForm.allQuery = null;
          this.dataForm.size = 10;
          this.dataForm.page = 1;
          this.dataForm.orderStatus = 1;
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
      passOrderStatus(e, text) {
        this.accountEmergencyVisible = true;
        this.$nextTick(() => {
          this.$refs.accountEmergency.init(e, text);
        });
      },

      formBankNo(row, column) {
        switch (row.bankNo) {
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
            return "对公支付宝";
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
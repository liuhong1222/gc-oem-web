<template>
  <el-dialog
   title="改价"
    :close-on-click-modal="false"
    @close='closeDialog' 
    :visible.sync="visible">
    <div class="mod-user">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-select clearable style="width: 130px" class="filter-item" v-model="select" placeholder="产品名称" @change="chooseSelect">
            <el-option v-for="item in allList" :key="item.message" :label="item.message" :value="item.message" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input style="width:230px" v-model="inputDisabledValue" :placeholder="allListMessage"  @change="inputDisabledValueFn" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="changePrice" :disabled="changePriceDisabled">修改价格</el-button>
          <el-button type="primary" v-model="submitForm" :disabled="submitForm" @click="changePriceSuccess">完成</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="dataList"
        v-loading="dataListLoading"
        @filter-change="filterChange"
        :header-cell-class-name="tableheaderClassName"
        @sort-change="changeData"
        ref="priceTable"
        style="width: 100%;height:100%">
        <el-table-column
          prop="productName"
          header-align="center"
          align="center"
          width="150"
          label="产品">
        </el-table-column>
        <el-table-column
          prop="bizTypeName"
          header-align="center"
          width="150"
          align="center"
          label="接口">
        </el-table-column>
        <el-table-column
          prop="cost"
          header-align="center"
          align="center"
          width="120"
          label="提成计算价格">
        </el-table-column>
        <el-table-column
          prop="lowestPrice"
          header-align="center"
          align="center"
          width="110"
          label="最低售价">
        </el-table-column>
        <el-table-column
          prop="standardPrice"
          label="默认售价"
          align="center"
          header-align="center"
          >
        </el-table-column>
        <el-table-column
          prop="fee"
          header-align="center"
          align="center"
          width="180"
          label="当前售价"
          >
          <template slot-scope="scope">
            <el-form  ref="Form">
              <el-form-item >
                <template>
                  <el-input class="input-number" ref="FormInput" @change="changeValue(scope.row)" :disabled="disabled" v-model="scope.row.fee"  type="number"></el-input>
                  <div class="el-form-item__error" ref="FormDiv"  v-if="DivId === scope.row.bizTypeCode"> {{message}} </div> 
                </template>
              </el-form-item>
            </el-form>
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
        :disabled="pageDisabled"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      disabled: true,
      dataForm: {
        accountId: null,
        productName: null,
        bizTypeName: null,
        page: 1,
        size: 10
      },
      changePriceDisabled: false,
      defaultValue: null,
      message: "",
      pageIndex: 1,
      dataList: [],
      allList: [
        { value: "productName", message: "产品名称	" },
        { value: "interfaceName", message: "接口名称" }
      ],
      totalPage: undefined,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      inputDisabledValue: "",
      paramsOneName: "",
      allListMessage: "产品名称",
      select: "产品名称",
      DivId: null,
      pageDisabled: false,
      submitForm: true,
      dataPriceList: {
        accountId: null,
        priceList: null
        //产品价格列表
        // {
        // productCode: null,
        // bizTypeCode: null,
        // chargeMethod: null,
        // fee: null,
        // }
      },
      inputValue: null,
      changeList: [],
      dataListPriceId: null
    };
  },
  created() {
    this.getDataList();
    this.changePriceDisabled = false;
  },
  methods: {
    init({ accountId }) {
      console.log(accountId)
      this.dataForm.accountId = accountId;
      this.dataPriceList.accountId = accountId;
      this.visible = true;
      /*
      * 请求接口
      */
      this.getDataList();
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/biz/account/product/list"),
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
        // 默认查询
         this.dataForm.productName = this.inputDisabledValue;
        this.getDataList();
      } else if (this.paramsOneName === "productName") {
        //产品名称
        this.dataForm.productName = this.inputDisabledValue;
      } else if (this.paramsOneName === "interfaceName") {
        //接口名称
        this.dataForm.bizTypeName = this.inputDisabledValue;
      }
    },
    //查询
    handleFilter() {
      if (this.inputDisabledValue) {
        this.dataForm.accountId = this.dataPriceList.accountId
        this.getDataList();
      } else {
        this.dataForm.accountId = this.dataPriceList.accountId
        this.getDataList();
      }
    },
    filterChange(e) {},
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
    changePrice(e) {
      this.disabled = false;
      this.changePriceDisabled = true;
      this.submitForm = false;
      this.pageDisabled = true;
    },
    changePriceSuccess() {
      if (this.dataListPriceId) {
        // 提交修改的数据   已经存在sessionStorage
        if (this.dataListPriceId.length == 0) {
          this.disabled = true;
          this.submitForm = true;
          this.pageDisabled = false;
        } else {
          let postDataPriceList = [];
          this.dataListPriceId.forEach(element => {
            let priceListId = sessionStorage.getItem(element);
            postDataPriceList.push(JSON.parse(priceListId));
          });
          let submitArray = [];
          postDataPriceList.forEach((element, index) => {
            if (element === null) {
              postDataPriceList.splice(index, 1);
            } else {
              submitArray.push(element);
            }
          });
          this.dataPriceList.priceList = JSON.stringify(submitArray);
          this.submitForm = true;
          this.disabled = true;
          this.pageDisabled = false;
          // 提交成功删除sessionStorage
          this.$http({
            url: this.$http.adornUrl("/biz/account/product/batchUpdatePrice"),
            method: "post",
            data: this.$http.adornData(this.dataPriceList)
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.changePriceDisabled = false;
                  this.$emit("refreshDataList");
                  this.dataListPriceId.forEach(element => {
                    sessionStorage.removeItem(element);
                  });
                  this.dataListPriceId = [];
                }
              });
            } else {
              this.$message.error(data.msg);
              this.dataListPriceId.forEach(element => {
                sessionStorage.removeItem(element);
              });
              // this.visible = false;
            }
            this.dataListLoading = false;
          });
        }
      } else {
        this.disabled = true;
        this.submitForm = true;
        this.pageDisabled = false;
      }
        this.changePriceDisabled = false;
    },
    changeValue({ lowestPrice, productCode, bizTypeCode, chargeMethod, fee }) {
      let value = event.currentTarget.value; //当前输入的值
      if (value > lowestPrice) {
        //大于最低售价
        this.message = "";
        this.DivId = bizTypeCode;
        this.submitForm = false;
        this.changeList.push(`${bizTypeCode}`);
        this.dataListPriceId = Array.from(new Set(this.changeList));
        let priceList = {
          productCode: productCode,
          bizTypeCode: bizTypeCode,
          chargeMethod: chargeMethod,
          fee: fee
        };
        sessionStorage.setItem(`${bizTypeCode}`, JSON.stringify(priceList));
        let sessionList = sessionStorage.getItem(`${bizTypeCode}`);
        let changePriceList = [];
        this.dataListPriceId.forEach(element => {
          let sessionList = sessionStorage.getItem(`${bizTypeCode}`);
          changePriceList.push(sessionList);
        });
      } else if (value === lowestPrice) {
        this.message = "请修改内容";
        this.DivId = bizTypeCode;
        this.submitForm = true;
      } else {
        this.message = "数值太小";
        this.submitForm = true;
        this.DivId = bizTypeCode;
      }
    },
    closeDialog() {
      this.disabled = false;
      this.submitForm = true;
    },
    tableheaderClassName({ row, rowIndex }) {
      return "table-head-th";
    }
  },
  watch: {}
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


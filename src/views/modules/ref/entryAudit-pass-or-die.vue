<template>
  <el-dialog
    title="入账审核"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="el-dialog-enter"
    @close='closeDialog' 
    >
    <el-form :inline="true" :model="dataForm" label-width="100px" >
      <el-form-item label="公司名称">
					{{companyName}}
      </el-form-item><br />
      <el-form-item label="万数账号">
				{{accountPhone}}
      </el-form-item><br />
      <el-form-item label="充值金额">
					{{preMoney | currency}} 元
      </el-form-item><br />
      <el-form-item label="优惠金额">
					{{discountMoney | currency}} 元
      </el-form-item><br />
      <el-form-item label="实际金额">
					{{actualMoney | currency}} 元
      </el-form-item><br />
      <el-form-item label="充值类型">
				{{orderTypeName}}
      </el-form-item><br />
      <el-form-item label="银行流水号" v-if="dataList.orderType == 2">
        <el-input 
          class="tradeNoInput" 
          placeholder="银行流水号"
          ref="tradeNo" 
          @change="saveTradeNo" 
          v-model="tradeNoValue"
          >
        </el-input>
      </el-form-item><br />
      <el-form-item label="备注">
		    <el-input 
          v-model="remarkText" 
          ref="mark" 
          @change="saveMark" 
          :rows="3"  
          :cols="53" 
          maxlength="150" 
          placeholder="请输入本次操作备注" 
          type="textarea" 
          clearable
        ></el-input>
        <div class="el-form-item__error" ref="FormDiv" > {{remarkMessage}} </div> 
        <span>{{remarkText.length}}/150</span>
      </el-form-item><br />
    <el-button type="primary" @click="saveData" v-if="condition === true"  :disabled="disabled"  class="submit-button">提交</el-button>
    <el-button type="primary" @click="rebutData" v-if="condition === false" :disabled="disabled"  class="submit-button">提交</el-button>
    <el-button  @click="visible = false">取消</el-button>
    </el-form>
  </el-dialog>
</template>


<script>
export default {
  data() {
    return {
      visible: false,
      remarkText: "",
      remarkMessage: "",
      tradeNoValue: "",
      companyName: null,
      accountUsername: null,
      accountPhone: null,
      disabled: false,
      condition: null,
      preMoney:null,
      actualMoney: null,
      orderTypeName:null,
      discountMoney: null,
      balanceVisible: false,
      dataForm: {
        aid: 76
      },
      dataList: {
        id: null, //	客户ID
        auditResult: null,//审核结果
        auditMark: null, //	下单备注信息
        orderType: null,
        tradeNo: null,
      },
      chooseDate: null
    };
  },
  methods: {
    init({ companyName,id, accountPhone,discountMoney, orderNo, actualMoney,preMoney,orderTypeName,orderType,tradeNo },text) {
      this.visible = true;
      this.companyName = companyName;
      this.accountPhone = accountPhone;
      this.actualMoney = actualMoney;
      this.preMoney = preMoney;
      this.tradeNo = tradeNo
      this.orderTypeName = orderTypeName;
      this.dataList.orderType = orderType
      this.discountMoney = discountMoney
      this.dataList.orderNo = orderNo;
      this.dataList.id = id
      if(text == 'success'){
        this.condition = true;
        this.dataList.auditResult = true;
      }else if(text == 'error'){
        this.condition = false;
        this.dataList.auditResult = false;
      }

    },
    // 提交数据
    saveData() {
      this.disabled = true;
      this.$http({
        url: this.$http.adornUrl(`/biz/incomeorder/audit`),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data: this.$http.adornData(this.dataList, true, "form")
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.disabled = false;
              this.visible = false;
              this.$emit("refreshDataList");
              this.dataList.remarkText = "";
              this.auditResult = null;
            }
          });
        } else {
          this.disabled = false;
          this.auditResult = null;
          this.$emit('refreshDataList',true);
          this.$message.error(data.msg);
        }
      });
    },
    //驳回
    rebutData(){
      this.disabled = true;
      this.$http({
        url: this.$http.adornUrl(`/biz/incomeorder/audit`),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data: this.$http.adornData(this.dataList, true, "form")
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.disabled = false;
              this.visible = false;
              this.$emit("refreshDataList");
              this.dataList.remarkText = "";
              this.auditResult = null;
            }
          });
        } else {
          this.disabled = false;
          this.auditResult = null;
          this.$emit('refreshDataList',true);
          this.$message.error(data.msg);
        }
      });      
    },
    saveMark(e) {
      //	备注
      this.dataList.auditMark = this.$refs.mark.value;
    },
    closeDialog() {
      this.remarkText = "";
      this.chooseDate = null;
      this.tradeNoValue = "";
      this.disabled = false
    },
    saveTradeNo(e){
      let tradeNo =  this.$refs.tradeNo.value;
      if(!tradeNo){
        this.disabled = true
      }else{
        this.disabled = false
        this.dataList.tradeNo = tradeNo
      }
    }
  },
  watch: {
    remarkText: function(val, oldValue) {
      if (val.length === 150) {
        this.remarkMessage = "备注最多输入150字哦";
      } else {
        this.remarkMessage = "";
      }
    }
  },
  filters: {
    currency: function(number, decimals = 3, dec_point, thousands_sep, roundtag) {
      /*
        * 参数说明：
        * number：要格式化的数字
        * decimals：保留几位小数
        * dec_point：小数点符号
        * thousands_sep：千分位符号
        * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
        * */
      number = (number + "").replace(/[^0-9+-Ee.]/g, "");
      roundtag = roundtag || "ceil"; //"ceil","floor","round"
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
        dec = typeof dec_point === "undefined" ? "." : dec_point,
        s = "",
        toFixedFix = function(n, prec) {
          var k = Math.pow(10, prec);
          return (
            "" +
            parseFloat(
              Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(
                prec * 2
              )
            ) /
              k
          );
        };
      s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
      var re = /(-?\d+)(\d{3})/;
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
      }

      if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
      }
      return s.join(dec);
    }
  }
};
</script>

<style>
.tradeNoInput {
  width: 330px;
}
.el-dialog__header {
  border-bottom: 1px solid #cccccc;
}
.el-dialog-enter .el-dialog__body {
  padding: 30px 30px 30px 100px;
}

.submit-button {
  margin-left: 120px;
  margin-right: 50px;
}

</style>

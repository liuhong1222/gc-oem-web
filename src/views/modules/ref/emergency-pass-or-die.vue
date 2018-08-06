<template>
  <el-dialog
    title="应急还款审核"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="el-dialog-enter"
    @close='closeDialog' 
    >
    <el-form :inline="true" :model="dataForm" label-width="100px" >
      <el-form-item label="公司名称">
					{{customerName}}
      </el-form-item><br />
      <el-form-item label="万数账号">
				{{accountPhone}}
      </el-form-item><br />
      <el-form-item label="账号余额">
					{{balance | currency}} 元
      </el-form-item><br />
      <el-form-item label="还款金额">
					{{disposeMoney | currency}} 元
      </el-form-item><br />
      <!-- <el-form-item label="所涉金额(元)">
        <el-input 
          v-model="messageMoney" 
          class="moneyInput" 
          ref="money" 
          @change="saveMoney" 
          type="number"  
          placeholder="单行输入"
        ></el-input> 元
        <div class="el-form-item__error" v-model="moneyMessage" v-if="balanceVisible">
          {{moneyMessage}}
        </div>
      </el-form-item><br /> -->
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
      messageMoney: "",
      visible: false,
      remarkText: "",
      remarkMessage: "",
      customerName: null,
      accountUsername: null,
      accountPhone: null,
      disabled: false,
      condition: null,
      disposeMoney: null,
      balance:null,
      balanceVisible: false,
      moneyMessage: "请输入正确的金额",
      dataForm: {
        aid: 76
      },
      dataList: {
        id: null, //	客户ID
        auditResult: null,//审核结果
        mark: null //	下单备注信息
      },
      chooseDate: null
    };
  },
  methods: {
    init({ customerName,id, accountPhone,disposeMoney, orderNo, refundMoney,balance },text) {
      this.visible = true;
      this.customerName = customerName;
      this.accountPhone = accountPhone;
      this.refundMoney = refundMoney;
      this.balance = balance;
      this.disposeMoney = disposeMoney
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
        url: this.$http.adornUrl(`biz/emergencydisposeorder/audit`),
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
              this.dataList.mark = "";
              this.auditResult = null;
            }
          });
        } else {
          this.disabled = false;
          this.auditResult = null;
          this.dataList.mark = "";
          this.$emit('refreshDataList',true);
          this.$message.error(data.msg);
        }
      });
    },
    //驳回
    rebutData(){
      this.disabled = true;
      this.$http({
        url: this.$http.adornUrl(`biz/emergencydisposeorder/audit`),
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
              this.dataList.mark = "";
              this.auditResult = null;
            }
          });
        } else {
          this.disabled = false;
          this.auditResult = null;
          this.dataList.mark = "";
          this.$emit('refreshDataList',true);
          this.$message.error(data.msg);
        }
      });      
    },
    saveMark(e) {
      //	备注
      this.dataList.mark = this.$refs.mark.value;
    },
    saveTime(e) {
      //	预计归还时间
      this.dataList.repaymentDate = e;
    },
    closeDialog() {
      this.messageMoney = "";
      this.remarkText = "";
      this.chooseDate = null;
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
.moneyInput {
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

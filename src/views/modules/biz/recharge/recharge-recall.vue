<template>
  <el-dialog
    title="撤回申请"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="el-dialog-enter"
    @close='closeDialog' 
    >
    <el-form :inline="true" :model="dataForm" label-width="100px" >
      <el-form-item label="公司名称">
					{{customerName}}
      </el-form-item>
      <el-form-item label="订单类型">
				{{orderType}}
      </el-form-item>
      <el-form-item label="金额">
					{{balance }} 元
      </el-form-item><br />
      <el-form-item >
        <div style="text-align:center;    margin: 4px 7px 20px 33px;">
					是否撤回对该笔订单的申请？
        </div>
      </el-form-item><br />
    <el-button type="primary" @click="advanceRecallData" v-if="dialogText === 'advance'"  :disabled="disabled"  class="submit-button">是</el-button>
    <el-button type="primary" @click="chargeRecallData" v-if="dialogText === 'charge'"  :disabled="disabled"  class="submit-button">是</el-button>
    <el-button type="primary" @click="testSaveRecallData" v-if="dialogText === 'testSave'"  :disabled="disabled"  class="submit-button">是</el-button>
    <el-button type="primary" @click="failureReturnRecallData" v-if="dialogText === 'failureReturn'"  :disabled="disabled"  class="submit-button">是</el-button>
    <el-button  @click="visible = false">否</el-button>
    </el-form>
  </el-dialog>
</template>


<script>
export default {
  data() {
    return {
      visible: false,
      customerName: null,
      orderType: null,
      dialogText: null,
      disabled: false,
      balance: null,
      balanceVisible: false,
      dataForm: {},
      dataList: {
        id: null //	客户ID
      }
    };
  },
  methods: {
    init({ customerName, id, refundMoney, balance, accountId ,preMoney,emergencyMoney,freeMoney,reMoney}, text) {
      this.visible = true;
      this.customerName = customerName;
      this.refundMoney = refundMoney;
      this.dataList.id = id;
      // console.log(text)
      if (text === "advance") {
        this.dialogText = "advance";
        this.balance = preMoney
        this.orderType = "预付订单";
      } else if (text === "charge") {
        this.dialogText = "charge";
        this.orderType = "应急充值";
        this.balance = emergencyMoney
      } else if (text === "testSave") {
        this.orderType = "测试赠送";
        this.dialogText = "testSave";
        this.balance = freeMoney
      }else if(text === 'failureReturn'){
        this.orderType = "失败返还";
        this.dialogText = "failureReturn";
        this.balance = reMoney
      }
      // //获取余额
      // this.$http({
      //   url: this.$http.adornUrl("biz/bizemergencyrechargeorder/balance"),
      //   method: "get",
      //   params: this.$http.adornParams({ accountId: accountId })
      // }).then(({ data }) => {
      //   if (data && data.code === 0) {
      //     this.balance = data.balance;
      //   } else {
      //   }
      //   this.dataListLoading = false;
      // });
    },
    // 预付订单 撤回
    advanceRecallData() {
      this.disabled = true;
      this.$http({
        url: this.$http.adornUrl(`/biz/bizprepayorder/delete`),

        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        method: "post",
        data: this.$http.adornData({ id: this.dataList.id }, true, "form")
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
              this.dialogText = null;
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 应急充值撤回
    chargeRecallData() {
      this.disabled = true;
      this.$http({
        url: this.$http.adornUrl(`/biz/bizemergencyrechargeorder/delete`),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        method: "post",
        data: this.$http.adornData({ id: this.dataList.id }, true, "form")
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
              this.dialogText = null;
            }
          });
        } else {
          this.disabled = false;
          this.$message.error(data.msg);
        }
      });
    },

    // 测试赠送 撤回
    testSaveRecallData() {
      this.disabled = true;
      this.$http({
        url: this.$http.adornUrl(`biz/bizfreeorder/delete`),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data: this.$http.adornData({ id: this.dataList.id }, true, "form")
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
              this.dialogText = null;
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 失败返还 撤回
    failureReturnRecallData() {
      this.disabled = true;
      this.$http({
        url: this.$http.adornUrl(`biz/bizfailreorder/delete`),
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data: this.$http.adornData({ id: this.dataList.id }, true, "form")
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
              this.dialogText = null;
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    },

    closeDialog() {
      this.dialogText = null;
      this.disabled = false;
    }
  },
  filters: {
    currency: function(
      number,
      decimals = 3,
      dec_point,
      thousands_sep,
      roundtag
    ) {
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
  text-align: center;
}
.el-dialog-enter .el-dialog__body {
  padding: 30px 30px 30px 100px;
}

.submit-button {
  margin-left: 250px;
  margin-right: 50px;
}
</style>

<template>
  <el-dialog
    title="退款审核"
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
					{{balance}}
      </el-form-item><br />
      <el-form-item label="退款金额">
					{{refundMoney}}
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
      messageMoney: "",
      visible: false,
      remarkText: "",
      remarkMessage: "",
      customerName: null,
      accountPhone: null,
      disabled: false,
      condition: null,
      refundMoney: null,
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
    init({ customerName, accountPhone, orderNo, id,refundMoney,balance },text) {
      this.visible = true;
      this.dataList.id = id;
      this.dataList.auditResult = true
      this.customerName = customerName;
      this.accountPhone = accountPhone;
      this.orderNo = orderNo;
      this.refundMoney = refundMoney;
      this.balance = balance;
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
        url: this.$http.adornUrl(`/biz/refundorder/audit`),
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
          this.$emit('refreshDataList',true);
          this.$message.error(data.msg);
        }
      });
    },
    //驳回
    rebutData(){
      this.disabled = true;
      this.$http({
        url: this.$http.adornUrl(`/biz/refundorder/audit`),
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

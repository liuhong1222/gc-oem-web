webpackJsonp([51],{"3o0e":function(e,t,a){var s=a("7TZJ");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("XkoO")("251c6ccc",s,!0)},"7TZJ":function(e,t,a){(e.exports=a("acE3")(!1)).push([e.i,"\n.moneyInput {\r\n  width: 330px;\n}\n.el-dialog__header {\r\n  border-bottom: 1px solid #cccccc;\n}\n.el-dialog-enter .el-dialog__body {\r\n  padding: 30px 30px 30px 100px;\n}\n.submit-button {\r\n  margin-left: 120px;\r\n  margin-right: 50px;\n}\r\n",""])},fMJS:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{staticClass:"el-dialog-enter",attrs:{title:"测试赠送","close-on-click-modal":!1,visible:e.visible},on:{"update:visible":function(t){e.visible=t},close:e.closeDialog}},[a("el-form",{attrs:{inline:!0,model:e.dataForm,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"公司名称"}},[e._v("\n\t\t\t\t\t"+e._s(e.customerName)+"\n      ")]),a("br"),e._v(" "),a("el-form-item",{attrs:{label:"万数账号"}},[e._v("\n\t\t\t\t"+e._s(e.accountPhone)+"\n      ")]),a("br"),e._v(" "),a("el-form-item",{attrs:{label:"所涉金额(元)"}},[a("el-input",{ref:"money",staticClass:"moneyInput",attrs:{type:"number",placeholder:"单行输入"},on:{change:e.saveMoney},model:{value:e.messageMoney,callback:function(t){e.messageMoney=t},expression:"messageMoney"}}),e._v(" 元\n        "),e.balanceVisible?a("div",{staticClass:"el-form-item__error",model:{value:e.moneyMessage,callback:function(t){e.moneyMessage=t},expression:"moneyMessage"}},[e._v("\n          "+e._s(e.moneyMessage)+"\n        ")]):e._e()],1),a("br"),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{ref:"mark",attrs:{rows:3,cols:53,maxlength:"150",placeholder:"请输入本次操作备注",type:"textarea",clearable:""},on:{change:e.saveMark},model:{value:e.remarkText,callback:function(t){e.remarkText=t},expression:"remarkText"}}),e._v(" "),a("div",{ref:"FormDiv",staticClass:"el-form-item__error"},[e._v(" "+e._s(e.remarkMessage)+" ")]),e._v(" "),a("span",[e._v(e._s(e.remarkText.length)+"/150")])],1),a("br"),e._v(" "),a("el-button",{staticClass:"submit-button",attrs:{type:"primary",disabled:e.disabled},on:{click:e.saveData}},[e._v("提交")]),e._v(" "),a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")])],1)],1)},staticRenderFns:[]};var i=a("46Yf")({data:function(){return{messageMoney:"",visible:!1,title:"",remarkText:"",remarkMessage:"",customerName:null,disabled:!0,balanceVisible:!1,moneyMessage:"请输入正确的金额",accountPhone:null,dataForm:{aid:76},dataList:{accountId:null,amount:null,mark:null}}},created:function(){this.disabled=!0},methods:{init:function(e,t){var a=this;this.title=t,this.visible=!0,this.dataList.accountId=e,this.dataForm.aid=e||0,this.dataForm.aid&&this.$http({url:this.$http.adornUrl("/biz/bizprepayorder/info"),method:"get",params:this.$http.adornParams(this.dataForm)}).then(function(e){var t=e.data;t&&0===t.code&&(a.customerName=t.data.customerName,a.accountPhone=t.data.accountPhone)})},saveData:function(){var e=this;this.disabled=!0,this.$http({url:this.$http.adornUrl("biz/bizfreeorder/save"),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},method:"post",data:this.$http.adornData(this.dataList,!0,"form")}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.visible=!1,e.$emit("refreshDataList"),e.messageMoney="",e.remarkText="",e.dataList.amount="",e.dataList.mark=""}}):e.$message.error(a.msg)})},saveMoney:function(e){var t=this.$refs.money.value;""===t?this.disabled=!0:t<0?(this.disabled=!0,this.balanceVisible=!0):t>1e3?(this.disabled=!0,this.balanceVisible=!0):(this.disabled=!1,this.balanceVisible=!1,this.dataList.amount=t)},saveMark:function(e){this.dataList.mark=this.$refs.mark.value},closeDialog:function(){this.messageMoney="",this.remarkText=""}},watch:{remarkText:function(e,t){150===e.length?this.remarkMessage="备注最多输入150字哦":this.remarkMessage=""}}},s,!1,function(e){a("3o0e")},null,null);t.default=i.exports}});
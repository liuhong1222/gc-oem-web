webpackJsonp([8,21],{HNrH:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={data:function(){return{levelvisible:!1,labelPosition:"right",dataForm:{id:0,levelName:"",levelNum:"",price:"",moreCounts:"",minRecharge:"",maxRecharge:""},dataRule:{levelName:[{required:!0,message:"请输入代理商等级名称",trigger:"blur"}],levelNum:[{required:!0,message:"请输入代理商等级",trigger:"blur"}],price:[{required:!0,message:"请输入单价",trigger:"blur"}],moreCounts:[{required:!0,message:"请输入允许超出条数",trigger:"blur"}],minRecharge:[{required:!0,message:"请输入充值金额",trigger:"blur"}]}}},methods:{levelInit:function(e){var t=this;this.dataForm.id=e||0,this.levelvisible=!0,this.$nextTick(function(){t.$refs.dataForm.resetFields()}),this.dataForm.id&&this.$http({url:this.$http.adornUrl("agent/level/detail?token="+this.$cookie.get("token")+"&id="+this.dataForm.id),method:"get",params:this.$http.adornParams()}).then(function(e){var a=e.data;a&&0===a.code&&(t.dataForm.levelName=a.data.name,t.dataForm.levelNum=a.data.level,t.dataForm.price=a.data.price,t.dataForm.moreCounts=a.data.emptyWarnNumber,t.dataForm.minRecharge=a.data.minRecharge,t.dataForm.maxRecharge=a.data.maxRecharge)})},levelSubmit:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&e.$http({url:e.$http.adornUrl("agent/level/"+(e.dataForm.id?"update":"save")+"?token="+e.$cookie.get("token")),method:"post",params:e.$http.adornParams({id:e.dataForm.id||void 0,name:e.dataForm.levelName,level:e.dataForm.levelNum,price:e.dataForm.price,emptyWarnNumber:e.dataForm.moreCounts,minRecharge:e.dataForm.minRecharge,maxRecharge:e.dataForm.maxRecharge})}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.levelvisible=!1,e.$emit("refreshDataList")}}):e.$message.error(a.msg)})})},closeDialog:function(){this.dataForm.minRecharge="",this.dataForm.maxRecharge=""}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.dataForm.id?"修改":"新增","close-on-click-modal":!1,visible:e.levelvisible},on:{"update:visible":function(t){e.levelvisible=t},close:e.closeDialog}},[a("el-form",{ref:"dataForm",staticClass:"cf",attrs:{model:e.dataForm,rules:e.dataRule,"label-position":e.labelPosition,"label-width":"123px"}},[a("el-form-item",{attrs:{label:"代理商等级：",prop:"levelNum"}},[a("el-input",{attrs:{placeholder:"代理商等级 如：1"},model:{value:e.dataForm.levelNum,callback:function(t){e.$set(e.dataForm,"levelNum",t)},expression:"dataForm.levelNum"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"等级名称：",prop:"levelName"}},[a("el-input",{attrs:{placeholder:"代理商等级 如：一级代理商"},model:{value:e.dataForm.levelName,callback:function(t){e.$set(e.dataForm,"levelName",t)},expression:"dataForm.levelName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"单价：",prop:"price"}},[a("el-input",{attrs:{placeholder:"单价"},model:{value:e.dataForm.price,callback:function(t){e.$set(e.dataForm,"price",t)},expression:"dataForm.price"}}),e._v(" "),a("span",[e._v("元/条")])],1),e._v(" "),a("el-form-item",{attrs:{label:"预警条数：",prop:"moreCounts"}},[a("el-input",{attrs:{placeholder:"预警条数"},model:{value:e.dataForm.moreCounts,callback:function(t){e.$set(e.dataForm,"moreCounts",t)},expression:"dataForm.moreCounts"}}),e._v(" "),a("span",[e._v("条")])],1),e._v(" "),a("el-form-item",{attrs:{label:"充值金额：",prop:"minRecharge"}},[a("el-col",{attrs:{span:8}},[a("el-input",{staticStyle:{width:"100%"},attrs:{placeholder:"最小充值"},model:{value:e.dataForm.minRecharge,callback:function(t){e.$set(e.dataForm,"minRecharge",t)},expression:"dataForm.minRecharge"}})],1),e._v(" "),a("el-col",{staticClass:"line",attrs:{span:1}},[e._v("-")]),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-input",{staticStyle:{width:"100%"},attrs:{placeholder:"最大充值"},model:{value:e.dataForm.maxRecharge,callback:function(t){e.$set(e.dataForm,"maxRecharge",t)},expression:"dataForm.maxRecharge"}})],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.levelvisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.levelSubmit()}}},[e._v("确定")])],1)],1)},staticRenderFns:[]};var o=a("46Yf")(l,r,!1,function(e){a("gYqY")},null,null);t.default=o.exports},NbB7:function(e,t,a){var l=a("idDZ");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("XkoO")("b32644fe",l,!0)},ULMq:function(e,t,a){(e.exports=a("acE3")(!1)).push([e.i,"\n.el-form-item__content {\n  margin-left: 0;\n}\n",""])},apiF:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={data:function(){return{gradeVisible:!1,oemTableData:[],dataListLoading:!1}},components:{AddGradeUpdate:a("HNrH").default},activated:function(){this.levelList()},methods:{levelList:function(){var e=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("agent/level/list?token="+this.$cookie.get("token")),method:"get"}).then(function(t){var a=t.data;a&&0===a.code?e.oemTableData=a.data:e.oemTableData=[],e.dataListLoading=!1})},getRowClass:function(e){e.row,e.column;var t=e.rowIndex;e.columnIndex;return 0==t?"background-color: #f8f8f8;color:#666;":""},addUpdateLevel:function(e){var t=this;this.gradeVisible=!0,this.$nextTick(function(){t.$refs.gradeCon.levelInit(e)})},del:function(e,t){var a=this;this.$confirm("是否删除"+t+"以及相关信息？","删除代理商等级",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$http({url:a.$http.adornUrl("agent/level/delete?token="+a.$cookie.get("token")),method:"post",params:a.$http.adornParams({id:e})}).then(function(e){var t=e.data;t&&0===t.code?a.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){a.levelList()}}):a.$message.error(t.msg)})}).catch(function(){})}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main"},[a("h2",{staticStyle:{display:"inline-block"}},[e._v("OEM代理商等级管理")]),e._v(" "),a("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:function(t){e.addUpdateLevel()}}},[e._v("新增")]),e._v(" "),a("div",{staticClass:"userTable"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%"},attrs:{data:e.oemTableData,"header-cell-style":e.getRowClass}},[a("el-table-column",{attrs:{type:"index","header-align":"center",align:"center",width:"80",fixed:"",label:"序号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:" 代理商级别",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"单价（元/条）",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"emptyWarnNumber",label:"预警条数(条) ",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"minRecharge",label:" 最小充值金额（元） ",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"maxRecharge",label:" 最大充值金额（元） ",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.del(t.row.id,t.row.name)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.addUpdateLevel(t.row.id)}}},[e._v("修改")])]}}])})],1)],1),e._v(" "),e.gradeVisible?a("add-grade-update",{ref:"gradeCon",on:{refreshDataList:e.levelList}}):e._e()],1)},staticRenderFns:[]};var o=a("46Yf")(l,r,!1,function(e){a("NbB7")},null,null);t.default=o.exports},gYqY:function(e,t,a){var l=a("ULMq");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("XkoO")("7ff849a7",l,!0)},idDZ:function(e,t,a){(e.exports=a("acE3")(!1)).push([e.i,"\n.main {\n  width: 100%;\n  padding: 10px 23px 20px;\n  background-color: #ffffff;\n  margin-bottom: 24px;\n  -webkit-box-shadow: 0px 7px 9px 0px rgba(153, 153, 153, 0.05);\n          box-shadow: 0px 7px 9px 0px rgba(153, 153, 153, 0.05);\n}\n",""])}});
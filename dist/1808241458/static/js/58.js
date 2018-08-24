webpackJsonp([58,63],{INS3:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("KPSb"),s=a.n(r),i=a("E4LH"),o={data:function(){var e=this;return{visible:!1,roleList:[],parmroleList:[],dataForm:{id:0,userName:"",password:"",comfirmPassword:"",salt:"",email:"",realName:"",status:1,roleId:1},dataRule:{userName:[{required:!0,message:"手机号不能为空",trigger:"blur"},{validator:function(e,t,a){Object(i.b)(t)?a():a(new Error("手机号格式错误"))},trigger:"blur"}],password:[{validator:function(t,a,r){e.dataForm.id||/\S/.test(a)?r():r(new Error("密码不能为空"))},trigger:"blur"}],comfirmPassword:[{validator:function(t,a,r){e.dataForm.id||/\S/.test(a)?e.dataForm.password!==a?r(new Error("确认密码与密码输入不一致")):r():r(new Error("确认密码不能为空"))},trigger:"blur"}],realName:[{required:!0,message:"姓名不能为空",trigger:"blur"}],email:[{required:!0,message:"邮箱不能为空",trigger:"blur"},{validator:function(e,t,a){Object(i.a)(t)?a():a(new Error("邮箱格式错误"))},trigger:"blur"}]}}},methods:{init:function(e){var t=this;this.dataForm.id=e||0,this.visible=!0,this.$nextTick(function(){t.$refs.dataForm.resetFields()}),this.dataForm.id&&(console.log(this.roleList),this.$http({url:this.$http.adornUrl("/sys/user/info/"+this.dataForm.id),method:"get",params:this.$http.adornParams()}).then(function(e){var a=e.data;a&&0===a.code&&(t.dataForm.userName=a.user.username,t.dataForm.salt=a.user.salt,t.dataForm.email=a.user.email,t.dataForm.realName=a.user.realName,t.dataForm.status=a.user.status)}))},dataFormSubmit:function(){var e=this;this.parmroleList=[],this.parmroleList.push(this.dataForm.roleId),this.$refs.dataForm.validate(function(t){t&&e.$http({url:e.$http.adornUrl("/sys/user/"+(e.dataForm.id?"update":"save")+"?token="+e.$cookie.get("token")),method:"post",data:e.$http.adornData({userId:e.dataForm.id||void 0,username:e.dataForm.userName,password:e.dataForm.password?s()(e.dataForm.password):e.dataForm.password,salt:e.dataForm.salt,email:e.dataForm.email,mobile:e.dataForm.userName,status:e.dataForm.status,realName:e.dataForm.realName,roleIdList:e.parmroleList})}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.visible=!1,e.$emit("refreshDataList")}}):e.$message.error(a.msg)})})}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.dataForm.id?"修改":"新增","close-on-click-modal":!1,visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"80px"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"手机号",prop:"userName"}},[a("el-input",{attrs:{placeholder:"手机号"},model:{value:e.dataForm.userName,callback:function(t){e.$set(e.dataForm,"userName",t)},expression:"dataForm.userName"}})],1),e._v(" "),a("el-form-item",{class:{"is-required":!e.dataForm.id},attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{type:"password",placeholder:"密码"},model:{value:e.dataForm.password,callback:function(t){e.$set(e.dataForm,"password",t)},expression:"dataForm.password"}})],1),e._v(" "),a("el-form-item",{class:{"is-required":!e.dataForm.id},attrs:{label:"确认密码",prop:"comfirmPassword"}},[a("el-input",{attrs:{type:"password",placeholder:"确认密码"},model:{value:e.dataForm.comfirmPassword,callback:function(t){e.$set(e.dataForm,"comfirmPassword",t)},expression:"dataForm.comfirmPassword"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{attrs:{placeholder:"邮箱"},model:{value:e.dataForm.email,callback:function(t){e.$set(e.dataForm,"email",t)},expression:"dataForm.email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"姓名",prop:"realName"}},[a("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:e.dataForm.realName,callback:function(t){e.$set(e.dataForm,"realName",t)},expression:"dataForm.realName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"角色",size:"mini",prop:"roleId"}},[a("el-radio",{attrs:{label:1},model:{value:e.dataForm.roleId,callback:function(t){e.$set(e.dataForm,"roleId",t)},expression:"dataForm.roleId"}},[e._v("管理员")])],1),e._v(" "),a("el-form-item",{attrs:{label:"状态",size:"mini",prop:"status"}},[a("el-radio-group",{model:{value:e.dataForm.status,callback:function(t){e.$set(e.dataForm,"status",t)},expression:"dataForm.status"}},[a("el-radio",{attrs:{label:0}},[e._v("禁用")]),e._v(" "),a("el-radio",{attrs:{label:1}},[e._v("正常")])],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dataFormSubmit()}}},[e._v("确定")])],1)],1)},staticRenderFns:[]},n=a("46Yf")(o,l,!1,null,null,null);t.default=n.exports},JnAV:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={data:function(){return{dataForm:{userName:""},dataList:[],pageIndex:1,pageSize:10,totalPage:0,dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1}},components:{AddOrUpdate:a("INS3").default},activated:function(){this.getDataList()},methods:{getDataList:function(){var e=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/sys/user/list"),method:"get",params:this.$http.adornParams({page:this.pageIndex,limit:this.pageSize,username:this.dataForm.userName})}).then(function(t){var a=t.data;a&&0===a.code?(e.dataList=a.page.list,e.totalPage=a.page.totalCount):(e.dataList=[],e.totalPage=0),e.dataListLoading=!1})},sizeChangeHandle:function(e){this.pageSize=e,this.pageIndex=1,this.getDataList()},currentChangeHandle:function(e){this.pageIndex=e,this.getDataList()},selectionChangeHandle:function(e){this.dataListSelections=e},addOrUpdateHandle:function(e){var t=this;this.addOrUpdateVisible=!0,this.$nextTick(function(){t.$refs.addOrUpdate.init(e)})},deleteHandle:function(e){var t=this,a=e?[e]:this.dataListSelections.map(function(e){return e.userId});this.$confirm("确定对[id="+a.join(",")+"]进行["+(e?"删除":"批量删除")+"]操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http({url:t.$http.adornUrl("/sys/user/delete"),method:"post",data:t.$http.adornData(a,!1)}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.getDataList()}}):t.$message.error(a.msg)})}).catch(function(){})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mod-user"},[a("el-form",{attrs:{inline:!0,model:e.dataForm},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.getDataList()}}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"手机号",clearable:""},model:{value:e.dataForm.userName,callback:function(t){e.$set(e.dataForm,"userName",t)},expression:"dataForm.userName"}})],1),e._v(" "),a("el-form-item",[a("el-button",{on:{click:function(t){e.getDataList()}}},[e._v("查询")]),e._v(" "),e.isAuth("sys:user:save")?a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addOrUpdateHandle()}}},[e._v("新增")]):e._e(),e._v(" "),e.isAuth("sys:user:delete")?a("el-button",{attrs:{type:"danger",disabled:e.dataListSelections.length<=0},on:{click:function(t){e.deleteHandle()}}},[e._v("批量删除")]):e._e()],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%"},attrs:{data:e.dataList,border:""},on:{"selection-change":e.selectionChangeHandle}},[a("el-table-column",{attrs:{type:"selection","header-align":"center",align:"center",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userId","header-align":"center",align:"center",width:"80",label:"ID"}}),e._v(" "),a("el-table-column",{attrs:{prop:"username","header-align":"center",align:"center",label:"手机号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"realName","header-align":"center",align:"center",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"email","header-align":"center",align:"center",label:"邮箱"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status","header-align":"center",align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.status?a("el-tag",{attrs:{size:"small",type:"danger"}},[e._v("禁用")]):a("el-tag",{attrs:{size:"small"}},[e._v("正常")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime","header-align":"center",align:"center",width:"180",label:"创建时间"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"150",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.isAuth("sys:user:update")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.addOrUpdateHandle(t.row.userId)}}},[e._v("修改")]):e._e(),e._v(" "),e.isAuth("sys:user:delete")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.deleteHandle(t.row.userId)}}},[e._v("删除")]):e._e()]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.pageIndex,"page-sizes":[10,20,50,100],"page-size":e.pageSize,total:e.totalPage,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.sizeChangeHandle,"current-change":e.currentChangeHandle}}),e._v(" "),e.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:e.getDataList}}):e._e()],1)},staticRenderFns:[]},i=a("46Yf")(r,s,!1,null,null,null);t.default=i.exports}});
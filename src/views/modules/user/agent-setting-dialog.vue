<template>
  <el-dialog  
    title="代理商设置"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="el-dialog-enter"
    @close='closeDialog' >
    <el-steps :active="active" finish-status="success" align-center class="settingSteps" >
      <el-step title="基本信息"></el-step>
      <el-step title="域名备案信息"></el-step>
      <el-step title="客服资料"></el-step>
      <el-step title="合同信息"></el-step>
      <el-step title="支付宝资料"></el-step>
      <el-step title="微信资料"></el-step>
    </el-steps>
    <!-- 内容显示 -->
    <div>
      <!-- 基本信息 -->
      <div class="essentialInformation" v-if="active === 0 ">
        <el-form :inline="true" v-model="dataList"   ref="dataList" label-width="110px" >
          <el-form-item label="代理商序号">
              代理商名称
          </el-form-item><br />
          <el-form-item label="商户编号">
           代理商名称
          </el-form-item><br />
          <el-form-item label="实付金额(元)">
            代理商名称
          </el-form-item>
          <br />
          <el-form-item label="logo">
              <el-upload
                class="upload-demo"
                drag
                :show-file-list="false"
                :on-success="handleAvatarSuccessLogo"
                :on-error="errorLogo"
                :before-upload="beforeAvatarUploadLogo"
                :action="actionLogo"
                :data="logoQueryParams"
                multiple>
              <img v-if="imageUrlLogo" :src="imageUrlLogo" class="avatar">
               <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M，长140px，宽36px</div>
            </el-upload>
            </el-form-item><br />
          <el-form-item label="icon">
            <el-upload
                class="upload-demo"
                drag
                :show-file-list="false"
                :on-success="handleAvatarSuccessIcon"
                :before-upload="beforeAvatarUploadIcon"
                :action="actionLogo"
                :data="logoQueryParams"
                multiple>
              <img v-if="imageUrlIcon" :src="imageUrlIcon" class="avatar">
               <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M，长40px，宽40px</div>
            </el-upload></el-form-item><br />
          <el-form-item label="代表签字"></el-form-item><br />
          <el-form-item label="公司红章"></el-form-item><br />
          <el-form-item label="短信签名">
            <el-input placeholder="单行输入"></el-input> 
          </el-form-item><br />
          <el-form-item label="代理商域名">
            <el-input placeholder="单行输入"></el-input> 
          </el-form-item><br />
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button> 
        </el-form>
      </div>
      <!-- 域名备案信息 -->
      <div class="domainNameFiling"  v-if="active === 1 ">
          <el-form  label-width="110px" >
            <el-form-item label="版权信息">
                <el-input placeholder="版权信息"></el-input>
            </el-form-item>
            <el-form-item label="版权信息">
                <el-input placeholder="版权信息"></el-input>
            </el-form-item>
            <el-form-item label="版权信息">
                <el-input placeholder="版权信息"></el-input>
            </el-form-item>
            <el-form-item label="版权信息">
                <el-input placeholder="版权信息"></el-input>
            </el-form-item>
            <el-form-item label="版权信息">
                <el-input placeholder="版权信息"></el-input>
            </el-form-item>
          </el-form>
      </div>
      
      <!-- 客服资料 -->
        <div class="customerInformation"  v-if="active === 2">
          <el-form  label-width="110px"  >
            <el-form-item label="客服热线">
                <el-input placeholder="客服热线"></el-input>
            </el-form-item>
            <el-form-item label="客服qq">
                <el-input placeholder="客服qq"></el-input>
            </el-form-item>
            <el-form-item label="商务合作号">
                <el-input placeholder="商务合作号"></el-input>
            </el-form-item>

          </el-form>
        </div>

      <!-- 合同信息 -->
        <div class="contractInformation" v-if="active === 3">
          <el-form  label-width="110px"  >
            <el-form-item label="公司名称">
                <el-input placeholder="公司名称"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
                <el-input placeholder="公司地址"></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item label="开户行">
                <el-input placeholder="开户行"></el-input>
            </el-form-item>
            <el-form-item label="邮编">
                <el-input placeholder="邮编"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input placeholder="电话"></el-input>
            </el-form-item>
          </el-form>
        </div>

      <!-- 支付宝资料 -->
        <div class="alipayIInformation" v-if="active === 4 ">
          <el-form  label-width="110px" >
            <el-form-item label="appid">
                <el-input placeholder="appid"></el-input>
            </el-form-item>
            <el-form-item label="支付宝调用地址">
                <el-input placeholder="支付宝调用地址"></el-input>
            </el-form-item>
            <el-form-item label="支付回调地址">
                <el-input placeholder="支付回调地址"></el-input>
            </el-form-item>
            <el-form-item label="公钥">
                <el-input placeholder="公钥"></el-input>
            </el-form-item>
            <el-form-item label="私钥">
                <el-input placeholder="私钥"></el-input>
            </el-form-item>
          </el-form>
        </div>

      <!-- 微信资料 -->
        <div class="weixinInformation" v-if="active === 5">
          <el-form  label-width="110px" >
            <el-form-item label="微信调用地址">
                <el-input placeholder="微信调用地址"></el-input>
            </el-form-item>
            <el-form-item label="微信回调地址">
                <el-input placeholder="微信回调地址"></el-input>
            </el-form-item>
            <el-form-item label="appid">
                <el-input placeholder="appid"></el-input>
            </el-form-item>
            <el-form-item label="mchid">
                <el-input placeholder="mchid"></el-input>
            </el-form-item>
            <el-form-item label="key">
                <el-input placeholder="key"></el-input>
            </el-form-item>
          </el-form>
        </div>


    </div>
    
    <!-- button 可以放入内容区 -->
    <div>
      <div v-if="active != 0 && active !=5">
       
      </div>
      <div v-if="active === 5 ">
        <el-button style="margin-top: 12px;" @click="lastStep">上一步</el-button> 
        <el-button style="margin-top: 12px;" @click="submit">完成</el-button> 
      </div>
    </div>
    
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      agentId: null,
      active: 0,
      actionLogo: "file/image/upload",
      dataList: [],
      imageUrlIcon: "",
      imageUrlLogo: "",
      logoQueryParams: {
        imageType: 3,
        agentId: null
      }
    };
  },
  methods: {
    init({ agentId }) {
      this.visible = true;
      this.agentId = agentId;
      this.logoQueryParams.agentId = agentId;
    },
    next() {
      if (this.active++ > 5) this.active = 0;
    },
    lastStep() {
      this.active--;
    },
    submit() {
      this.$message({
        message: "操作成功",
        type: "success",
        duration: 1500,
        onClose: () => {
          this.visible = false;
          // this.$emit("refreshDataList");
        }
      });
    },
    closeDialog() {},
    //上传 执行顺序：beforeAvatarUpload ---执行action提交----执行handleAvatarSuccess or uploadError
    handleAvatarSuccessLogo(res, file) {
      console.log("xxxx");
      this.imageUrlLogo = URL.createObjectURL(file.raw);
    },
    errorLogo() {
      console.log("yyyyyy");
    },
    // actionLogo() {
    //   let xx = `http://localhost:8001/`;
    //   let url = xx + this.$http.adornUrl("file/image/upload");
    //   // console.log(url);
    //   return url;
    // },
    handleAvatarSuccessIcon(res, file) {
      this.imageUrlIcon = URL.createObjectURL(file.raw);
    },
    beforeAvatarUploadLogo(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isPNG && isLt2M;
    },
    beforeAvatarUploadIcon(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isPNG && isLt2M;
    }
  }
};
</script>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-dialog {
  width: 55% !important;
  min-width: 750px;
}
.settingSteps .el-step__head.is-process,
.settingSteps .is-success,
.settingSteps .is-process,
.settingSteps .el-step__head.is-finish {
  color: #3e8ef7;
  border-color: #3e8ef7;
}
.essentialInformation,
.domainNameFiling,
.customerInformation ,
.contractInformation,
.alipayIInformation,
.weixinInformation{
  min-width: 350px;
  min-height: 500px;
  margin: 0 auto;
  > .el-form {
    padding: 30px 30px;
  }
}
</style>

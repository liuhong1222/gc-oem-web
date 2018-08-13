<template>
    <div class="seecuslog">
        <!-- 查看个人信息 -->
        <el-dialog title="查看个人客户" :visible.sync="perseeVisible" width="48%">
            查看个人客户
            <el-form :model="perseeDataForm" ref="perDataForm" label-width="150px" :label-position="labelPosition">
                <el-form-item label="手机号码：">
                    <el-input v-model="perseeDataForm.mobile" placeholder="手机号码" readonly></el-input>
                </el-form-item>
                <el-form-item label="客户编号">
                    <el-input v-model="perseeDataForm.custNum" placeholder="客户编号" readonly></el-input>
                </el-form-item>
                <el-form-item label="身份证照片">
                    <!-- <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="otherhandleAvatarSuccess"
                        :before-upload="beforeAvatarUpload" style="display:inline-block">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:14px">正面</i>
                    </el-upload>
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="otherhandleAvatarSuccess"
                        :before-upload="beforeAvatarUpload" style="display:inline-block">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:14px">反面</i>
                    </el-upload>
                    <span>（上传后，以下部分信息可自动导入）</span> -->
                </el-form-item>
                <el-form-item label="客户姓名">
                    <el-input v-model="perseeDataForm.custNanme" placeholder="客户姓名" readonly></el-input>
                </el-form-item>
                <el-form-item label="身份证号码">
                    <el-input v-model="perseeDataForm.perIdno" placeholder="身份证号码" readonly></el-input>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="perseeDataForm.peraddress" placeholder="详细地址" readonly></el-input>
                </el-form-item>
                <el-form-item label="证件期限">
                    <el-input v-model="perseeDataForm.pertimelimit1" placeholder="开始" style="width:35%" readonly></el-input> 至
                    <el-input v-model="perseeDataForm.pertimelimit2" placeholder="结束" style="width:35%" readonly></el-input>
                </el-form-item>
                <el-form-item label="联系邮箱">
                    <el-input v-model="perseeDataForm.peremail" placeholder="联系邮箱" readonly></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="perseeVisible = false">取 消</el-button>
                <el-button type="primary"  @click="perseeVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 查看企业信息 -->
        <el-dialog title=" 查看企业客户" :visible.sync="entriseVisible" width="52%">
            查看企业客户
            <el-form :model="seepriseDataForm" ref="seepriseDataFormref" label-width="150px" :label-position="labelPosition">
                <el-form-item label="手机号码：">
                    <el-input v-model="seepriseDataForm.mobile" placeholder="手机号码"></el-input>
                </el-form-item>
                <el-form-item label="客户编号：">
                    <el-input v-model="seepriseDataForm.prisecustNum" placeholder="客户编号"></el-input>
                </el-form-item>
                <el-form-item label="营业执照：">
                    <!-- <el-upload class="avatar-uploader" :action="priseurl" accept="image/jpeg,image/jpg,image/png" :show-file-list="false" :on-success="perisehandleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="priseimageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span>（上传后，以下部分信息可自动导入）</span> -->
                </el-form-item>
                <el-form-item label="公司名称：">
                    <el-input v-model="seepriseDataForm.priseComName" placeholder="公司名称"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号：">
                    <el-input v-model="seepriseDataForm.businNum" placeholder="营业执照号"></el-input>
                </el-form-item>
                <el-form-item label="公司地址：">
                    <el-input v-model="seepriseDataForm.priseaddress" placeholder="公司地址"></el-input>
                </el-form-item>
                <el-form-item label="法人姓名：">
                    <el-input v-model="seepriseDataForm.priseName" placeholder="法人姓名"></el-input>
                </el-form-item>
                <el-form-item label="营业期限：">
                    <el-input v-model="seepriseDataForm.prisetimelimit1" placeholder="开始" style="width:35%"></el-input> 至
                    <el-input v-model="seepriseDataForm.prisetimelimit2" placeholder="结束" style="width:35%"></el-input>
                </el-form-item>
                <el-form-item label="经营范围：">
                    <el-input type="textarea" v-model="seepriseDataForm.priseDesc" placeholder="经营范围" readonly></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="entriseVisible = false">取 消</el-button>
                    <el-button type="primary" @click="entriseVisible = false">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                perseeVisible: false,
                entriseVisible:false,
                perseeDataForm: {
                    mobile: '',
                    custNum: '',
                    custNanme: '',
                    perIdno: '',
                    peraddress: '',
                    pertimelimit: '',
                    peremail: '',
                },
                seepriseDataForm: {
                    mobile: '',
                    prisecustNum: '',
                    priseComName: '',
                    businNum: '',
                    priseaddress: '',
                    priseName: '',
                    prisetimelimit: '',
                    priseDesc: '',
                    bussicLice: ''
                },
                labelPosition: 'right',
            }
        },
        methods: {
            seeInit(arr) {
                console.log(arr[0])
                console.log(arr[1])
                if (arr[1] == 1) {  //个人
                    this.perseeVisible = true

                } else { //企业
                   this.entriseVisible=true
                }

            }
        }
    }

</script>
<style>
    .seecuslog .el-input__inner,.seecuslog  .el-textarea__inner {
        border: none;
    }
</style>
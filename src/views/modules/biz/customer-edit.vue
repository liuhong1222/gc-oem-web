<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="dataForm.companyName" placeholder="公司名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="mark">
              <el-input v-model="dataForm.mark" placeholder="备注"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isEmail, isMobile } from '@/utils/validate'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          companyName: ''
        },
        dataRule: {
          companyName: [
            { required: true, message: '公司名不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
    init (id) {
      this.visible = true
      this.dataForm.id = id || 0
      if(this.dataForm.id){
        this.$http({
          url: this.$http.adornUrl(``),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.dataForm.companyName = data.obj.companyName
        } else {
        }
      })
      }

    },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/biz/customer/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'companyName': this.dataForm.companyName
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>

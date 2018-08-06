<template>
    <el-form :inline="true" :model="dataForm" label-width="100px" >
      <el-form-item label="搜索账户">
		    	<el-autocomplete
			      class="inline-input"
			      v-model="dataForm.name"
			      :fetch-suggestions="querySearch"
			      placeholder="请输入电话、名称或编号"
			      :trigger-on-focus="false"
			      @select="handleSelect"
			    ></el-autocomplete>
      </el-form-item> <br />
      <el-form-item label="账户编号">
					{{dataForm.accNo || '-'}}
      </el-form-item><br />
      <el-form-item label="企业名称">
					{{dataForm.companyName || '-'}}
      </el-form-item><br />
      <el-form-item label="联系电话">
					{{dataForm.phoneNum || '-'}}
      </el-form-item><br />
      <el-form-item label="当前余额(元)">
					{{dataForm.oldBalance || '-'}}
      </el-form-item><br />
      <el-form-item label="增减余额(元)">
		<el-input v-model="dataForm.balance" placeholder="调整值" clearable></el-input>
      </el-form-item><br />
      <el-form-item label="备注">
		<el-input v-model="dataForm.remark" placeholder="请输入本次操作备注" type="textarea" clearable></el-input>
      </el-form-item><br />
      <el-form-item >
		<el-button v-if="isAuth('biz:balance:save')"  style="margin-left: 50px;"  type="primary" @click="modifyBalance(1)" :disabled="this.dataForm.accNo=='' || this.dataForm.balance==null">紧急充值</el-button>
		<el-button v-if="isAuth('biz:balance:save')"   type="danger" @click="modifyBalance(2)" :disabled="this.dataForm.accNo=='' || this.dataForm.balance==null">减少余额</el-button>
      </el-form-item>

    </el-form>
</template>

<script>
  export default {
    data () {
      return {
        dataForm: {
          name: '',
          companyName: '',
          accNo: '',
          oldBalance: null,
          balance: null,
          phoneNum: '',
          remark: '',
          type: ''
        }
      }
    },
    methods: {
      // 获取数据
      querySearch (queryString, cb) {
        this.dataForm.accNo = ''
        this.dataForm.phoneNum = ''
        this.dataForm.companyName = ''
        this.dataForm.oldBalance = null
        this.dataForm.type = null
        this.$http({
          url: this.$http.adornUrl('/biz/balance/account'),
          method: 'get',
          params: this.$http.adornParams({
            'name': this.dataForm.name
          })
        }).then(({data}) => {
          if (data && data.code === 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              data.data[i]['value'] = data.data[i]['companyName']
            }
            console.log(data.data)
            cb(data.data)
          }
        })
      },
      handleSelect (data) {
        this.dataForm.accNo = data.accNo
        this.dataForm.phoneNum = data.phoneNum
        this.dataForm.companyName = data.companyName
        this.$http({
          url: this.$http.adornUrl('/biz/balance'),
          method: 'get',
          params: this.$http.adornParams({
            'accNo': data.accNo
          })
        }).then(({data}) => {
          if (data && data.code === 0 && data.data) {
            this.dataForm.oldBalance = data.data
          }
        })
      },
      modifyBalance (type) {
        if (this.dataForm.balance <= '0') {
          this.$message.error('请输入大于0的值')
          return
        }
        if (this.dataForm.remark === '') {
          this.$message.error('请输入备注')
          return
        }
        this.$confirm('确认要执行吗？')
          .then(_ => {
            this.dataForm.type = type
            this.modify()
          })
          .catch(_ => {})
      },
      modify () {
        this.$http({
          url: this.$http.adornUrl('/biz/balance'),
          method: 'put',
          params: this.$http.adornParams({
            'accNo': this.dataForm.accNo,
            'balance': this.dataForm.balance,
            'remark': this.dataForm.remark,
            'type': this.dataForm.type
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.balance = null
            this.dataForm.remark = ''
            this.$message({
              message: '余额调整成功',
              type: 'success'
            })
            this.$http({
              url: this.$http.adornUrl('/biz/balance'),
              method: 'get',
              params: this.$http.adornParams({
                'accNo': this.dataForm.accNo
              })
            }).then(({data}) => {
              if (data && data.code === 0 && data.data) {
                this.dataForm.oldBalance = data.data
              }
            })
          } else {
            this.$message.error('余额调整失败，' + data.msg)
          }
        })
      }
    }
  }
</script>

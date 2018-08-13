<template>
  <div class="mod-schedule">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-date-picker v-model="dataForm.dates" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
          onPick="getDataList()" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column prop="date" header-align="center" align="center" label="日期">
      </el-table-column>
      <el-table-column prop="newAccount" header-align="center" align="center" label="日新增用户">
      </el-table-column>
      <el-table-column prop="activeAccount" header-align="center" align="center" label="日活跃用户">
      </el-table-column>
      <el-table-column prop="rechargeAccount" header-align="center" align="center" label="日充值用户">
      </el-table-column>
      <el-table-column prop="newOrders" header-align="center" align="center" label="日订单数">
      </el-table-column>
      <el-table-column prop="rechargeAmount" header-align="center" align="center" label="日充值金额(元)">
      </el-table-column>
      <el-table-column prop="expend" header-align="center" align="center" label="日消费金额(元)">
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[7]"
      :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dataForm: {
          startDate: '',
          endDate: '',
          dates: []
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 7,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: []
      }
    },
    activated() {
      this.getDataList()
    },
    methods: {
      formatDate(date) {
        var seperator1 = '-'
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate
        return currentdate
      },
      // 获取数据列表
      getDataList() {
        if (this.dataForm.dates && this.dataForm.dates.length === 0) {
          var date = new Date()
          this.dataForm.dates[1] = this.formatDate(date)
          date.setDate(date.getDate() - 6)
          this.dataForm.dates[0] = this.formatDate(date)
        }
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('biz/report/statis/daily'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'size': this.pageSize,
            'start': this.dataForm.dates[0],
            'end': this.dataForm.dates[1]
          })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataList = data.data.list
            this.totalPage = data.data.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      }
    }
  }

</script>
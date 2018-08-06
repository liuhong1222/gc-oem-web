<template>
  <div class="mod-demo-echarts">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartLineBox" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data () {
      return {
        dataForm: {
          dates: []
        },
        dataList: []
      }
    },
    mounted () {
      this.chartLine()
      this.getData()
    },
    methods: {
      formatDate (date) {
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
      getData () {
        var date = new Date()
        this.dataForm.dates[1] = this.formatDate(date)
        date.setDate(date.getDate() - 6)
        this.dataForm.dates[0] = this.formatDate(date)
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('biz/report/statis/daily'),
          method: 'get',
          params: this.$http.adornParams({
            'page': 1,
            'size': 7,
            'start': this.dataForm.dates[0],
            'end': this.dataForm.dates[1]
          })
        }).then(({data}) => {
          console.log(data)
          if (data && data.code === 0) {
            this.dataList = data.data.list
            console.log(this.dataList)
            this.chartLine()
          }
          this.dataListLoading = false
        })
      },
      // 折线图
      chartLine () {
        var xAxis = []
        var series1 = []
        var series2 = []
        var series3 = []
        var series4 = []
        var series5 = []
        var series6 = []
        if (this.dataList && this.dataList.length > 0) {
          var x = 0
          for (var i = this.dataList.length - 1; i >= 0; i--) {
            var data = this.dataList[i]
            xAxis[x] = data.date
            series1[x] = data.newAccount
            series2[x] = data.activeAccount
            series3[x] = data.rechargeAccount
            series4[x] = data.newOrders
            series5[x] = data.rechargeAmount
            series6[x] = data.expend
            x++
          }
        };
        var option = {
          'title': {
            'text': '日统计图表'
          },
          'tooltip': {
            'trigger': 'axis'
          },
          'legend': {
            'data': ['日新增用户', '日活跃用户', '日充值用户', '日订单数', '日充值金额(元)', '日消费金额(元)']
          },
          'grid': {
            'left': '3%',
            'right': '4%',
            'bottom': '3%',
            'containLabel': true
          },
          'toolbox': {
            'feature': {
              'saveAsImage': { }
            }
          },
          'xAxis': {
            'type': 'category',
            'boundaryGap': false,
            'data': xAxis
          },
          'yAxis': {
            'type': 'value'
          },
          'series': [
            {
              'name': '日新增用户',
              'type': 'line',

              'data': series1
            },
            {
              'name': '日活跃用户',
              'type': 'line',

              'data': series2
            },
            {
              'name': '日充值用户',
              'type': 'line',

              'data': series3
            },
            {
              'name': '日订单数',
              'type': 'line',

              'data': series4
            },
            {
              'name': '日充值金额(元)',
              'type': 'line',

              'data': series5
            },
            {
              'name': '日消费金额(元)',
              'type': 'line',
              'data': series6
            }
          ]
        }
        var chart = echarts.init(document.getElementById('J_chartLineBox'))
        chart.setOption(option)
        window.addEventListener('resize', () => {
          chart.resize()
        })
      }
    }
  }
</script>

<style lang="scss">
  .mod-demo-echarts {
    > .el-row {
      margin-top: -10px;
      margin-bottom: -10px;
      .el-col {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .chart-box {
      min-height: 400px;
    }
  }
</style>

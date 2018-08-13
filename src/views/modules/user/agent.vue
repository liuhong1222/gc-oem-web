<template>
    <div class="main">
        <div class="topSearch">
            <h2>OEM列表</h2>
            <el-form :inline="true" :model="searchData">
                <el-form-item label="创建时间：">
                    <el-date-picker v-model="searchData.dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="代理商名称：" style="margin-left:25px;">
                    <el-input v-model="searchData.agentName" placeholder="代理商名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input v-model="searchData.mobile" placeholder="手机号" clearable></el-input>
                </el-form-item>
                <el-form-item label="代理商状态：">
                    <el-select v-model="searchData.status" placeholder="代理商状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已禁用" value="0"></el-option>
                        <el-option label="使用中" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getDataList()">查询</el-button>
                    <el-button type="primary" @click="exporTable">导出</el-button>
                    <el-button v-if="isAuth('sys:user:save')" type="primary" @click="addUpdateAgent()">新增代理商</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="agentTable">
            <el-table :data="agentTableData" style="width: 100%" v-loading="dataListLoading" :header-cell-style="getRowClass">
                <el-table-column type="index" header-align="center" align="center" width="80" fixed label="序号">
                </el-table-column>
                <el-table-column prop="agentNo" label="代理商编号" width="90" align="center">
                </el-table-column>
                <el-table-column prop="mchId" label=" 商户编号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="companyName" label=" 代理商名称" width="165" align="center">
                </el-table-column>
                <el-table-column prop="statusName" label=" 代理商状态" width="90" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="日期" width="150" align="center">
                </el-table-column>
                <el-table-column prop="canUpgradeName" label="是否升级" width="80" align="center">
                </el-table-column>
                <el-table-column prop="levelName" label="代理等级" width="120" align="center">
                </el-table-column>
                <el-table-column prop="totalRechargeMoney" label="充值总计（元）" width="120" align="center">
                </el-table-column>
                <el-table-column prop="totalRechargeNumber" label="充值总条数" width="120" align="center">
                </el-table-column>
                <el-table-column prop="emptyBalance" label="剩余条数" width="120" align="center">
                </el-table-column>
                <el-table-column prop="emptyCreditNumber" label="允许超出条数" width="120" align="center">
                </el-table-column>
                <el-table-column prop="mobile" label="联系电话" width="120" align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="165" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row.agentId)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small" @click="addUpdateAgent(scope.row.agentId)">修改</el-button>
                        <el-button type="text" size="small" @click="chdataBtn(scope.row.agentId)">充值</el-button>
                        <el-button type="text" size="small" @click="disableAndEnabled(scope.row)">禁用</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="agentPage">
            <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[3, 5]"
                :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <!-- 充值弹窗 -->
        <el-dialog title="充值" :visible.sync="chdataFormVisible">
            <el-form :model="chdataForm" ref="chdataFormref" :rules="chdataFormrefRule" label-width="100px">
                <el-form-item label="充值账号">
                    <el-input style="border:none" v-model="chdataForm.accnumber" placeholder="" readonly id="chprice"></el-input>
                </el-form-item>
                <el-form-item label="充值单价" prop="chPrice">
                    <el-input v-model.number="chdataForm.chPrice" placeholder="充值单价"></el-input>
                </el-form-item>
                <el-form-item label="充值金额" prop="chMoney">
                    <el-input v-model.number="chdataForm.chMoney" placeholder="充值金额"></el-input>
                    <span>元</span>
                </el-form-item>
                <el-form-item label="充值条数" prop="chCounts">
                    <el-input v-model.number="chdataForm.chCounts" placeholder="请输入充值条数"></el-input>
                    <span>条</span>
                </el-form-item>
                <el-form-item label="入账类型" prop="type">
                    <el-select v-model="chdataForm.type" placeholder="入账类型">
                        <el-option label="支付宝" value="0"></el-option>
                        <el-option label="对公转账" value="1"></el-option>
                        <el-option label="赠送" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="chdataForm.remark" placeholder="请输入备注..."></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="chdataFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="chsubmit">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 禁用，启用 -->
        <el-dialog :title="disableTitlt" :visible.sync="disableVisible" width="30%">
            <p v-show="jinShow">您将禁用账号<input type="text" value="*****" style="border:none;width:30px">，禁用后该账户将不可登录该系统</p>
            <p v-show="qiShow">您将启用账号<input type="text" value="*****" style="border:none;width:30px">，启用后该账户将恢复正常使用。</p>
            <span slot="footer" class="dialog-footer">
            <el-button @click="disableVisible = false">取 消</el-button>
            <el-button type="primary" @click="disableVisible = false">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 修改,新增 -->
        <add-or-update v-if="addSeeUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
        <!--查看 对话框 -->
        <see-dialog v-if="seeVisible" ref="seecon"></see-dialog>
    </div>
</template>
<script>
    import AddOrUpdate from './agent-add-or-update'
    import seeDialog from './agent-see-dialog'
    export default {
        data() {
            return {
                jinShow:false,
                qiShow:false,
                disableTitlt: "",
                disableVisible: false,
                addSeeUpdateVisible: false,
                seeVisible: false,
                searchData: {
                    dateTime: [],
                    agentName: "",
                    status: "",
                    mobile: ""
                },
                formInline: {
                    user: '',
                    region: ''
                },
                agentTableData: [],
                pageIndex: 1,
                pageSize: 3,
                totalPage: 0,
                dataListLoading: false,
                chdataFormVisible: false,
                chdataForm: {
                    accnumber: '上海创蓝传播有限公司',
                    chPrice: '',
                    chCounts: '',
                    type: '',
                    chMoney: '',
                    remark: ''
                },
                chdataFormrefRule: {
                    chPrice: [
                        { required: true, message: '请输入单价', trigger: 'blur' },
                        { type: 'number', message: '金额必须为数字' }
                    ],
                    chMoney: [
                        { required: true, message: '请输入金额', trigger: 'blur' },
                        { type: 'number', message: '金额必须为数字' }
                    ],
                    chCounts: [
                        { required: true, message: '请输入条数', trigger: 'blur' },
                        { type: 'number', message: '条数必须为数字' }
                    ],
                    type: [
                        { required: true, message: '请选择入账类型', trigger: 'blur' }
                    ],

                },
            }
        },
        components: {
            AddOrUpdate,
            seeDialog
        },
        activated() {
            this.getDataList()
        },
        methods: {
            // 获取代理商列表
            getDataList() {
                console.log(this.searchData.dateTime)
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl(`agent/agentInfo/list?token=${this.$cookie.get('token')}`),
                    method: 'get',
                    params: this.$http.adornParams({
                        'currentPage': this.pageIndex,
                        'pageSize': this.pageSize,
                        'companyName': this.searchData.agentName,
                        'status': this.searchData.status,
                        'mobile': this.searchData.mobile,
                        'startTime': '' || this.searchData.dateTime == null ? '' : this.searchData.dateTime[0],
                        'endTime': '' || this.searchData.dateTime == null ? '' : this.searchData.dateTime[1]
                    })
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        console.log(data)
                        this.agentTableData = data.data.list
                        this.totalPage = data.data.total
                    } else {
                        this.agentTableData = []
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
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background-color: #f8f8f8;color:#666;'
                } else {
                    return ''
                }
            },
            exporTable() {

            },
            addUpdateAgent(id) {
                this.addSeeUpdateVisible = true
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.showInit(id)
                })
            },
            handleClick(id) {
                this.seeVisible = true
                this.$nextTick(() => {
                    this.$refs.seecon.showInit(id)
                })
            },
            chdataBtn() {
                this.chdataFormVisible = true
                this.$nextTick(() => {
                    this.$refs['chdataFormref'].resetFields();
                })
            },
            // 禁用启用
            disableAndEnabled(v) {
                if (v.status == 1) {
                    this.disableTitlt = '禁用'
                    this.jinShow=true
                    // 分别调用确定提交按钮
                } else if (v.status == 0) {
                    this.disableTitlt = '启用'
                    this.qiShow=true
                     // 分别调用确定提交按钮
                }
                this.disableVisible = true
            },
            // 提交充值
            chsubmit() {
                this.$refs['chdataFormref'].validate((valid) => {
                    if (valid) {
                        console.log(3333)
                    }
                })
            },
        }
    }

</script>
<style lang="scss">
    .topSearch {
        width: 100%;
        padding: 10px 23px 20px;
        background-color: #ffffff;
        margin-bottom: 24px;
        box-shadow: 0px 7px 9px 0px rgba(153, 153, 153, 0.05);
    }

</style>
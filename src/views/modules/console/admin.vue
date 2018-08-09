<template>
    <div class="main">
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <h2>嗨！{{ userName }}</h2>
                    <ul class="cf basicInfo">
                        <li v-for="(item,i) in basicInfoList" :key="i">
                            <p>{{item.title}}</p>
                            <input type="text" v-model="item.data" :value="item.data" readonly>
                            <button v-show="item.flag" @click="basicInfoBtn(i,item.data)">{{item.title === '邮箱' && item.data === '' ? '添加' : item.btnText}}</button>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="cf">
                        <h2>退款审核</h2>
                        <el-button type="text" style="float:right">查看详情</el-button>
                    </div>
                    <el-table :data="tableData" height="250" style="width: 100%" :highlight-current-row="false">
                        <el-table-column prop="comName" label="公司名称">
                        </el-table-column>
                        <el-table-column prop="date" label="充值时间">
                        </el-table-column>
                        <el-table-column prop="money" label="充值金额">
                        </el-table-column>
                        <el-table-column prop="counts" label="充值条数">
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <h2>OEM代理</h2>
                    <ul class="cf customerList">
                        <li v-for="(item,index) in oemAgent" :key="index">
                            <p>{{item.title}}</p>
                            <p>{{item.counts}}</p>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <!-- 添加邮箱 -->
        <el-dialog title="添加邮箱" :visible.sync="addEmailVisible">
            <el-form :model="addemailform" :rules="addemailrules" ref="addemailruleForm">
                <el-form-item label="新邮箱" prop="email">
                    <el-input v-model="addemailform.email" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addEmailBtn()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 更改邮箱 -->
        <el-dialog title="重新绑定邮箱" :visible.sync="reEmailVisible">
            <el-form :model="reemailform" :rules="reemailrules" ref="reemailruleForm">
                <el-form-item label="原邮箱" prop="oldemail">
                    <el-input v-model="reemailform.oldemail" auto-complete="off" id="emailInput" readonly></el-input>
                </el-form-item>
                <el-form-item label="新邮箱" prop="newemail">
                    <el-input v-model="reemailform.newemail" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="reEmailBtn()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { isEmail, isMobile } from '@/utils/validate'
    export default {
        data() {
            var validateEmail = (rule, value, callback) => {
                if (!isEmail(value)) {
                    callback(new Error('邮箱格式错误'))
                } else {
                    callback()
                }
            }
            return {
                addEmailVisible: false,
                reEmailVisible: false,
                addemailform: {
                    email: ''
                },
                addemailrules: {
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                },
                reemailform: {
                    oldemail: '',
                    newemail: ''
                },
                basicInfoList: [
                    { title: '我的代办', data: '10', flag: false },
                    { title: '职位', data: '产品专员', flag: false },
                    { title: '手机号', data: '17612163551', flag: true, btnText: '更改' },
                    { title: '邮箱', data: '984459368@qq.com', flag: true, btnText: '更改' }
                ],
                reemailrules: {
                    newemail: [
                        { required: true, message: '新邮箱不能为空', trigger: 'blur' },
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                },
                tableData: [
                    {
                        comName: '上海创蓝文化传播有限公司',
                        date: '2018-07-12 09:01:08',
                        money: '1000',
                        counts: '2000'
                    }, {
                        comName: '上海创蓝文化传播有限公司',
                        date: '2018-07-12 09:01:08',
                        money: '1000',
                        counts: '2000'
                    }, {
                        comName: '上海创蓝文化传播有限公司',
                        date: '2018-07-12 09:01:08',
                        money: '1000',
                        counts: '2000'
                    }, {
                        comName: '上海创蓝文化传播有限公司',
                        date: '2018-07-12 09:01:08',
                        money: '1000',
                        counts: '2000'
                    }, {
                        comName: '上海创蓝文化传播有限公司',
                        date: '2018-07-12 09:01:08',
                        money: '1000',
                        counts: '2000'
                    }
                ],
                oemAgent: [
                    { title: '客户数量', counts: '10000' },
                    { title: '客户充值总计', counts: '1000' },
                    { title: '客户消费条数', counts: '1000,000' }
                ],
            }
        },
        computed: {
            userName: {
                get() { return this.$store.state.user.name }
            }
        },
        methods: {
            basicInfoBtn(arrindex, con) {
                if (arrindex == 2) {  //概更改手机号
                } else if (arrindex == 3) {
                    if (con == "") {
                        console.log("添加弹出框");
                        this.addEmailVisible = true
                        this.$nextTick(() => {
                            this.$refs['addemailruleForm'].resetFields();
                        })
                    } else {
                        console.log("修改弹出框");
                        this.reemailform.oldemail = this.basicInfoList[3].data
                        this.reEmailVisible = true;
                        this.$nextTick(() => {
                            this.$refs['reemailruleForm'].resetFields();
                        })
                    }
                }
            },
            // 添加邮箱
            addEmailBtn() {
                this.$refs['addemailruleForm'].validate((valid) => {
                    if (valid) {
                        console.log(3333)
                    }
                })
            },
            // 修改邮箱
            reEmailBtn() {
                this.$refs['reemailruleForm'].validate((valid) => {
                    if (valid) {
                        console.log(2222222)
                    }
                })
            },
        }
    }

</script>
<style>
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #fff;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 340px;
        margin-bottom: 20px;
        padding: 10px 20px;
    }

    .grid-content h2 {
        display: inline-block;
        font-size: 20px;
        color: #333;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .basicInfo li {
        width: 48%;
        height: 100px;
        float: left;
        text-align: center
    }

    .basicInfo li input {
        width: 100%;
        border: none;
        display: block;
        font-size: 18px;
        font-weight: 700;
        color: #666;
        text-align: center;
    }

    .basicInfo li:first-child input {
        font-size: 30px;
        color: #4680ff;
    }

    .basicInfo li button {
        width: 48px;
        height: 24px;
        border: solid 1px #999;
        background-color: #fff;
        color: #7b7b7b;
        font-size: 12px;
        cursor: pointer;
        margin-top: 15px;
    }

    .basicInfo li button:hover {
        border: none;
        background-color: #4680ff;
        color: #fff;
    }

    .el-table {
        min-height: 0px;
        font-size: 14px;
    }

    .el-table td,
    .el-table th.is-leaf {
        border-bottom: 0
    }

    .el-table td {
        padding: 10px 0;
        text-align: center
    }

    .el-table th {
        color: #666;
        font-weight: 400;
        text-align: center
    }

    .el-table::before {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0px;
    }
</style>
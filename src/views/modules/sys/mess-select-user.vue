<template>
    <el-dialog title="选定用户" :visible.sync="dialogTableVisible" width="50%" @close="clseoeoe">
        <div style="text-align: center">
            <el-transfer style="text-align: left; display: inline-block" v-model="value4" filterable :titles="['全部', '已选中']" :button-texts="['删除', '选中']"
                :format="{
                  noChecked: '${total}',
                  hasChecked: '${checked}/${total}'
                }" @change="handleChange" :data="list">
                <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
                <el-button class="transfer-footer" slot="right-footer" size="small" type="primary" @click="trueSave" style="margin:3px 75px 0">确定</el-button>
                <!-- <el-button class="transfer-footer" slot="right-footer" size="small">取消</el-button> -->
            </el-transfer>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        data() {
            return {
                disable: true,
                dialogTableVisible: false,
                list: [],
                value4: [],   //选定的用户
            };
        },

        methods: {
            showInit() {
                this.dialogTableVisible = true
                this.list = this.generateData()
                // console.log(this.list)
                // this.findUserIdMobile()
            },
            handleChange(value, direction, movedKeys) {
                this.value4 = value
                // console.log(value)
                // console.log(value, direction, movedKeys);
                // 点击确定
            },
            trueSave() {
                if (this.value4.length == 0) {
                    this.$message.warning('请先选择用户!');
                    return
                }
                this.dialogTableVisible=false
                this.$emit('childByValue', this.value4)  //子给父传值
            },
            // 获取数据
            generateData() {
                const dataList = [];
                this.$http({
                    url: this.$http.adornUrl(`agent/message/findUserIdMobileByMobile?token=${this.$cookie.get('token')}`),
                    method: 'post',
                    params: this.$http.adornParams({})
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        for (let i = 0; i < data.data.length; i++) {
                            // console.log(data.data[i].id)
                            dataList.push({
                                key: data.data[i].id,
                                label: data.data[i].user_phone,
                            });
                        }

                    }
                })
                return dataList;
            },
            clseoeoe() {  //关闭弹窗
                this.value4 = []  //清空右面数据
                this.list = []  //清空数据
            }
        },
    };

</script>
<style>

</style>
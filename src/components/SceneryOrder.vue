<template>
  <section id="wrap">
    <h1 class="userClass">导游预约信息</h1>
    <!--工具条-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true" :model="userSearch">
        <el-form-item>
          <span>预约用户筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="userSearch.value" placeholder="预约用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="guiderOrderAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      v-loading="listLoading"
      highlight-current-row
      :data="sceneryOrderInfoList"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" >
            <el-form-item label="预约用户编码:">
              <span>{{ props.row.bg_UserID }}</span>
            </el-form-item>
            <el-form-item label="预约用户:">
              <span>{{ props.row.bg_UserName }}</span>
            </el-form-item>
            <el-form-item label="预约导游名称:">
              <span>{{ props.row.bg_GuiderName }}</span>
            </el-form-item>
            <el-form-item label="预约开始时间:">
              <span>{{ props.row.bg_BookFromTime }}</span>
            </el-form-item>
            <el-form-item label="预约结束时间:">
              <span>{{ props.row.bg_BookEndTime }}</span>
            </el-form-item>
            <el-form-item label="支付金额:">
              <span>{{ props.row.bg_PayMoney +"元"}}</span>
            </el-form-item>
            <el-form-item label="支付方式:">
              <span>{{ props.row.bg_PayWay }}</span>
            </el-form-item>
            <el-form-item label="创建预约时间:">
              <span>{{ props.row.bg_CreateTime }}</span>
            </el-form-item>
            <el-form-item label="支付时间:">
              <span>{{ props.row.bg_PayTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="预约用户编码"
        prop="bg_UserID">
      </el-table-column>
      <el-table-column
        label="预约用户"
        prop="bg_UserName">
      </el-table-column>
      <el-table-column
        label="预约导游名称"
        prop="bg_GuiderName">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="SceneryOrderEdit(scope.row.bg_UserID)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="SceneryOrderDelete(scope.row.bg_UserID)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="total"
        v-show="total"
        style="float:right;"
      >
      </el-pagination>
    </el-col>

    <!--添加预约导游-->
    <el-dialog title="添加预约导游" :visible.sync="addSceneryOrderDialog">
      <el-form :model="AddSceneryOrderType">
        <el-form-item label="导游编号" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddSceneryOrderType.UserID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导游名称" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddSceneryOrderType.UserName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="预约开始时间" :label-width="formLabelWidth"  :required="isOff">
          <el-date-picker
            v-model="AddSceneryOrderType.BookFromTime"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预约结束时间" :label-width="formLabelWidth"  :required="isOff">
          <el-date-picker
            v-model="AddSceneryOrderType.BookEndTime"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付时间" :label-width="formLabelWidth"  :required="isOff">
          <el-date-picker
            v-model="AddSceneryOrderType.PayTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSceneryOrderDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSceneryOrderDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改导游-->
    <el-dialog title="修改导游" :visible.sync="updateGuiderInfoDialog">
      <el-form :model="guiderEditObj">
        <el-form-item label="导游编号" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="guiderEditObj.gi_Code" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="导游名称" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="guiderEditObj.gi_Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导游电话" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="guiderEditObj.gi_Telephone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth"  :required="isOff">
          <el-select v-model="guiderEditObj.gi_Sex" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="导游等级" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="guiderEditObj.gi_Level" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导游从业年限" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="guiderEditObj.gi_DoYears" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导游身份证号" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="guiderEditObj.gi_CertNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导游简介" :label-width="formLabelWidth">
          <el-input v-model="guiderEditObj.gi_Introduce" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导游出场费" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="guiderEditObj.gi_Fee" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否空闲" :label-width="formLabelWidth"  :required="isOff">
          <el-select v-model="guiderEditObj.gi_IsFree" placeholder="请选择是否空闲">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="guiderEditObj.gi_Remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateGuiderInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateGuiderInfoDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() <= Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        formLabelWidth:'120px',
        isOff:true,
        listLoading:false,
        addSceneryOrderDialog:false,
        updateGuiderInfoDialog:false,
        currentPage1:1,
        total:0,
        userSearch:{
          value:'',
        },
        //请求参数
        getData:{
          Code:'',
          UserID:'',
          UserName:'',
          BookFromTimefrom:'',
          BookFromTimeto:'',
          BookEndTimefrom:'',
          BookEndTimeto:'',
          GuiderCode:'',
          GuiderName:'',
          PayMoneyfrom:'',
          PayMoneyto:'',
          PayWay:'',
          CreateTimefrom:'',
          CreateTimeto:'',
          PayTimefrom:'',
          PayTimeto:'',
          IsDelete:'',
          PageNum:1,
          Rows:5,
        },
        //添加参数
        AddSceneryOrderType:{
          loginUserID:'huileyou',
          loginUserPass:123,
          UserID:'',
          UserName:'',
          BookFromTime:'',
          BookEndTime:'',
          GuiderCode:'',
          GuiderName:'',
          PayTime:'',
          SellID:'',
          SellName:''
        }
      }
    },
    computed: mapGetters([
      'sceneryOrderInfoList',
      'guiderEditObj'
    ]),
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(num)
      },
      //初始化
      initData(num){
        this.getData.PageNum = '' + num;
        this.getData.UserName = this.userSearch.value.trim();
        this.listLoading = true;
        this.$store.dispatch('getSceneryOrderInfoList',this.getData)
          .then(total=>{
            this.total = total;
            this.listLoading = false;
          }, err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search(){
        this.initData(1);
      },
      //添加
      guiderOrderAdd(){
        this.addSceneryOrderDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addSceneryOrderDialogSubmit(){
        if(this.AddGuiderInfoType.Code.trim()==''
          ||this.AddGuiderInfoType.Name.trim()==''
          ||this.AddGuiderInfoType.Password.trim()==''
          ||this.AddGuiderInfoType.chackPassword.trim()==''
          ||this.AddGuiderInfoType.Telephone.trim()==''
        ){
          this.$message({
            showClose: true,
            message: '输入内容不能为空！',
            type: 'error'
          });
          return;
        }
        if(isNaN(this.AddGuiderInfoType.Code)||isNaN(this.AddGuiderInfoType.Telephone)){
          this.$message({
            showClose: true,
            message: '输入编号或电话不是数字！',
            type: 'error'
          });
          return;
        }
        if(!(this.AddGuiderInfoType.Password.trim()===this.AddGuiderInfoType.chackPassword.trim())){
          this.$message({
            showClose: true,
            message: '密码和确认密码不一致！',
            type: 'error'
          });
          return;
        }
        delete this.AddGuiderInfoType.chackPassword;

//        this.$store.dispatch('AddGuiderInfo',this.AddGuiderInfoType)
//          .then(()=>{
//            this.$message({
//              showClose: true,
//              message: '添加成功',
//              type: 'success'
//            });
//            this.total = 0;
//            this.initData(1)
//          },err=>{
//            this.$message({
//              showClose: true,
//              message: err,
//              type: 'error'
//            });
//          });
//        this.addGuiderInfoDialog = false;
      },
      //修改
      SceneryOrderEdit(id){
        this.updateGuiderInfoDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('setGuiderEditObj',id)
      },
      //修改提交
      updateGuiderInfoDialogSubmit(){
        this.$store.dispatch('updateGuiderInfo',this.guiderEditObj)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
            this.total = 0;
            this.initData(1);
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
        this.updateGuiderInfoDialog = false;
      },
      //删除
      SceneryOrderDelete(id){
        this.$store.dispatch('GuiderDelete',id)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.total = 0;
            this.initData(1);
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      }
    },
  }
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  #wrap {
    background: #fff;
  }

  .formSearch {
    padding: 20px 0 0 20px;
  }

  .userClass {
    padding: 20px 0 0 20px;
    font-size: 18px;
  }

</style>

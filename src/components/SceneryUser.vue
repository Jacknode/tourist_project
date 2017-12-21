<template>
  <section id="wrap">
    <h1 class="userClass">导游信息</h1>
    <!--工具条-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true" :model="userSearch">
        <el-form-item>
          <span>导游名称筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="userSearch.value" placeholder="导游名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="guiderAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      v-loading="listLoading"
      highlight-current-row
      :data="guiderInfoList"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="导游编号:">
              <span>{{ props.row.gi_Code }}</span>
            </el-form-item>
            <el-form-item label="导游名称:">
              <span>{{ props.row.gi_Name }}</span>
            </el-form-item>
            <el-form-item label="导游所属景区:">
              <span>{{ props.row.gi_SceneryName }}</span>
            </el-form-item>
            <el-form-item label="导游等级:">
              <span>{{ props.row.gi_Level }}</span>
            </el-form-item>
            <el-form-item label="导游电话号码:">
              <span>{{ props.row.gi_Telephone }}</span>
            </el-form-item>
            <el-form-item label="导游性别:">
              <span>{{ props.row.gi_Sex | getSex}}</span>
            </el-form-item>
            <el-form-item label="导游从业年限:">
              <span>{{ props.row.gi_DoYears }}</span>
            </el-form-item>
            <el-form-item label="导游身份证号:">
              <span>{{ props.row.gi_CertNo }}</span>
            </el-form-item>
            <el-form-item label="导游简介:">
              <span>{{ props.row.gi_Introduce }}</span>
            </el-form-item>
            <el-form-item label="导游出场费:">
              <span>{{ props.row.gi_Fee +"元"}}</span>
            </el-form-item>
            <el-form-item label="导游创建时间:">
              <span>{{ props.row.gi_CreateTime }}</span>
            </el-form-item>
            <el-form-item label="是否空闲:">
              <span>{{ props.row.gi_IsFree | getFree}}</span>
            </el-form-item>
            <el-form-item label="备注:">
              <span>{{ props.row.gi_Remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="导游编号"
        prop="gi_Code">
      </el-table-column>
      <el-table-column
        label="导游名称"
        prop="gi_Name">
      </el-table-column>
      <el-table-column
        label="导游电话号码"
        prop="gi_Telephone">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="GuiderEdit(scope.row.gi_Code)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="GuiderDelete(scope.row.gi_Code)">删除</el-button>
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

    <!--添加导游-->
    <el-dialog title="添加导游" :visible.sync="addGuiderInfoDialog">
      <el-form :model="AddGuiderInfoType">
        <el-form-item label="导游编号" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddGuiderInfoType.Code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导游名称" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddGuiderInfoType.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddGuiderInfoType.Password" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddGuiderInfoType.chackPassword" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="导游电话" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddGuiderInfoType.Telephone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGuiderInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="addGuiderInfoDialogSubmit">确 定</el-button>
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
        formLabelWidth:'120px',
        isOff:true,
        listLoading:false,
        addGuiderInfoDialog:false,
        updateGuiderInfoDialog:false,
        currentPage1:1,
        total:0,
        userSearch:{
          value:'',
        },
        //请求参数
        getData:{
          Code:'',
          Name:'',
          SceneryID:'',
          SceneryName:'',
          Telephone:'',
          Sex:'',
          DoYears:'',
          CertNo:'',
          HeadImage:'',
          Feefrom:'',
          Feeto:'',
          CreateTimefrom:'',
          CreateTimeto:'',
          IsFree:'',
          IsDelete:'',
          Remark:'',
          PageNum:1,
          Rows:5,
        },
        //添加参数
        AddGuiderInfoType:{
          loginUserID:'huileyou',
          loginUserPass:123,
          Code:'',
          Name:'',
          Password:'',
          chackPassword:'',
          Telephone:'',
        }
      }
    },
    computed: mapGetters([
        'guiderInfoList',
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
        this.getData.Name = this.userSearch.value.trim();
        this.listLoading = true;
        this.$store.dispatch('getGuiderInfoList',this.getData)
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
      guiderAdd(){
        this.addGuiderInfoDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addGuiderInfoDialogSubmit(){
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

        this.$store.dispatch('AddGuiderInfo',this.AddGuiderInfoType)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            });
            this.total = 0;
            this.initData(1)
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
        this.addGuiderInfoDialog = false;
      },
      //修改
      GuiderEdit(id){
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
      GuiderDelete(id){
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

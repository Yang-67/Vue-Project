<template>
  <div id="app">
    <el-main>
      <!-- 头 -->
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '' }">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-divider></el-divider>
      <!-- 搜索和添加 -->
      <div style="width: 1250px">
        <el-input
          style="width: 280px"
          placeholder="按姓名查找"
          type="text"
          v-model="inputStr"
          class="input-with-select"
        ></el-input>
        <el-input
          style="width: 280px"
          placeholder="按地址查找"
          type="text"
          v-model="inputAdress"
          class="input-with-select"
        ></el-input>
        <el-input
          style="width: 280px"
          placeholder="按邮箱查找"
          type="text"
          v-model="inputEmail"
          class="input-with-select"
        ></el-input>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="sarchData"
        ></el-button>
        <el-button icon="el-icon-refresh" @click="refresh">重置</el-button>
        <el-button
          style="float: right; margin-right: 20px"
          type="primary"
          @click="onhandAdd"
        >
          新增用户
        </el-button>
      </div>
      <h4></h4>
      <!-- 人员展示 -->
      <el-table :data="tableData" ref="tableDate">
        <el-table-column label="序号" type="index" width="40"></el-table-column>
        <el-table-column
          label="账号"
          prop="adminId"
          width="160"
        ></el-table-column>
        <el-table-column
          label="姓名"
          prop="adminName"
          width="100"
        ></el-table-column>
        <el-table-column label="性别" prop="adminSex" width="70">
          <template slot-scope="scope">
            <p v-if="scope.row.adminSex == 1">男</p>
            <p v-if="scope.row.adminSex == 0">女</p>
          </template>
        </el-table-column>
        <el-table-column
          label="年龄"
          prop="adminAge"
          width="70"
        ></el-table-column>
        <el-table-column label="角色" prop="adminIdentity" width="120">
          <template slot-scope="scope">
            <p v-if="scope.row.adminIdentity == 1">超级管理员</p>
            <p v-if="scope.row.adminIdentity == 2">管理员</p>
            <p v-if="scope.row.adminIdentity == 3">测试</p>
          </template>
        </el-table-column>
        <el-table-column
          label="联系电话"
          prop="adminPhone"
          width="120"
        ></el-table-column>
        <el-table-column
          label="邮箱"
          prop="adminEmail"
          width="150"
        ></el-table-column>
        <el-table-column label="家庭住址" prop="adminAddress"></el-table-column>
        <el-table-column label="操作" prop="num" width="190">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, tableData)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <div style="width: 50%; margin: 0 auto">
        <el-pagination
          background
          layout="sizes, prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-sizes="[5, 10, 15, 20]"
          @current-change="tabList"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <!-- 增加/修改 :before-close="handleClose"-->
      <el-dialog :title="addtitle" :visible.sync="dialogVisible" width="40%">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-form-item label="姓名" prop="adminName">
            <el-input v-model="ruleForm.adminName"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="adminSex">
            <el-radio-group v-model="ruleForm.adminSex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" prop="adminAge">
            <el-input v-model.number="ruleForm.adminAge"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="adminPhone">
            <el-input v-model.number="ruleForm.adminPhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="adminEmail">
            <el-input v-model="ruleForm.adminEmail"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址" prop="adminAddress">
            <el-input v-model="ruleForm.adminAddress"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="adminIdentity">
            <el-select
              v-model="ruleForm.adminIdentity"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleConfirm()">
            确 定
          </el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import { getAll } from "../../api/data";
import { deleteById } from "../../api/data";
import { insertAdmin } from "../../api/data";
import { updAdmin } from "../../api/data";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      dialogVisible: false, //是否显示dialog
      addtitle: "", //是否为添加或修改
      ruleForm: {
        adminId: "",
        adminName: "",
        adminSex: "",
        adminAge: "",
        adminAddress: "",
        adminEmail: "",
        adminPhone: "",
        adminIdentity: "",
      },
      rules: {
        adminName: [
          { required: true, message: "请输入员工姓名", trigger: "blur" },
          { min: 2, message: "长度在 2 个字符", trigger: "blur" },
        ],
        adminAge: [{ validator: checkAge, required: true, trigger: "blur" }],
        adminAddress: [
          { required: true, message: "家庭住址", trigger: "blur" },
        ],
        adminEmail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        adminPhone: [
          { validator: checkPhone, required: true, trigger: "blur" },
        ],
        adminSex: [
          { required: true, message: "请选择性别", trigger: "change" },
        ],
      },
      allid: "",
      inputStr: "",
      value: 1,
      value2: false,
      options: [
        {
          value: "1",
          label: "超级管理员",
        },
        {
          value: "2",
          label: "管理员",
        },
        {
          value: "3",
          label: "测试",
        },
      ],
      tableData: [],
      total: 0,
      pageSize: 5,
      currentPage: 0,
      inputEmail: "",
      inputAdress: "",
    };
  },
  computed: {},
  // 初始化数据
  created() {
    this.tabList(1);
  },
  methods: {
    // 数据初始化
    tabList(value) {
      getAll(
        value,
        this.inputStr,
        this.pageSize,
        this.inputEmail,
        this.inputAdress
      ).then(({ data: res }) => {
        if (res.code == 200) {
          this.total = res.data.total; //总数
          this.pageSize = res.data.count; //每页的数量
          this.currentPage = res.data.page; //页码
          this.tableData = res.data.items; //数据
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          });
        }
      });
    },
    // 搜索
    sarchData() {
      // var search = this.inputStr;
      // if (search) {
      //   this.tableData = this.tableData.filter(function (data) {
      //     return Object.keys(data).some(function (key) {
      //       return String(data[key]).toLowerCase().indexOf(search) > -1;
      //     });
      //   });
      // }
      // return this.tableData;
      this.tabList(1);
    },
    handleSizeChange(value) {
      this.pageSize = value;
      this.tabList(1);
    },
    //重置
    refresh() {
      (this.inputStr = ""),
        (this.inputEmail = ""),
        (this.inputAdress = ""),
        this.tabList(this.currentPage);
    },
    // 删除
    handleDelete(index, rows) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteById(rows[index].adminId).then(({ data: res }) => {
            if (res.code == 200) {
              rows.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 新增
    onhandAdd() {
      this.dialogVisible = true;
      this.ruleForm = {
        adminId: "",
        adminName: "",
        adminSex: "",
        adminAge: "",
        adminAddress: "",
        adminEmail: "",
        adminPhone: "",
        adminIdentity: "",
      };
      this.addtitle = "新增用户";
      this.allid = "";
    },
    // 编辑
    handleEdit(index, rows) {
      this.addtitle = "修改用户信息";
      this.dialogVisible = true; //显示弹框
      this.ruleForm = rows; //row当前行数据，把当前行的数据赋值给 表单
      this.allid = rows.adminId; //把id存全局
    },
    // 新增或编辑
    dialogVisibleConfirm() {
      if (this.allid === "") {
        insertAdmin(this.ruleForm).then(({ data: res }) => {
          if (res.code == 200) {
            this.dialogVisible = false;
            this.tabList(this.currentPage);
            this.$message({
              type: "success",
              message: "添加成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "添加失败",
            });
          }
        });
      } else {
        updAdmin(this.ruleForm).then(({ data: res }) => {
          if (res.code == 200) {
            this.allid = "";
            this.dialogVisible = false;
            this.tabList(this.currentPage);
            this.$message({
              type: "success",
              message: "修改成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "修改失败",
            });
          }
        });
      }
    },
  },
};
</script>

<style scoped></style>

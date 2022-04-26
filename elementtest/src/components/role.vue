<template>
  <div id="app">
    <el-main>
      <!-- 头 -->
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '' }">权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-divider></el-divider>
      <!-- 新增角色 -->
      <el-button
        style="float: left; margin-right: 20px"
        type="primary"
        @click="onhandAdd"
        >新增角色</el-button
      >
      <el-upload
        action="http://localhost:8081/import"
        :show-file-list="false"
        accept="xlsx"
        :on-success="handleExcelImportSuccess"
        style="display: inline-block"
      >
        <el-button type="primary" class="ml-5"
          >导入 <i class="el-icon-bottom"></i
        ></el-button>
      </el-upload>
      &nbsp;&nbsp;&nbsp;
      <el-button type="primary" @click="exp" class="ml-5"
        >导出 <i class="el-icon-top"></i
      ></el-button>
      <!-- 鱼骨 -->
      <el-skeleton :rows="6" animated :loading="skeleton" />
      <!-- 角色列表 -->
      <el-table
        :data="
          tableData.slice(
            (this.currentPage2 - 1) * pageSize,
            this.currentPage2 * pageSize
          )
        "
        style="width: 100%"
        ref="tableDate"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="说明">
                <el-tag type="success" v-if="props.row.rolePower == 1"
                  >权限1</el-tag
                >&nbsp;&nbsp;
                <el-tag type="success" v-if="props.row.rolePower == 2"
                  >权限2</el-tag
                >&nbsp;&nbsp;
                <el-tag type="success" v-if="props.row.rolePower == 3"
                  >权限3</el-tag
                >
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="角色名称" prop="roleName" width="300">
        </el-table-column>
        <el-table-column label="角色描述" prop="roleFunction" width="500">
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="handleEdit(scope.$index + 1, scope.row)"
              >编辑</el-button
            >
            <!-- <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, tableData)"
              >删除</el-button
            > -->
            <el-button
              size="small"
              type="info"
              plain
              icon="el-icon-setting"
              @click="handPower(scope.$index + 1, scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-main>
    <!-- 增加/修改 -->
    <el-dialog :title="addtitle" :visible.sync="dialogVisible" width="40%">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleFunction">
          <el-input v-model="ruleForm.roleFunction"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleConfirm()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { selectRole } from "../../api/data";
import { selectRoleCount } from "../../api/data";
export default {
  data() {
    return {
      ruleForm: {
        rolePower: "",
        roleName: "",
        roleFunction: "",
      },
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
          { min: 2, message: "长度大于 2 个字符", trigger: "blur" },
        ],
        roleFunction: [
          {
            required: true,
            message: "请输入角色描述",
            trigger: "blur",
          },
          { min: 2, message: "长度大于 2 个字符", trigger: "blur" },
          { max: 30, message: "长度小于30个字符", trigger: "blur" },
        ],
      },
      tableData: [],
      addtitle: "",
      dialogVisible: false,
      allid: "",
      skeleton: false,
      currentPage2: 1, //默认第一页
      total: 0, //总条数
      pageSize: 5, //默认展示5条
    };
  },
  created() {
    this.tabList();
  },
  methods: {
    //  数据初始化
    tabList() {
      selectRole().then(({ data: res }) => {
        if (res.code == 200) {
          this.skeleton = false;
          this.tableData = res.data;
        }
      });
      selectRoleCount().then(({ data: res }) => {
        if (res.code == 200) this.total = res.data;
      });
    },
    //  新增角色
    onhandAdd() {
      this.dialogVisible = true;
      this.ruleForm = {
        roleName: "",
        roleFunction: "",
        rolePower: "",
      };
      this.addtitle = "新增角色";
      this.allid = "";
    },
    //  编辑
    handleEdit(index, rows) {
      this.addtitle = "修改角色信息";
      this.dialogVisible = true; //显示弹框
      this.ruleForm = rows; //row当前行数据，把当前行的数据赋值给 表单
      this.allid = rows.index; //把id存全局
    },
    //  删除
    handleDelete(index, rows) {
      alert("删除" + index);
    },
    //  分配权限
    handPower(index, rows) {
      alert("分配权限" + index);
    },
    //  增加或编辑
    dialogVisibleConfirm() {
      if (this.allid == "") {
        alert("添加");
      } else {
        alert("修改");
      }
    },
    // 每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage2 = 1;
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage2 = val;
    },
    handleExcelImportSuccess() {
      this.$message.success("导入成功");
      this.tabList();
    },
    exp() {
      window.open("http://localhost:8081/export");
    },
  },
};
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
.block {
  width: 40%;
  margin: 0 auto;
}
</style>
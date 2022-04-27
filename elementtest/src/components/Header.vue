<template>
  <div style="line-height: 60px; display: flex">
    <div style="flex: 1">
      <span
        :class="collapseBtnClass"
        style="cursor: pointer; font-size: 18px"
        @click="collapse"
      ></span>

      <el-breadcrumb
        separator="/"
        style="display: inline-block; margin-left: 10px"
      >
      </el-breadcrumb>
    </div>
    <div class="user-avator">
      <img src="../assets/v.png" />
    </div>
    <el-dropdown style="width: 120px; cursor: pointer">
      <span>{{ userName }}</span>
      <i class="el-icon-arrow-down"></i>
      <el-dropdown-menu
        slot="dropdown"
        style="width: 100px; text-align: center"
      >
        <el-dropdown-item style="font-size: 14px; padding: 5px 0"
          ><span @click="userInfo">个人信息</span></el-dropdown-item
        >
        <el-dropdown-item style="font-size: 14px; padding: 5px 0"
          ><span @click="close">退出</span></el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog :title="addtitle" :visible.sync="dialogVisible" width="40%">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
        ><el-upload
          class="avatar-uploader"
          action="http://localhost: 8888/file/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="ruleForm.avatarUrl"
            :src="ruleForm.avatarUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Header",
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
      addtitle: "",
      ruleForm: {
        adminId: "",
        adminName: "",
        adminSex: "",
        adminAge: "",
        adminAddress: "",
        adminEmail: "",
        adminPhone: "",
        avatarUrl: "",
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
    };
  },
  computed: {
    userName() {
      return localStorage.getItem("userName")
        ? JSON.parse(localStorage.getItem("userName")).username
        : null;
    },
  },
  props: {
    collapseBtnClass: String,
    collapse: Function,
  },
  methods: {
    close() {
      localStorage.removeItem("userName");
      this.$router.push("/");
    },
    userInfo() {
      this.dialogVisible = true;
      this.addtitle = "个人信息";
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("k");
        }
      });
    },
    handleAvatarSuccess(res) {
      this.ruleForm.avatarUrl = res;
    },
  },
};
</script>

<style scoped>
.user-avator {
  margin-left: 20px;
}

.user-avator img {
  margin-top: 10px;
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.avatar-uploader {
  text-align: center;
  padding-bottom: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 138px;
  height: 138px;
  line-height: 138px;
  text-align: center;
}
.avatar {
  width: 138px;
  height: 138px;
  display: block;
}
</style>
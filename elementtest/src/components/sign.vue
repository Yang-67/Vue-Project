<template>
  <div id="app">
    <h2 align="center">注册</h2>
    <h6></h6>
    <span @click="loginUp">返回登录</span>
    <el-divider></el-divider>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="姓名" prop="adminName">
        <el-input v-model="ruleForm.adminName" class="w"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="adminSex">
        <el-radio-group v-model="ruleForm.adminSex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="adminAge">
        <el-input v-model.number="ruleForm.adminAge" class="w"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="adminPwd">
        <el-input
          type="password"
          v-model="ruleForm.adminPwd"
          autocomplete="off"
          class="w"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          class="w"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="adminPhone">
        <el-input
          v-model.number="ruleForm.adminPhone"
          maxlength="11"
          class="w"
        ></el-input>
      </el-form-item>
      <el-form-item label="家庭住址" prop="adminAddress">
        <el-input
          type="textarea"
          v-model="ruleForm.adminAddress"
          class="w"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="活动区域" prop="adminIdentity">
      <el-select v-model="ruleForm.adminIdentity" placeholder="请选择身份" class="w">
        <el-option label="初级管理员" value="1"></el-option>
        <el-option label="中级管理员" value="2"></el-option>
        <el-option label="高级管理员" value="3"></el-option>
      </el-select>
    </el-form-item> -->
      <el-form-item
        prop="adminEmail"
        label="邮箱"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="ruleForm.adminEmail" class="w"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMenu } from "../../api/data";
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
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.adminPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        adminName: "",
        adminSex: "",
        adminPwd: "",
        checkPass: "",
        adminAge: "",
        adminPhone: "",
        adminAddress: "",
        adminIdentity: 3,
        adminEmail: "",
      },
      rules: {
        adminName: [
          { required: true, message: "请输入姓名", trigger: "change" },
        ],
        adminSex: [
          { required: true, message: "请选择性别", trigger: "change" },
        ],
        adminPwd: [
          { validator: validatePass, required: true, trigger: "blur" },
        ],
        checkPass: [
          { validator: validatePass2, required: true, trigger: "blur" },
        ],
        adminAge: [{ validator: checkAge, required: true, trigger: "blur" }],
        adminPhone: [
          { validator: checkPhone, required: true, trigger: "blur" },
        ],
        adminAddress: [
          { required: true, message: "请输入家庭住址", trigger: "blur" },
        ],
        adminIdentity: [
          { required: true, message: "请选择身份", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.adminSex == "男") {
            this.ruleForm.adminSex = 1;
          } else {
            this.ruleForm.adminSex = 0;
          }
          getMenu(this.ruleForm).then(({ data: res }) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "注册成功",
              });
            } else {
              this.$message({
                type: "error",
                message: "注册失败",
              });
            }
          });
          // axios
          //   .post("http://localhost:8081/signUser", {
          //     adminName: this.ruleForm.adminName,
          //     adminPwd: this.ruleForm.checkPass,
          //     adminSex: this.ruleForm.adminSex,
          //     adminAge: this.ruleForm.adminAge,
          //     adminPhone: this.ruleForm.adminPhone,
          //     adminEmail: this.ruleForm.adminEmail,
          //     adminAddress: this.ruleForm.adminAddress,
          //     adminIdentity: this.ruleForm.adminIdentity,
          //   })
          //   .then((response) => {
          //     // 注册成功
          //     if (response.data == 1) {
          //       this.$message({
          //         type: "success",
          //         message: "注册成功",
          //       });
          //     } else {
          //       this.$message({
          //         type: "info",
          //         message: "注册失败",
          //       });
          //     }
          //   })
          //   .catch(function (error) {
          //     alert(error);
          //   });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loginUp() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.w {
  width: 500px;
}
#app {
  width: 800px;
  height: 100%;
  margin: 0 auto;
  margin-top: 100px;
  background: rgba(245, 243, 243, 0.5);
}
</style>
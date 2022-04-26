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
  </div>
</template>

<script>
export default {
  name: "Header",
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
    userInfo(){
      
    }
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
</style>
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
    <el-dropdown style="width: 120px; cursor: pointer">
      <el-avatar
        style="margin-top: 10px"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <span>{{ userName }}</span>
      <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu
        slot="dropdown"
        style="width: 100px; text-align: center"
      >
        <el-dropdown-item style="font-size: 14px; padding: 5px 0"
          >个人信息</el-dropdown-item
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
      return localStorage.getItem("userName") ? JSON.parse(localStorage.getItem("userName")).username : null;
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
  },
};
</script>

<style scoped>
</style>
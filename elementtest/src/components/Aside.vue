<template>
  <el-menu
    :default-openeds="['1']"
    style="min-height: 100%; overflow-x: hidden"
    background-color="#334256"
    text-color="#ffffff"
    active-text-color="#20a0ff"
    :collapse-transition="false"
    :collapse="isCollapse"
    router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img
        src="../assets/v.png"
        alt=""
        style="width: 20px; position: relative; top: 5px; right: 5px"
      />
      <b style="color: white" v-show="logoTextShow">后台管理系统</b>
    </div>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item index="/main1">
        &emsp;&emsp;<span>用户列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">权限管理</span>
      </template>
      <el-menu-item index="/role">
        &emsp;&emsp;<span>角色列表</span>
      </el-menu-item>
      <el-menu-item index="/powerList">
        &emsp;&emsp;<span>权限列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">商品管理</span>
      </template>
      <el-menu-item index="Shoppinglist">
        &emsp;&emsp;<span>商品列表</span>
      </el-menu-item>
      <el-menu-item index="/sortParam">
        &emsp;&emsp;<span>分类参数</span>
      </el-menu-item>
      <el-menu-item index="/shopSort">
        &emsp;&emsp;<span>商品分类</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">订单管理</span>
      </template>
      <el-menu-item index="/orderList">
        &emsp;&emsp;<span>订单列表</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/visualization">
      <i class="el-icon-setting"></i>
      <span slot="title">数据统计</span>
    </el-menu-item>
    <el-menu-item index="/files">
      <i class="el-icon-setting"></i>
      <span slot="title">文件管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean,
  },
};
</script>

<style scoped>
</style>

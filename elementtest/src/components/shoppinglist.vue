<template>
  <div id="app">
    <el-main>
      <!-- 头 -->
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '' }">商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-divider></el-divider>
      <div style="margin: 10px 0">
        <el-select v-model="value" placeholder="请选择类别">
          <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-option-group>
        </el-select>
        &nbsp;
        <el-input
          style="width: 200px"
          placeholder="请输入商品名称"
          suffix-icon="el-icon-search"
          v-model="shoppingName"
        ></el-input>
        &nbsp;
        <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
        <el-button
          style="float: right; margin-right: 20px"
          type="primary"
          @click="onhandAdd"
        >
          新增商品
        </el-button>
      </div>
      <div style="margin: 10px 0">
        <el-popconfirm
          class="ml-5"
          confirm-button-text="确定"
          cancel-button-text="我再想想"
          icon="el-icon-info"
          icon-color="red"
          title="您确定批量删除这些数据吗？"
          @confirm="delBatch"
        >
          <el-button type="danger" slot="reference"
            >批量删除 <i class="el-icon-remove-outline"></i
          ></el-button>
        </el-popconfirm>
      </div>
      <div>
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          border
          stripe
          :header-cell-class-name="'headerBg'"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品展示">
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                  </el-dialog>
                </el-form-item>
                <el-form-item label="商品介绍">
                  <span>{{ props.row.commodityState }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品 ID" prop="commodityId">
          </el-table-column>
          <el-table-column label="商品名称" prop="commodityName">
          </el-table-column>
          <el-table-column label="重量" prop="commodityWeight">
          </el-table-column>
          <el-table-column label="上架时间" prop="dateCreated">
          </el-table-column>
          <el-table-column label="品牌名" prop="brandName"> </el-table-column>
          <el-table-column label="价格" prop="commodityPrice">
          </el-table-column>
          <el-table-column label="规格" prop="specification"> </el-table-column>
          <el-table-column label="类别" prop="sortName"> </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-popconfirm
                class="ml-5"
                confirm-button-text="确定"
                cancel-button-text="我再想想"
                icon="el-icon-info"
                icon-color="red"
                title="您确定删除吗？"
                @confirm="del(scope.row.id)"
              >
                <el-button type="danger" slot="reference"
                  >删除 <i class="el-icon-remove-outline"></i
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div style="padding: 10px 0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[2, 5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import {listAll} from "../../api/data"
export default {
  data() {
    return {
      tableData: [],
      shoppingName: "",
      multipleSelection: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      options: [
        {
          label: "热门城市",
          options: [
            {
              value: "Shanghai",
              label: "上海",
            },
            {
              value: "Beijing",
              label: "北京",
            },
          ],
        },
        {
          label: "城市名",
          options: [
            {
              value: "Chengdu",
              label: "成都",
            },
            {
              value: "Shenzhen",
              label: "深圳",
            },
            {
              value: "Guangzhou",
              label: "广州",
            },
            {
              value: "Dalian",
              label: "大连",
            },
          ],
        },
      ],
      value: "",
    };
  },
  created() {
    // this.load();
    listAll().then(({ data: res }) => {
      this.tableData=res.data;
    });
  },
  methods: {
    // 搜索初始化
    load() {
      // this.request
      //   .get("/file/page", {
      //     params: {
      //       pageNum: this.pageNum,
      //       pageSize: this.pageSize,
      //       name: this.name,
      //     },
      //   })
      //   .then((res) => {
      //     this.tableData = res.data.records;
      //     this.total = res.data.total;
      //   });
    },
    // 新增
    onhandAdd() {},
    // changeEnable(row) {
    //   this.request.post("/file/update", row).then((res) => {
    //     if (res.code === "200") {
    //       this.$message.success("操作成功");
    //     }
    //   });
    // },
    // 删除
    del(id) {
      this.request.delete("/file/" + id).then((res) => {
        if (res.code === "200") {
          this.$message.success("删除成功");
          this.load();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    // 批量删除
    delBatch() {
      // let ids = this.multipleSelection.map((v) => v.id); // [{}, {}, {}] => [1,2,3]
      // this.request.post("/file/del/batch", ids).then((res) => {
      //   if (res.code === "200") {
      //     this.$message.success("批量删除成功");
      //     this.load();
      //   } else {
      //     this.$message.error("批量删除失败");
      //   }
      // });
    },
    // 重置
    reset() {
      this.shoppingName = "";
      this.load();
    },
    // 移除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 放大图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum);
      this.pageNum = pageNum;
      this.load();
    },
    // handleFileUploadSuccess(res) {
    //   console.log(res);
    //   this.load();
    // },
    // download(url) {
    //   window.open(url);
    // },
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
</style>


// <el-upload
//   action="https://jsonplaceholder.typicode.com/posts/"
//   list-type="picture-card"
//   :on-preview="handlePictureCardPreview"
//   :on-remove="handleRemove">
//   <i class="el-icon-plus"></i>
// </el-upload>
// <el-dialog :visible.sync="dialogVisible">
//   <img width="100%" :src="dialogImageUrl" alt="">
// </el-dialog>

// data() {
//       return {
//         dialogImageUrl: '',
//         dialogVisible: false
//       };
//     },
//     methods: {
//       handleRemove(file, fileList) {
//         console.log(file, fileList);
//       },
//       handlePictureCardPreview(file) {
//         this.dialogImageUrl = file.url;
//         this.dialogVisible = true;
//       }
//     }

// <el-table-column label="启用">
//   <template slot-scope="scope">
//     <el-switch
//       v-model="scope.row.enable"
//       active-color="#13ce66"
//       inactive-color="#ccc"
//       @change="changeEnable(scope.row)"
//     ></el-switch>
//   </template>
// </el-table-column>
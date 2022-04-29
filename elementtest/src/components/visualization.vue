<template>
  <div>
    <el-main>
      <!-- 头 -->
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '' }"
            ><b>数据统计</b></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <el-divider></el-divider>
      <div id="main" ref="chart" style="width: 500px; height: 400px"></div>
      <div id="pie" style="width: 500px; height: 400px"></div>
    </el-main>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { Echarts } from "../../api/data";
export default {
  mounted() {
    this.getChart();
    this.getTub();
  },
  methods: {
    getChart() {
      var option = {
        title: {
          text: "会员性别数量统计",
          subtext: "趋势图",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: ["女", "男"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "line",
          },
          {
            data: [],
            type: "bar",
          },
        ],
      };

      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);

      Echarts().then(({ data: res }) => {
        option.series[0].data = res.data;
        option.series[1].data = res.data;
        myChart.setOption(option);
      });
    },
    getTub() {
      var pieOption = {
        title: {
          text: "会员性别数量统计",
          subtext: "比例图",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "pie",
            radius: "60%",
            label: {
              //饼图图形上的文本标签
              normal: {
                show: true,
                position: "inner", //标签的位置
                textStyle: {
                  fontWeight: 300,
                  fontSize: 14, //文字的字体大小
                  color: "#fff",
                },
                formatter: "{d}%",
              },
            },
            data: [], // 填空
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      var pieDom = document.getElementById("pie");
      var pieChart = echarts.init(pieDom);
      Echarts().then(({ data: res }) => {
         pieOption.series[0].data = [
          { name: "女", value: res.data[0] },
          { name: "男", value: res.data[1] },
        ];
        pieChart.setOption(pieOption);
      });
      // this.request.get("/echarts/members").then((res) => {
      //   pieOption.series[0].data = [
      //     { name: "第一季度", value: res.data[0] },
      //     { name: "第二季度", value: res.data[1] },
      //     { name: "第三季度", value: res.data[2] },
      //     { name: "第四季度", value: res.data[3] },
      //   ];
      //   pieChart.setOption(pieOption);
      // });
    },
  },
};
</script>

<style scoped>
</style>
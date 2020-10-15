<template>
  <div>
    <h1>首页管理</h1>
    <div class="box" id="main"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById("main"));

          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "商品分类",
              textStyle: {
                color: "red",
              },
            },
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: ["下级分类数量"],
            },
            xAxis: {
              data: this.list.map((item) => item.catename),
              boundaryGap: false, // x轴的第1个元素是否与y轴有距离
            },
            yAxis: {},
            series: [
              {
                name: "下级分类数量",
                type: "line",
                data: this.list.map((item) => item.children.length),
                markPoint: {
                  // 标记点
                  data: [
                    {
                      type: "max",
                    },
                    {
                      type: "min",
                    },
                  ],
                },
                markLine: {
                  // 标记线
                  data: [
                    {
                      type: "average",
                    },
                  ],
                },
                smooth: true, // 是否为平滑线
                lineStyle: {
                  // 线的样式设置
                  color: "green",
                  type: "solid", // dashed dotted solid
                },
              },
            ],
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      reList: "cate/reListAction",
    }),
  },
  mounted() {
    this.reList();
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  height: 400px;
  margin: 20px auto;
  border: 1px solid #cccccc;
}
</style>
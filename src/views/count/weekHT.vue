<template>
  <div>
    <div ref="weekChart" class="week-chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart, BarChart, PictorialBarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  BarChart,
  PictorialBarChart,
  CanvasRenderer,
]);

export default {
  data() {
    return {
      xtime: ["", "", "", "", "", "", ""],
      ytempdata: [],
      yhumidata: [],
      chart: null,
    };
  },

  props: {
    freshBtn: Boolean,
    freshFre: Number,
  },

  methods: {
    drawinit() {
      var dom = this.$refs.weekChart;
      this.chart = echarts.init(dom);
    },
    draw() {
      let option = {
        title: {
          text: "一周温湿度统计",
        },

        color: ["#70d2ff", "#de70ff", "#675bba"],
        legend: {
          data: ["湿度", "温度"],
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        xAxis: [
          {
            axisTick: {
              alignWithLabel: true,
            },
            type: "category",
            data: this.xtime,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "湿度",
            max: "100",
            min: "0",
            position: "left",
            axisLabel: {
              formatter: "{value} %",
            },
          },
          {
            type: "value",
            name: "温度",
            min: "0",
            max: "50",
            position: "right",
            axisLabel: {
              formatter: "{value} ℃",
            },
          },
        ],
        series: [
          {
            name: "湿度",
            type: "bar",
            yAxisIndex: 0,
            data: this.yhumidata,
          },
          {
            name: "温度",
            type: "line",
            yAxisIndex: 1,
            data: this.ytempdata,
            smooth: 0.5,
            lineStyle: {
              width: 6,
            },
          },
        ],
      };

      this.chart.setOption(option);
    },
    
    //暂时不用一直更新数据
    getReal() {
      setTimeout(() => {
        if (this.freshBtn) {
          this.getData();
        }
        this.getReal();
      }, this.freshFre * 10000);
    },

    getData() {
      this.axios.get("getWeekdata").then((res) => {
        if (res.status == 200) {
          this.ytempdata = res.data.temp;
          this.yhumidata = res.data.humi;
          this.draw();
        }
      });
    },
  },

  mounted() {
    this.drawinit();
    this.draw();

    this.getData();
  },

  watch: {},
};
</script>

<style>
.week-chart {
  height: 500px;
}
.testcolor {
  color: #70d2ff;
  color: #de70ff;
}
.slider {
  padding-top: 17px;
}
</style>
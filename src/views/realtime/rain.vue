<template>
  <div ref="rainchart" class="rain-chart"></div>
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
      chart: null,
      rainData: [50, 53, 48],
      incData: [3, 3, -5],
      maxlen:30,
    };
  },
  props: {
    freshBtn: Boolean,
    freshFre: Number,
  },

  mounted() {
    this.getReal();
    this.drawinit();
    this.draw();
  },

  computed: {
    xAxisData() {
      var data = [];
      var len = this.maxlen;
      while (len--) {
        data.push("");
      }
      return data;
    },
  },

  methods: {
    getReal() {
      setTimeout(() => {
        if (this.freshBtn) {
          this.getRealtimeData();
        }
        this.getReal();
      }, this.freshFre * 1000);
    },

    getRealtimeData() {
      this.axios.get("getRealRainInc").then((res) => {
        if (res.status == 200) {
          if (this.rainData.length>=this.maxlen) {
            this.rainData.shift()
            this.rainData.push(res.data.rain)
          }else{
            this.rainData.push(res.data.rain)
          }
          if (this.incData.length>=this.maxlen) {
            this.incData.shift()
            this.incData.push(res.data.inc)
          }else{
            this.incData.push(res.data.inc)
          }
          
          this.draw();
        }
      });
    },

    drawinit() {
      var dom = this.$refs.rainchart;
      this.chart = echarts.init(dom);
    },

    draw() {
      //配置项
      var option = {
        //backgroundColor: "#0f375f",
        tooltip: {
          trigger: "axis",
        },

        legend: {
          data: ["雨量", "增量"],
          textStyle: {
            color: "#ccc",
          },
        },
        xAxis: {
          data: this.xAxisData,
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
        },
        yAxis: [
          {
            name: "雨量",
            type: "value",
          },
          {
            name: "增量",
            type: "value",
          },
        ],
        series: [
          {
            name: "增量",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 15,
            yAxisIndex: 1,
            data: this.incData,
          },
          {
            name: "雨量",
            type: "bar",
            //barWidth: 15,
            yAxisIndex: 0,
            itemStyle: {
              borderRadius: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#14c8d4" },
                { offset: 1, color: "#43eec6" },
              ]),
            },
            data: this.rainData,
          },
        ],
      };

      this.chart.setOption(option);
    },
  },
};
</script>

<style>
.rain-chart {
  height: 500px;
}
</style>
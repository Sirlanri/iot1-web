<template>
  <div ref="humichart" class="humi-chart"></div>
</template>

<script>
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
]);

export default {
  props: {
    freshBtn: Boolean,
    freshFre: Number,
  },

  data() {
    return {
      chart: null,
      humiRes1: [20, 21, 24, 26, 30, 27, 30],
      humiRes2: [30, 21, 34, 26, 30, 27, 47],
      humiRes3: [20, 21, 18, 10, 16, 14, 15],
      maxlen: 10,
    };
  },

  mounted() {
    this.getReal()
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
          this.getRealtimeData()
        }
        this.getReal()
      }, this.freshFre*1000);
      
    },

    getRealtimeData() {
      this.axios.get("getRealHumi").then((res) => {
        //这段代码写的和屎一样，希望以后有能力优化一下
        if (res.status == 200) {
          if (this.humiRes1.length >= this.maxlen) {
            this.humiRes1.shift();
            this.humiRes1.push(res.data.humi1);
          } else {
            this.humiRes1.push(res.data.humi1);
          }
          if (this.humiRes2.length >= this.maxlen) {
            this.humiRes2.shift();
            this.humiRes2.push(res.data.humi2);
          } else {
            this.humiRes2.push(res.data.humi2);
          }
          if (this.humiRes3.length >= this.maxlen) {
            this.humiRes3.shift();
            this.humiRes3.push(res.data.humi3);
          } else {
            this.humiRes3.push(res.data.humi3);
          }

          this.draw();
        }
      });
    },

    drawinit() {
      var dom = this.$refs.humichart;
      this.chart = echarts.init(dom);
    },

    draw() {
      this.chart.setOption({
        title: {
          text: "潮湿度",
          right:0
        },
        color:['#04c8d6','#0489d6','#0419d6'],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["传感器1", "传感器2", "传感器3"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xAxisData,
        },
        yAxis: {
          type: "value",
          max: 100,
          min: 0,
          axisLabel: {
            formatter: "{value} %",
          },
          boundaryGap: [0.2, 0.2],
        },
        series: [
          {
            name: "传感器1",
            type: "line",
            lineStyle:{
              width:5
            },
            data: this.humiRes1,
          },
          {
            name: "传感器2",
            type: "line",
            lineStyle:{
              width:5
            },
            data: this.humiRes2,
          },
          {
            name: "传感器3",
            type: "line",
            lineStyle:{
              width:5
            },
            data: this.humiRes3,
          },
        ],
      });
    },
  },
};
</script>

<style>
.humi-chart {
  height: 400px;
  width: 100%;
  color: #d60477;
}
</style>
<template>
  <div ref="waterchart" class="rain-chart"></div>
</template>

<script>
import * as echarts from "echarts/core";
import { TooltipComponent } from "echarts/components";
import { GaugeChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([TooltipComponent, GaugeChart, CanvasRenderer]);
export default {
  data() {
    return {
      chart: null,
      waterData: "20.01",
    };
  },
  props: {
    freshBtn: Boolean,
    freshFre: Number,
  },

  mounted(){
    this.getReal()
    this.drawinit()
    this.draw()
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
      this.axios.get("getWater").then((res) => {
        if (res.status == 200) {
          this.waterData = res.data;
          this.draw()
        }
      });
    },

    drawinit() {
      var dom = this.$refs.waterchart;
      this.chart = echarts.init(dom);
    },

    draw() {
      var option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}ML",
        },
        series: [
          {
            name: "当前容量",
            type: "gauge",
            progress: {
              show: true,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value} ml",
            },
            max:40,
            data: [
              {
                value: this.waterData,
                name: "水容量",
              },
            ],
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
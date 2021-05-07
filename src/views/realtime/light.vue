<template>
  <div ref="lightchart" class="light-chart">
    
  </div>
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
      lightData: "20.01",
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
      this.axios.get("getRealLight").then((res) => {
        if (res.status == 200) {
          this.lightData = res.data;
          this.draw()
        }
      });
    },

    drawinit() {
      var dom = this.$refs.lightchart;
      this.chart = echarts.init(dom);
    },

    draw() {
      var option = {
        color:['#ff6537','#ffbc64'],
        tooltip: {
          formatter: "{a} <br/>{b} : {c} Lux",
        },
        series: [
          {
            name: "当前光照",
            type: "gauge",
            progress: {
              show: true,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value} Lux",
            },
            max:1000,
            data: [
              {
                value: this.lightData,
                name: "光照强度",
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
.light-chart{
  height: 500px;
  color: #ff4e37;
}
</style>
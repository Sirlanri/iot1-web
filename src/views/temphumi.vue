<template>
  <div>
    <v-row>
      <v-col md="2" offset-md="0">
        <v-switch v-model="freshBtn" label="数据开关"></v-switch>
      </v-col>
      <v-col>
        <v-card-text> 每秒刷新频率：{{ freshFre }} </v-card-text>
        <v-slider v-model="freshFre" max="10"></v-slider>
      </v-col>
    </v-row>

    <v-row>
      <div ref="temphumi" class="temp-humi-chart"></div>
    </v-row>
  </div>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart } from "echarts/charts";

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
//引入组件
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from "echarts/components";

// 注册必须的组件
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
]);
export default {
  data() {
    return {
      freshBtn: false,
      freshFre: 1,
      tempRes:[20,21,24,26,30,27,30],
      humiRes:[10,50,60,90,80,70,60],

    };
  },

  mounted(){
    this.getReal()
    this.draw()
  },

  computed:{
    tempData(){
      if (this.tempRes.length<=30) {
        return this.tempRes
      }else{
        return this.tempRes.slice(-30)
      }
    },

    humiData(){
      if (this.humiRes.length<=30) {
        return this.humiRes
      }else{
        return this.humiRes.slice(-30)
      }
    },

    maxHumi(){
      return 100
    },
    maxTemp(){
      return Math.max.apply(null,this.tempRes)+10
    },
  },


  methods: {
    getReal(){
      setInterval(() => {
        if (this.freshBtn) {
          this.getRealtimeData() 
        }
      }, this.freshFre*1000);
    },

    getRealtimeData(){
      this.axios.get('getRealtime')
      .then(res=>{
        if (res.status==200) {
          this.humiRes.push(res.data.humi)
          this.tempRes.push(res.data.temp)
          console.log(this.humiRes.slice(-15))
          this.draw()
        }
      })
    },

    draw() {
      var dom = this.$refs.temphumi;
      var chart = echarts.init(dom);
      chart.setOption({
        title: {
          text: "温湿度",
          subtext: "实时数据",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56",
            },
          },
        },
        legend: {
          data: ["潮湿度", "温度"],
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data:(function (){
                var data = [];
                var len = 30;
                while (len--) {
                    data.push('')
                }
                return data;
            })()
          },
          
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "潮湿度",
            max: this.maxHumi,
            min: 0,
            axisLabel:{
              formatter:'{value} %'
            },
            boundaryGap: [0.2, 0.2],
          },
          {
            type: "value",
            scale: true,
            name: "温度",
            max: this.maxTemp,
            min: 0,
            axisLabel:{
              formatter:'{value} ℃'
            },
            boundaryGap: [0.2, 0.2],
          },
        ],
        series: [
          {
            name: "潮湿度",
            type: "bar",
            xAxisIndex: 0,
            //yAxisIndex: 1,
            data: this.humiData
          },
          {
            name: "温度",
            type: "line",
            data: this.tempData
          },
        ],
      });
    },


  },
};
</script>

<style>
.temp-humi-chart{
  height: 500px;
  width: 100%;
}
</style>
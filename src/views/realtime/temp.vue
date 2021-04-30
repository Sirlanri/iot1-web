<template>
  <div ref="tempchart" class="temp-chart"></div>
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
      tempRes1: [20, 21, 24, 26, 30, 27, 30],
      tempRes2: [30, 21, 34, 26, 30, 27, 47],
      tempRes3: [20, 21, 18, 10, 16, 14, 15],
      maxlen:10,
    };
  },

  mounted(){
    this.getReal()
    this.drawinit()
    this.draw()
  },

  computed:{
    maxTemp(){
      return Math.max.apply(null,this.tempRes1,this.tempRes2,this.tempRes3)+15
    },

    xAxisData(){
      var data = [];
                var len = this.maxlen;
                while (len--) {
                    data.push('')
                }
                return data;
    }
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

    getRealtimeData(){
      this.axios.get('getRealTemp')
      .then(res=>{
        //这段代码写的和屎一样，希望以后有能力优化一下
        if (res.status==200) {
          if (this.tempRes1.length>=this.maxlen) {
            this.tempRes1.shift()
            this.tempRes1.push(res.data.temp1)
          }else{
            this.tempRes1.push(res.data.temp1)
          }
          if (this.tempRes2.length>=this.maxlen) {
            this.tempRes2.shift()
            this.tempRes2.push(res.data.temp2)
          }else{
            this.tempRes2.push(res.data.temp2)
          }
          if (this.tempRes3.length>=this.maxlen) {
            this.tempRes3.shift()
            this.tempRes3.push(res.data.temp3)
          }else{
            this.tempRes3.push(res.data.temp3)
          }

          this.draw()
        }
      })
    },

    drawinit() {
      var dom = this.$refs.tempchart;
      this.chart = echarts.init(dom);
    },

    draw() {
      this.chart.setOption({
        title: {
          text: "温度",
        },
        color:['#d66a04','#d6c104','#d60477'],
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
          data:this.xAxisData
        },
        yAxis: {
            type: "value",
            max: 'dataMax',
            min: 0,
            axisLabel:{
              formatter:'{value} ℃'
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
            data: this.tempRes1
          },
          {
            name: "传感器2",
            type: "line",
            lineStyle:{
              width:5
            },
            data: this.tempRes2
          },
          {
            name: "传感器3",
            type: "line",
            lineStyle:{
              width:5
            },
            data: this.tempRes3
          },
          
        ],
      });
    },
  },
};
</script>

<style>
.temp-chart {
  height: 400px;
  width: 100%;
}
</style>
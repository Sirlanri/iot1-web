<template>
  <div class="home">
    <div class="home-back" :style="backimg"></div>
    <topbar></topbar>
    <div class="top-space"></div>
    <v-row>
      <v-col lg="10" offset-lg="1" cols="12" offset="0">
        <router-view></router-view>
      </v-col>
      
    </v-row>
  </div>
</template>

<script>
import Topbar from '../components/topbar.vue'

export default {
  name: 'home',
  components: {
    Topbar,
    
  },

  data(){
    return{
      weather:'',
      rain:0,
      light:100,
      backimg:{},
    }
  },

  computed:{
    //计算天气情况
    comWeather(){
      if (this.rain>10) {
        return "rain"
      }
      if (this.light<100) {
        return "cloud"
      }
      return "sunny"
    },

    //随机选择当前天气的图片
    randomPic(){
      let source="https://cdn.ri-co.cn/project/iot1/"
      let num=parseInt(Math.random()*10,10)+1;
      return source+this.comWeather+num+".jpg"
    },

    comBackimg(){
      return{
        backgroundImage:`url(${this.randomPic})`
      }
    }
  },

  mounted(){
    this.getRain()
    this.getCloud()
    this.getData()
    this.backimg=this.comBackimg
  },

  watch:{
    comWeather(){
      this.backimg=this.comBackimg
    }
  },

  methods:{
    getRain(){
      this.axios.get('/getRealRainInc')
      .then(res=>{
        if (res.status==200) {
          this.rain=res.data.rain
        }
      })
    },

    getCloud(){
      this.axios.get('/getRealLight')
      .then(res=>{
        if (res.status==200) {
          this.light=res.data
        }
      })
    },

    getData(){
      setTimeout(() => {
          this.getRain();
          this.getCloud()
        this.getData();
      }, 10000);
    }


  }
}
</script>
<style>
.home-back{
  position: fixed;
  width: 100%;
  height: 100%;

  background-size: cover;
  background-repeat: no-repeat;
	background-position: center;
  opacity: 0.7;
}
.top-space{
  height: 4rem;
}
.home{
  overflow-y: hidden;
}
</style>
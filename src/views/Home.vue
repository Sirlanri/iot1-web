<template>
  <div class="home">
    <div class="home-back"></div>
    <topbar></topbar>
    <v-row>
      <v-col lg="10" offset-lg="1">
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
    
  }
}
</script>
<style>
.home-back{
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("https://cdn.ri-co.cn/project/iot1/sunny1.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  opacity: 0.7;
}
</style>
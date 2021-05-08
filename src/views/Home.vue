<template>
  <div class="home">
    <div class="home-back"></div>
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
    
  }
}
</script>
<style>
.home-back{
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("https://cdn.ri-co.cn/project/iot1/sunny1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
	background-position: center;
  opacity: 0.7;
}
.top-space{
  height: 4rem;
}
</style>
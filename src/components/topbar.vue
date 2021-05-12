<template>
  <v-app-bar fixed class="top-bar" color="rgba(255,255,255,0.7)">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-app-bar-title> 深蓝可视化 </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn large text @click="tourl">友情链接</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name:"topbar",
  methods:{
    tourl(){
      window.open("https://whisper.ri-co.cn")
    }
  }
};
</script>

<style>

</style>
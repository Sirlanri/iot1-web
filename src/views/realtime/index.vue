<template>
  <div>
    <v-row>
      <v-col cols="5" offset="4"  md="2" offset-md="0">
        <v-switch v-model="freshBtn" label="数据开关"></v-switch>
      </v-col>
      <v-col cols="10" offset="1" md="8" offset-md="0">
        <v-card-text> 每秒刷新频率：{{ freshFre }} </v-card-text>
        <v-slider v-model="freshFre" max="10"></v-slider>
      </v-col>
    </v-row>

    <v-row>
      <v-col lg="6" cols="12">
        <temp :freshBtn="freshBtn" :freshFre="freshFre"></temp>
      </v-col>
      <v-col lg="6" cols="12">
        <humi :freshBtn="freshBtn" :freshFre="freshFre"></humi>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="6" cols="12">
        <light :freshBtn="freshBtn" :freshFre="freshFre"></light>
      </v-col>
      <v-col lg="6" cols="12">
        <water :freshBtn="freshBtn" :freshFre="freshFre"></water>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <weekht :freshBtn="freshBtn" :freshFre="freshFre"></weekht>
      </v-col>
      <v-col lg="10" offset-lg="1">
        <ledswitch></ledswitch>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import weekht from '../count/weekHT.vue';
import ledswitch from '../control/ledswitch.vue';
import Humi from "./humi.vue";
import Light from './light.vue';
import Temp from "./temp.vue";
import Water from './water.vue';
export default {
  components: {
    Temp,
    ledswitch,
    Humi,
    Water,
    Light,
    weekht ,
  },
  data() {
    return {
      freshBtn: false,
      freshFre: 1,
    };
  },
};
</script>

<style>
</style>
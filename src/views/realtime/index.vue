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
      <v-col lg="6">
        <temp :freshBtn="freshBtn" :freshFre="freshFre"></temp>
      </v-col>
      <v-col>
        <humi :freshBtn="freshBtn" :freshFre="freshFre"></humi>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="6">
        <light :freshBtn="freshBtn" :freshFre="freshFre"></light>
      </v-col>
      <v-col lg="6">
        <water :freshBtn="freshBtn" :freshFre="freshFre"></water>
      </v-col>
    </v-row>

    <v-row>
      <v-col lg="12">
        <rain></rain>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Humi from "./humi.vue";
import Light from './light.vue';
import Rain from './rain.vue';
import Temp from "./temp.vue";
import Water from './water.vue';
export default {
  components: {
    Temp,

    Humi,
    Water,
    Light,
    Rain,
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
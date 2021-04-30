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
    <temphumi :freshBtn="freshBtn" :freshFre="freshFre"></temphumi>
  </div>
</template>

<script>
import temphumi from './temphumi.vue'
export default {
  components: { temphumi },

  data(){
    return{
      freshBtn:false,
      freshFre:1
    }
  },


}
</script>

<style>

</style>
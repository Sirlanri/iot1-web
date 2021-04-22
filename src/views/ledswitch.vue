<template>
  <v-row>
    <v-col cols="4">
      <v-text-field label="授权码" v-model="authcode" outlined></v-text-field>
    </v-col>
    <v-col cols="8"> 
      <v-btn-toggle  >
        <v-btn block @click="sclose">关闭</v-btn>
        <v-btn block @click="son">常亮</v-btn>
        <v-btn block @click="sblink">闪烁</v-btn>
      </v-btn-toggle>
    </v-col>

    <v-snackbar
      v-model="snackbar"
    >
      {{ info }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="infowin = false"
        >
          知道了
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      authcode: "",
      slebtn:"",
      infowin:false,
      info:""
    };
  },

  methods:{
    sclose(){
      if (this.authcode!="") {
        this.axios.get('/setled',{
          params:{
            code:"off",
            auth:this.authcode
          }
        }).then(res=>{
          if (res.code!=200) {
            this.info="授权码错误！"
            this.infowin=true
          }
        })
      }
    },
    son(){
      if (this.authcode!="") {
        this.axios.get('/setled',{
          params:{
            code:"on",
            auth:this.authcode
          }
        }).then(res=>{
          if (res.code!=200) {
            this.info="授权码错误！"
            this.infowin=true
          }
        })
      }
    },
    sblink(){
      if (this.authcode!="") {
        this.axios.get('/setled',{
          params:{
            code:"blink",
            auth:this.authcode
          }
        }).then(res=>{
          if (res.code!=200) {
            this.info="授权码错误！"
            this.infowin=true
          }
        })
      }
    },

  }
};
</script>

<style>
</style>
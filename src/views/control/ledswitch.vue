<template>
  <v-row>
    <v-col cols="8" offset="2" offset-lg="1" lg="4">
      <v-text-field dark type="password" label="授权码" v-model="authcode" outlined></v-text-field>
    </v-col>
    <v-col lg="2" cols="4">
      <v-btn block @click="sclose" class="ctrl-btn">关闭</v-btn>
    </v-col>
    <v-col lg="2" cols="4">
      <v-btn block @click="son" class="ctrl-btn">常亮</v-btn>
    </v-col>
    <v-col lg="2" cols="4">
      <v-btn block @click="sblink" class="ctrl-btn">自动</v-btn>
    </v-col>
    

    <v-snackbar
      v-model="infowin"
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
          console.log(res.status)
          if (res.status!=200) {
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
          if (res.status!=200) {
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
          if (res.status!=200) {
            this.info="授权码错误！"
            this.infowin=true
          }
        })
      }
    },

  }
};
</script>

<style scoped>
.ctrl-btn{
  height: 45px !important;
}
</style>
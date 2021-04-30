<template>
  <div class="home">
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

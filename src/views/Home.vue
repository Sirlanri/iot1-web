<template>
  <div class="home">
    <topbar></topbar>
    <v-row>
      <v-col lg="10" offset-lg="1">
        <temphumi></temphumi>
      </v-col>
      <v-col lg="10" offset-lg="1">
        <ledswitch></ledswitch>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Topbar from '../components/topbar.vue'
import Ledswitch from './ledswitch.vue'
import Temphumi from './temphumi.vue'

export default {
  name: 'home',
  components: {
    Topbar,
    Temphumi,
    Ledswitch
  }
}
</script>

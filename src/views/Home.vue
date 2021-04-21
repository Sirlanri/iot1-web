<template>
  <div class="home">
    <topbar></topbar>
    <v-row>
      <v-col lg="10" offset-lg="1">
        <temphumi></temphumi>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Topbar from '../components/topbar.vue'
import Temphumi from './temphumi.vue'

export default {
  name: 'home',
  components: {
    Topbar,
    Temphumi
  }
}
</script>

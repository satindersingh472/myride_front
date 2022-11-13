<template>
  <div app >
    <!-- this components is calling an api and emitting the response as a global event -->
    <navigation-page></navigation-page>
    <v-row justify="center"><h3 class="my-7 text-h3 purple--text">Your Rides</h3></v-row>
    <show-rides-rider></show-rides-rider>
  </div>
</template>

<script>
import ShowRidesRider from "@/components/showRidesRider.vue"
import NavigationPage from '@/components/navigationPage.vue'
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  components: {
    NavigationPage,
    ShowRidesRider
  },

// will call the api and emit the response globally
  mounted() {
    axios
      .request({ url: `${process.env.VUE_APP_BASE_DOMAIN}/api/ride`, 
      headers:{
        token: cookies.get('token'),
        client_id: cookies.get('client_id')
      }
      })
      .then((response) => {
        this.$root.$emit('search_response',response['data'])
      })
      .catch((error) => {
        this.$root.$emit('search_response_error',error['response']['data'])
      })
  },
}
</script>

<style lang="scss" scoped></style>

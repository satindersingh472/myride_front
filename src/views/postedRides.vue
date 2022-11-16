<template>
  <div>
    <!-- this components is calling an api and emitting the response as a global event and show rides rider is listening-->
    <!-- <navigation-page></navigation-page> -->

    <show-rides-rider></show-rides-rider>
  </div>
</template>

<script>
import ShowRidesRider from '@/components/showRidesRider.vue'
// import NavigationPage from '@/components/navigationPage.vue'
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  components: {
    // NavigationPage,
    ShowRidesRider,
  },

  // will call the api and emit the response globally
  mounted() {
    // emit the response so that components that needs this response will get false value
    this.$root.$emit('cookies_presence', true)

    axios
      .request({
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/ride`,
        headers: {
          token: cookies.get('token'),
        },
        params: {
          client_id: cookies.get('client_id'),
        },
      })
      // on success show rides rider will grab the global event and show the rides
      .then((response) => {
        this.$root.$emit('search_response', response['data'])
      })
      .catch((error) => {
        this.$root.$emit('search_response_error', error['response']['data'])
      })
  },
}
</script>

<style lang="scss" scoped></style>

<template>
  <div app>
    <!-- this component will show the user a notification after verifying -->
    <v-app>
  <v-container fill-height >
    <v-row align="center" justify="center">
      <v-card>
        <v-toolbar class="yellow darken-3" >
          Client Verification
        </v-toolbar>
        <v-card-text class="ma-2 text-h5" >
          Your Account is verified successfully
          <div class="text-center my-5">
          <router-link  class="text-decoration-none" to="/"><v-btn class="success">Go to Website</v-btn> </router-link>
          </div>
        </v-card-text>

      </v-card>
    </v-row>
  </v-container>
    </v-app>
  </div>
</template>

<script>

export default {

  mounted () {
    // emit the response so that components that needs this response will get false value 
    this.$root.$emit('cookies_response',false);
  },
}
</script>

<style lang="scss" scoped></style>
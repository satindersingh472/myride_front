<template>
  <div class="page">
    <v-app>
      <nav-bar></nav-bar>
      <v-container  class="grey lighten-3" fill-height fluid>
        <v-layout row wrap justify-center align-center>
          <v-flex xs12 md6 lg4 text-start>
            <v-card-text class="font-weight-bold text-h1  yellow darken-3 " >MyRide.</v-card-text>
            <h2 class="text-h4" >Connecting people and Cities together.</h2>
          </v-flex>
          <v-flex xs10 md6 lg4 text-center>
            <v-card width="400" class="mx-auto pa-3 rounded-lg"  elevation="9">
                <div class="yellow darken-3 rounded-lg " style="height:50px;">
                    <v-text class="text-h4 font-weight-bold" >Login</v-text>
                </div>
              <v-text-field
                class="pa-2 text-h5"
                outlined
                v-model="email"
                label="Email"
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
              <v-text-field
                class="pa-2 text-h5"
                outlined
                v-model="password"
                label="Password"
                :rules="rules"
                hide-details="auto"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                 :type="show ? 'text' : 'password'"
                 @click:append="show = !show"

              ></v-text-field>
                 <v-btn class="my-4" large color="success" dark>
              Login
            </v-btn>
            <hr>
            <v-btn class="primary my-4 "  > Create an account</v-btn>
            </v-card>
         
          </v-flex>
        </v-layout>
      </v-container>

      <div class="text-center ma-2"></div>
    </v-app>
  </div>
</template>

<script>
import NavBar from '@/components/navBar.vue'
export default {
  components: {
    NavBar,
  },
    methods: {
        send_request() {
            
        }
    },



  data() {
    return {
      rules: [(value) => !!value || 'Required.'],
      show: false
    }
  },
}
</script>

<style lang="scss" scoped>
// * {
//   padding: 0px;
//   margin: 0px;
// }
// .login_page {
//   display: grid;
//   place-items: center;
//   text-align: center;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
// }
// .message {
//   display: grid;
//   align-items: center;
// }
</style>

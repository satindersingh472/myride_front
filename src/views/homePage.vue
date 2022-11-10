<template>
  <div class="page">
    <v-app>
      <v-container class="grey lighten-3" fill-height fluid>
        <v-layout row wrap justify-center align-center>
          <v-flex xs12 md6 lg4 text-start>
            <v-card-text class="font-weight-bold text-h1 yellow darken-3">
              MyRide.
            </v-card-text>
            <h2 class="text-h4">Connecting people and Cities together.</h2>
          </v-flex>
          <v-flex xs10 md6 lg4 text-center>
            <v-card width="400" class="mx-auto pa-3 rounded-lg" elevation="9">
              <div class="yellow darken-3 rounded-lg" style="height: 50px;">
                <v-text class="text-h4 font-weight-bold">Login</v-text>
              </div>
              <v-text-field
                class="pa-2 text-h6"
                outlined
                v-model="email"
                label="Email"
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
              <v-text-field
                class="pa-2 text-h6"
                outlined
                v-model="password"
                label="Password"
                :rules="rules"
                hide-details="auto"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
              ></v-text-field>
              <v-btn  @click="send_request" class="my-4" large color="success" dark>
                Login
              </v-btn>
              <p v-if="message === undefined">Please enter the valid email and password</p>
              <p v-if="message !== undefined">{{message}}</p>
              <hr />
              <v-btn class="primary my-4">Create an account</v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <div class="text-center ma-2"></div>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  methods: {
    send_request() {
      axios
        .request({ url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client_login`,
        method: 'POST',
        data:{
          email: this.email,
          password: this.password
        }
        
        })
        .then((response) => {
          cookies.set('client_id',response['data']['client_id'])
          cookies.set('token',response['data']['token'])
          
        })
        .catch((error) => {
          this.message = error['response']['data']
          this.email = undefined,
          this.password = undefined
          setTimeout(() => {
            this.message = undefined
          }, 1500);
        })
    },
  },

  data() {
    return {
      rules: [(value) => !!value || 'Required.'],
      show: false,
      email: undefined,
      password: undefined,
      message: undefined
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

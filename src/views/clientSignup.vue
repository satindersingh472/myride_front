<template>
  <div>
    <v-app>
      <v-container class="grey lighten-3" fluid fill-height>
        <v-row justify="center">
          <v-col cols="12" lg="4" align-self="center">
            <h1 class="font-weight-bold text-h1 yellow darken-3">MyRide.</h1>
            <h2 class="text-h4">Connecting people and Cities together.</h2>
          </v-col>
          <v-col cols="12" lg="4">
            <v-card
              width="400"
              class="mx-auto pa-3 rounded-lg text-center"
              elevation="9"
            >
              <div
                class="yellow darken-3 rounded-lg text-center"
                style="height: 50px;"
              >
                <v-text class="text-h4 font-weight-bold">Register</v-text>
              </div>
              <v-text-field
                class="pa-2 text-h6"
                outlined
                v-model="first_name"
                label="First Name"
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
              <v-text-field
                class="pa-2 text-h6"
                outlined
                v-model="last_name"
                label="Last Name"
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
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
              <v-btn
                @click="send_request"
                class="my-4"
                large
                color="success"
                dark
              >
                Register
              </v-btn>
              <p v-if="message === undefined">Please confirm your email <br> account once register</p>
              <p class="mx-5" v-if="message !== undefined" >{{message}}</p>
              <v-divider class="my-4"></v-divider>
              <h3>Already have an account?</h3>

              <router-link to="/">
                <v-btn class="primary my-2">Login</v-btn>
              </router-link>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
          method: 'POST',
          data:{
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password
          }
        })
        .then((response) => {
            this.message = 'Please check your email to confirm your account'
          cookies.set('token',response['data']['token'])
          cookies.set('client_id',response['data']['client_id'])
        })
        .catch((error) => {
          this.message = error['response']['data']
          setTimeout(() => {
            this.message = undefined 
          }, 3000);
        })
    },
  },

  data() {
    return {
        message: undefined,
      rules: [(value) => !!value || 'Required.'],
      show: false,
      first_name: undefined,
      last_name: undefined,
      email: undefined,
      password: undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>

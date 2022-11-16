<template>
  <div>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialog"
      width="300"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" class="rounded-lg">
          Delete Account
        </v-btn>
      </template>
      <v-card>
        <v-toolbar class="yellow darken-3">
          Please enter your password
        </v-toolbar>
        <v-card-text>
          <v-text-field
            class="my-5"
            outlined
            ref="password"
            v-model="password"
            label="Password"
            hide-details="auto"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
          ></v-text-field>
          <h3 v-if="message !== undefined">{{ message }}</h3>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- will perform dialog hide password field reset password field hide on click -->
          <v-btn
            class="grey"
            @click="
              dialog = false
              $refs['password'].reset()
              show = false
            "
          >
            go back
          </v-btn>
          <!-- will run api request button disable password field reset password field hide-->
          <v-btn
            :disabled="disabled"
            @click="
              disabled = true
              delete_account()
              $refs['password'].reset()
              show = false
            "
          >
            confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  methods: {
    delete_account() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
          method: 'DELETE',
          headers: {
            token: cookies.get('token'),
          },
          data: {
            password: this.password,
          },
        })
        // upon success remove cookies and push the router to home
        .then((response) => {
          this.message = response['data']
          cookies.remove('client_id')
          cookies.remove('token')
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        })
        // on error show a message and after 2 seconds button will be enabled and message will be gone
        .catch((error) => {
          this.message = error['response']['data']
          setTimeout(() => {
            this.disabled = false
            this.message = undefined
          }, 2000)
        })
    },
  },

  data() {
    return {
      show: false,
      dialog: false,
      password: undefined,
      disabled: false,
      message: undefined,
    }
  },
}
</script>

<style lang="scss" scoped></style>

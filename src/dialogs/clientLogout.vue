<template>
  <div>
    <!-- this component is just for logging out the client and it is just a button and dialog box -->
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialog"
      width="500"
    >
    <!-- adding slot to the button so that if it gets clicked the dialog will be on and it will be displayed -->
      <template v-slot:activator="{ on, attrs }">
        <!-- when this button is clicked the dialog box will appear -->
        <v-btn v-bind="attrs" v-on="on">
          <v-icon class="mr-2">mdi-logout</v-icon>
          Logout
        </v-btn>
      </template>
      <!-- v card will be shown as a dialog box -->
      <v-card class="text-center">
        <v-toolbar class="yellow darken-3 text-h5">Logout</v-toolbar>
        <v-card-text v-if="message === undefined" class="text-h6">You will be logged out</v-card-text>
        <v-card-text v-if="message !== undefined" >{{message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="grey" @click="dialog=false">Go Back</v-btn>
          <v-btn  :disabled="disabled" @click="logout_request" >Logout</v-btn>
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
    // make a request to an api
    logout_request() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client_login`,
          method: 'DELETE',
          headers: {
            token: cookies.get('token'),
          },
        })
        // on success delete the cookies and dialog disappear and router changed to home
        .then(() => {
          cookies.remove('token')
          cookies.remove('client_id')
          this.dialog = false
          this.$router.push('/')
        })
        // if error just show the message
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
        disabled: undefined,
        message: undefined,
      dialog: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>

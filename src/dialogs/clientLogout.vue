<template>
  <div>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <!-- when this button is clicked the dialog box will appear -->
        <v-btn v-bind="attrs" v-on="on">
          <v-icon class="mr-2">mdi-logout</v-icon>
          Logout
        </v-btn>
      </template>
      <v-card class="text-center">
        <v-toolbar class="yellow darken-3 text-h5">Logout</v-toolbar>
        <v-card-text v-if="message === undefined" class="text-h5">Do you want to Logout?</v-card-text>
        <v-card-text v-if="message !== undefined" >{{message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="red" @click="dialog=false">Go Back</v-btn>
          <v-btn class="success" @click="logout_request" >Logout</v-btn>
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
    logout_request() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client_login`,
          method: 'DELETE',
          headers: {
            token: cookies.get('token'),
          },
        })
        .then(() => {
          cookies.remove('token')
          cookies.remove('client_id')
          this.$router.push('/')
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
      dialog: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>

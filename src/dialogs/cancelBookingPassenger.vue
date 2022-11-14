<template>
  <div>
    <v-dialog
      transition="dialog-bottom-transition"
      width="500"
      v-model="dialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" class="red white--text">
          Cancel Booking
        </v-btn>
      </template>
      <v-card>
        <v-toolbar class="yellow darken-3">Cancel Booking</v-toolbar>
        <v-card-text v-if="message === undefined" class="text-h5 my-5 text-center">
        Booking : {{detail['booking_id']}} will be canceled. Do you want to continue?
        </v-card-text>
        <v-card-text v-if="message !== undefined" class="text-h5 my-5 text-center">{{message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="error">Go Back</v-btn>
          <v-btn class="success" :disabled="disabled" @click="cancel_booking">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
    props:{
        detail: Object
    },
  data() {
    return {
      dialog: false,
      disabled: false,
      message: undefined
    }
  },
  methods: {
    cancel_booking() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/booking_passenger`,
          method: 'DELETE',
          headers:{
            token: cookies.get('token')
          },
          data:{
            booking_id: this.detail['booking_id']
          }
        })
        .then((response) => {
          this.message = response['data']
          this.$emit('delete_response',this.detail['booking_id'])
          this.disabled = true
          setTimeout(() => {
            this.message = undefined
            this.dialog = false
          }, 2000);
        })
        .catch((error) => {
            this.message = error['response']['data']
            this.disabled = true
           setTimeout(() => {
            this.disabled = false
            this.message = undefined
          }, 2000);
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>

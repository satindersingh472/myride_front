<template>
  <div>
    <v-dialog  transition="dialog-bottom-transition" v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ma-3" color="success" dark v-bind="attrs" v-on="on">
          Book Ride
        </v-btn>
      </template>
   
     <v-card>
        <v-toolbar class="yellow darken-3" >
           <v-card-title>
          Confirmation
        </v-card-title>
        </v-toolbar>
        <v-card-text class="text-h6" >
            <p v-if="message !== undefined" >{{message}}</p>
                <div v-if="message === undefined" >
                <p>Please arrive 15 mins prior to departure. 
                2 Pieces of luggage is allowed Onboard. 
                Press Confirm to Book a ride or cancel to go back.Your booking id will be sent to you via email.
                For further inquiries please email me at
                </p>
                <p>{{detail['rider_email']}}</p>
                </div>
        </v-card-text>
            <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false; message = undefined; disabled = false" class="my-4 red">Go Back</v-btn>
         <v-btn @click="send_request" :disabled ="disabled" v-model="disabled" class="my-4 success">Confirm</v-btn>
        </v-card-actions>
        </v-card>
         </v-dialog>




    
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  props: {
    detail: Object,
  },
  methods: {
    send_request() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/booking_passenger`,
          method: 'POST',
          headers: { token: cookies.get('token') },
          data: { ride_id: this.detail['ride_id'] },
        })
        .then((response) => {
          cookies.set('booking_id', response['data']['booking_id'])
          this.message =  `Your booking Id is: ${cookies.get('booking_id')}`
          this.disabled = true
        })
        .catch((error) => {
          this.message = error['response']['data']
          setTimeout(() => {
            this.messsage = undefined
          }, 1500)
        })
    },
  },
  data() {
    return {
      dialog: false,
      disabled: false,
      message: undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>

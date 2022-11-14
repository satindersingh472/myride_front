<template>
  <div>
    <!-- dialog box will appear when button is clicked -->
    <v-dialog  transition="dialog-bottom-transition" v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <!-- when this button is clicked the dialog box will appear -->
        <v-btn class="ma-3" color="success" dark v-bind="attrs" v-on="on">
          Book Ride
        </v-btn>
      </template>
   
     <v-card>
        <!-- v-card is actually a dialogue box containing a message and confirmation button
        for sending api request and go back button -->
        <v-toolbar class="yellow darken-3" >
           <v-card-title>
          Terms and Conditions
        </v-card-title>
        </v-toolbar>
        <!-- just a text to display inside the box and on success the booking will be displayed -->
        <v-card-text class="text-h6" >
            <p v-if="message !== undefined" >{{message}}</p>
                <div v-if="message === undefined" >
                <p> 
                Press Confirm to Book a ride or cancel to go back.Your booking id will be sent to you via email.
                For further inquiries please email me at
                </p>
                <p>{{detail['rider_email']}}</p>
                </div>
        </v-card-text>
            <v-card-actions>
          <v-spacer></v-spacer>
          <!-- three different events are attached to this button -->
          <v-btn @click="dialog = false; message = undefined; disabled = false" class="my-4 red">Go Back</v-btn>
          <!-- this button will send an api request and will be disabled on success response from api -->
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
    // will send a request with valid header and data arguments
    send_request() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/booking_passenger`,
          method: 'POST',
          headers: { token: cookies.get('token') },
          data: { ride_id: this.detail['ride_id'] },
        })
        // on success booking id will be shown and button will be disabled
        .then((response) => {
          this.message =  `Your booking Id is: ${response['data']['booking_id']}`
          this.disabled = true
          setTimeout(() => {
            this.message = undefined
            this.disabled = false
            this.dialog = false
          }, 3000);
        })
        // on error the message will be displayed and it will disapper at 1500 milliseconds
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

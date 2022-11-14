<template>
  <div>
    <!-- this component will help show the status as button if confirmed,not-confirmed, completed or not -->
    <v-row class="mr-2 my-3" justify="end">
      <!-- this button is attached to an event and send the request to an api
      this button only exists if booking is not yet confirmed if booking is confirmed then this -->
      <v-btn
      v-show="not_confirmed"
        class="warning"
        @click="confirm_booking"
      >
        confirm Booking
      </v-btn>
<!-- this button will be shown  when booking is confirmed-->
      <v-btn v-show="confirmed" class="success">
        Booking Confirmed
      </v-btn>
    </v-row>
    <v-row justify="end" class="mr-2 my-3">
      <!-- badge button will be shown when not confirmed and not complete -->
      <v-badge
        v-show="confirmed_incomplete"
        color="error"
        icon="mdi-lock"
        overlap
      >
        <v-btn disabled>
          Complete Booking
        </v-btn>
      </v-badge>
      <!-- this button will be shown when booking can be complete means when it is confirmed but not complete yet -->
      <v-btn
        v-show="not_completed"
        class="warning"
        @click="complete_booking"
      >
        Complete Booking
      </v-btn>
      <!-- this is shown when booking is complete -->
      <v-btn
        v-show="completed"
        class="success"
      >
        Booking Completed
      </v-btn>
      <!-- if any error occurs during api request -->
      <h3 v-if="message !== undefined" >{{message}}</h3>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  props: {
    detail: Object,
  },
  mounted () {

    // if booking is confirmed and completed then confirmed and complete will be true
    // this will show the green buttons for confirm and complete
    if(this.detail['is_confirmed'] === 1 && this.detail['is_completed'] === 1){
      this.confirmed = true
      this.completed = true
    // if booking confirmed but not completed then confirmed is true and not completed is true
    // this will status green for confirmed but complete button booking will be available to make a request
    } else if(this.detail['is_confirmed'] === 1 && this.detail['is_completed'] === 0){
      this.confirmed = true
      this.not_completed = true
    // if booking not confirmed and not completed then not confirmed will be orange and can make request to confirm
    // and complete button will be disabled so that it will activate when booking is confirmed
    } else if(this.detail['is_confirmed'] === 0 && this.detail['is_completed'] === 0){
      this.not_confirmed = true
      this.confirmed_incomplete = true
    }

  },

  methods: {
    confirm_booking() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/booking_rider`,
          method: 'PATCH',
          headers: {
            token: cookies.get('token'),
          },
          data: {
            booking_id: this.detail['booking_id'],
            is_confirmed: 'true'
          },
        })
        .then((response) => {
          if(response['data']['is_confirmed'] === 1){
            this.confirmed = true
            this.not_confirmed = false
            this.confirmed_incomplete = false
            this.not_completed = true
          }
        })
        .catch((error) => {
          this.message = error['response']['data']
        })
    },
     complete_booking() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/booking_rider`,
          method: 'PATCH',
          headers: {
            token: cookies.get('token'),
          },
          data: {
            booking_id: this.detail['booking_id'],
            is_completed: 'true'
          },
        })
        .then((response) => {
          if(response['data']['is_completed'] === 1){
            this.completed = true
            this.not_completed = false
            this.confirmed_incomplete = false
          }
        })
        .catch((error) => {
          this.message = error['response']['data']
        })
    },
  },
  data() {
    return {
      confirmed: false,
      not_confirmed: false,
      completed: false,
      not_completed: false,
      confirmed_incomplete: false,
      message: undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>

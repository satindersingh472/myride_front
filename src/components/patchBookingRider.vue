<template>
  <div>
    <v-row class="mr-2 my-3" justify="end">
      <v-btn
      v-show="not_confirmed"
        class="warning"
        @click="confirm_booking"
      >
        confirm Booking
      </v-btn>

      <v-btn v-show="confirmed" class="success">
        Booking Confirmed
      </v-btn>
    </v-row>
    <v-row justify="end" class="mr-2 my-3">
      <v-badge
        v-show="not_confirmed"
        color="error"
        icon="mdi-lock"
        overlap
      >
        <v-btn disabled>
          Complete Booking
        </v-btn>
      </v-badge>
      <v-btn
        v-show="not_completed"
        class="warning"
      >
        Complete Booking
      </v-btn>
      <v-btn
        v-show="completed"
        class="success"
      >
        Booking Completed
      </v-btn>
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
    if(this.detail['is_confirmed'] === 0){
      this.confirmed = false
      this.not_confirmed = true
    } else if (this.detail['is_confirmed'] === 1){
      this.confirmed = true
      this.not_confirmed = false
    }

    if(this.detail['is_completed'] === 0){
      this.completed = false
      this.not_completed = true
    } else {
      this.complete = true
      this.not_completed = false
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
      not_confirmed: true,
      completed: false,
      not_completed: true,
      message: undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>

<template>
  <div>
   
    
    <div v-if="message !== undefined">
      <v-row justify="center" >
        <p class="primary--text my-5 text-h4" >{{message}}</p>
      </v-row>
    </div>


    <v-container v-if="message === undefined" >
      <v-row class="my-5" justify="center">
      <p class="my-5 primary--text text-h4">Details and Bookings for  Ride ID:{{ details[0]['ride_id'] }}</p>
    </v-row>
      <v-row justify="center">
        <v-col
          cols="10"
          lg="5"
          md="8"
          v-for="(detail, index) in details"
          :key="index"
        >
          <v-card class="grey lighten-3 rounded-lg pa-2" elevated="5">
            <h4>Note: Booking should be confirmed before completing</h4>
            <v-row>
              <v-col cols="12" lg="8">
                <h4 class="text-h5 my-2">
                  Booking ID: {{ detail['booking_id'] }}
                </h4>
                <h3>
                  Passenger:
                  {{ detail['passenger_first_name'] }}
                  {{ detail['passenger_last_name'] }}
                </h3>
                <h3>Contact: {{ detail['phone_number'] }}</h3>
                <h3>Email: {{ detail['email'] }}</h3>
              </v-col>
              <v-col cols="12" lg="4">
                <!-- this component will patch the rides for rider for example
                will show different button based on status on the booking
                and also will expect prop so that it can work -->
                <patch-booking-rider :detail="detail" ></patch-booking-rider>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
// import NavigationPage from '@/components/navigationPage.vue'
import PatchBookingRider from '@/components/patchBookingRider.vue'
export default {
  components: { 
     PatchBookingRider 
     },
  mounted() {
    this.get_ride_details()
       // emit the response so that components that needs this response will get false value
    this.$root.$emit('cookies_presence',true)
  },

  methods: {
    get_ride_details() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/booking_rider`,
          headers: {
            token: cookies.get('token'),
          },
          params: {
            ride_id: cookies.get('ride_id'),
          },
        })
        .then((response) => {
          this.details = response['data']
        })
        .catch((error) => {
          this.message = error['response']['data']
        })
    },
  },

  data() {
    return {
      details: undefined,
      message: undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>

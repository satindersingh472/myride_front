<template>
  <div>
    <navigation-page></navigation-page>
    <v-row class="my-5" justify="center">
      <v-card class="grey lighten-3 pa-5">
        <v-row>
          <v-col >
            <h3>Ride ID:{{details[0]['ride_id']}}</h3>
            <h3>From: {{details[0]['from_city']}}</h3>
          </v-col>
        </v-row>
      </v-card>
      <!-- <h1 class="my-5 purple--text text-h4">
        Bookings for Ride ID: {{ details[0]['ride_id'] }}
      </h1> -->
    </v-row>
    <v-container>
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
                <p class="text-h4">
                  {{ detail['passenger_first_name'] }}
                  {{ detail['passenger_last_name'] }}
                </p>
                <h3>Contact Passenger: {{ detail['phone_number'] }}</h3>
                <h3>Email Passenger: {{ detail['email'] }}</h3>
              </v-col>
              <v-col cols="12" lg="4">
                <v-row class="mr-2 my-3" justify="end">
                  <!-- this component will confirm the ride by sending an api reqyest and it will act like a button -->
                  <confirm-booking  v-if="detail['is_confirmed'] == 0"></confirm-booking>
                  <!-- <v-btn v-if="detail['is_confirmed'] == 0" class="warning">
                    Confirm Booking
                  </v-btn> -->
                  <v-btn v-if="detail['is_confirmed'] == 1" class="success">
                    Booking Confirmed
                  </v-btn>
                </v-row>
                <v-row justify="end" class="mr-2 my-3">
                  <v-badge
                    v-if="
                      detail['is_confirmed'] == 0 && detail['is_completed'] == 0
                    "
                    color="error"
                    icon="mdi-lock"
                    overlap
                  >
                    <v-btn disabled>
                      Complete Order
                    </v-btn>
                  </v-badge>
                  <v-btn
                    v-if="
                      detail['is_confirmed'] == 1 && detail['is_completed'] == 0
                    "
                    class="warning"
                  >
                    Complete Booking
                  </v-btn>
                  <v-btn
                    v-if="
                      detail['is_confirmed'] == 1 && detail['is_completed'] == 1
                    "
                    class="success"
                  >
                    Booking Completed
                  </v-btn>
                </v-row>
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
import NavigationPage from '@/components/navigationPage.vue'
import ConfirmBooking from '@/components/confirmBooking.vue'
export default {
  components: { NavigationPage,ConfirmBooking },
  mounted() {
    this.get_ride_details()
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
    }
  },
}
</script>

<style lang="scss" scoped></style>

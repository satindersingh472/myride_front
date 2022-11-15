<template>
  <div>
  
      <!-- this component will get the bookings made as a passenger and show them to the user 
      also if cancel booking is pressed then dialog box will appear-->
      <!-- <navigation-page></navigation-page> -->
      <v-row justify="center">
        <p  class="my-5 purple--text text-h3"  >My Booked Rides</p>
      </v-row>
      <v-container>
        <!-- will show a just a message if error exists -->
        <h2 style="text-align:center;" v-if="message !== undefined">{{ message }}</h2>
        <v-row v-if="message === undefined" justify="center">
          <v-col
            cols="10"
            lg="6"
            md="5"
            v-for="(detail, index) in details"
            :key="index"
          >
            <v-card class="rounded-xl grey lighten-3" elevation="5">
              <v-row class="my-3">
                <v-col cols="12" lg="6" class="pa-6">
                  <p class="text-h5 font-weight-bold">
                    From: {{ detail['from_city'] }},{{ detail['from_prov'] }}
                  </p>
                  <p
                    class="text-h5 grey--text text--darken-3 font-weight-bold"
                  >
                    To: {{ detail['to_city'] }},{{ detail['to_prov'] }}
                  </p>
                  <v-divider></v-divider>
                  <h3>Booking ID: {{ detail['booking_id'] }}</h3>
                  <h3>Travel Date: {{ detail['travel_date'] }}</h3>
                  <h3>Leave Time: {{ detail['leave_time'] }}</h3>
                  <v-divider></v-divider>
                  <h3>Ride ID: {{ detail['ride_id'] }}</h3>
                  <h3>Driver ID: {{ detail['rider_id'] }}</h3>
                  <h3>
                    Driver: {{ detail['rider_first_name'] }}
                    {{ detail['rider_last_name'] }}
                  </h3>
                  <h3>Contact Driver: {{ detail['rider_phone_number'] }}</h3>
                  <h3>Email Driver: {{ detail['rider_email'] }}</h3>
                </v-col>
                <v-col
                  cols="12"
                  lg="6"
                  align-self="start"
                  class="d-flex justify-end"
                >
                  <!-- if booking is not confirmed the button will be grey and if confirmed the button will be green -->
                  <v-card-actions>
                    <v-row>
                      <v-col cols="12">
                        <v-btn
                          v-if="detail['is_confirmed'] == 0"
                          class="white--text grey"
                        >
                          Not Confirmed
                        </v-btn>
                        <v-btn
                          v-if="detail['is_confirmed'] == 1"
                          class="success"
                        >
                          Confirmed
                        </v-btn>
                      </v-col>
                      <!-- if booking is not completed then button displaying status will be grey otherwise green -->
                      <v-col>
                        <v-btn
                          v-if="detail['is_completed'] == 0"
                          class="white--text grey"
                        >
                          Not Completed
                        </v-btn>
                        <v-btn
                          v-if="detail['is_completed'] == 1"
                          class="success"
                        >
                          Completed
                        </v-btn>
                      </v-col>
                      <!-- if booking is not completed yet then the cancel booking button is still red
                      it means that client can not cancel the booking by themselves if booking is confirmed 
                      cancel booking passenger is expecting a prop and will use that prop in sending booking id
                      to the api and will emit the response on success so that the particular item will get deleted right away-->
                      <v-col cols="12">
                        <cancel-booking-passenger
                          v-if="detail['is_confirmed'] == 0"
                          :detail="detail"
                          @delete_response="index_splice(index, $event)"
                        ></cancel-booking-passenger>
                        <v-badge
                          v-if="detail['is_confirmed'] == 1"
                          color="error"
                          icon="mdi-lock"
                          overlap
                        >
                          <v-btn class="grey" disabled>Cancel Booking</v-btn>
                        </v-badge>
                        <h4>
                          Note: if booking is confirmed, call or email driver to
                          cancel the booking
                        </h4>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
// import NavigationPage from '@/components/navigationPage.vue'
import CancelBookingPassenger from '@/dialogs/cancelBookingPassenger.vue'
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  components: {
    // NavigationPage,
    CancelBookingPassenger,
  },

  mounted() {
       // emit the response so that components that needs this response will get false value
    this.$root.$emit('cookies_presence',true)
    this.get_bookings()
  },
  methods: {
    index_splice(index) {
      this.details.splice(index, 1)
    },

    get_bookings() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/booking_passenger`,
          headers: {
            token: cookies.get('token'),
          },
          params: {
            client_id: cookies.get('client_id'),
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
      message: undefined,
      details: undefined,
    }
  },
}
</script>

<style lang="scss" scoped></style>

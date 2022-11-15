<template>
  <div>
    <!-- this components make a request to an api and give back the rides and store the response into details -->
    <div v-if="message !== undefined">
      <!-- will show the message on error and it will also help the emit event to pass error pass message  -->
      <v-row justify="center" align="end" class="mt-4">
        <v-card>
        <v-col cols="12" >
          <h2>{{ message }}</h2>
        </v-col>
        <v-col cols="12">
          <v-btn @click="get_rides"  :disabled="disabled" class="primary">Show upcoming rides</v-btn>
        </v-col>
        </v-card>
      </v-row>
    </div>
    <v-container v-if="message === undefined">
      <v-row justify="start">
        <v-col
          cols="10"
          lg="5"
          md="6"
          v-for="(detail, index) in details"
          :key="index"
        >
          <v-card elevation="8" class="rounded-xl grey lighten-3">
            <v-card-title>
              <p class="text-sm-h4 font-weight-bold">
                From : {{ detail['from_city'] }},{{ detail['from_prov'] }}
              </p>
            </v-card-title>
            <v-card-subtitle class="text-sm-h5">
              <h2>Arrival: {{ detail['to_city'] }},{{ detail['to_prov'] }}</h2>
            </v-card-subtitle>
            <div class="mx-4">
              <h2>Driver: {{ detail['rider_first_name'] }}</h2>
            </div>
            <div class="mx-4">
              <h3>Departure Date: {{ detail['travel_date'] }}</h3>
            </div>
            <div class="mx-4">
              <h3>Departure Time: {{ detail['leave_time'] }}</h3>
            </div>
            <div class="mx-4">
              <h3>Ride ID: {{ detail['ride_id'] }}</h3>
            </div>
            <div class="d-flex justify-end mx-6">
              <book-ride :detail="detail"></book-ride>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BookRide from '@/dialogs/bookRide.vue'
import axios from 'axios'
export default {
  components: {
    BookRide,
  },
  // on mounted it will execute get rides function and also listen to the global events
  mounted() {
    this.get_rides()
    // it will help show the rides if there is any related to the search
    this.$root.$on('search_response', this.change_details)
    // it will help show the error message if no rides matches the result
    this.$root.$on('search_response_error', this.change_message)
  },

  methods: {
    // will change details upom listening to global event
    change_details(new_details) {
      this.details = new_details
    },
    // will show message listening to global event
    change_message(new_message) {
      this.message = new_message
    },
    // will make a request to an api
    get_rides() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/rides`,
        })
        // on success catch the response
        .then((response) => {
          // this will erase the previous message due to other errors 
          this.message = undefined
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
      disabled: false
    }
  },
}
</script>

<style lang="scss" scoped></style>

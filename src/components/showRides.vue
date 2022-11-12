<template>
  <div app>
    <!-- this components make a request to an api and give back the rides and store the response into details -->
    <div v-if="message !== undefined" >
      {{message}}
    </div>
    <v-container>
      <v-row justify="center">
        <v-col cols="10" v-for="(detail, index) in details" :key="index">
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
              <h2>Transporter: {{ detail['rider_first_name'] }}</h2>
            </div>
            <div class="mx-4">
              <h3>Departure Date: {{ detail['travel_date'] }}</h3>
            </div>
            <div class="mx-4">
              <h3>Departure Time: {{ detail['leave_time'] }}</h3>
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
import BookRide from '@/components/bookRide.vue'
import axios from 'axios'
export default {
  components: {
    BookRide,
  },
  // on mounted it will execute get rides function
  mounted() {
    this.get_rides()

    this.$root.$on('search_response',this.change_details)
  },
  // this method will execute the request to an api and get back the response
  methods: {
    change_details(new_details){
      this.details = new_details
    },


    get_rides() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/rides`,
        })
        // on success catch the response
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
      image_srcs: [],
    }
  },
}
</script>

<style lang="scss" scoped></style>

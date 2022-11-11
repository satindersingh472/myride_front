<template>
  <div>
    <!-- <nav-bar></nav-bar> -->
    <v-row>
      <v-col cols="auto" class="mr-2">
        <navigation-page></navigation-page>
      </v-col>
      <v-col>
    <v-app>
      <v-container>
        <v-row justify="center" >
          <v-col
             sm="12" md="10" lg="7" 
            v-for="(detail, index) in details"
            :key="index"
          >
            <v-card  elevation="8" class="rounded-xl grey lighten-3">
              <v-card-title>
                <h3 class="text-sm-h4 font-weight-bold " >Departure: {{ detail['from_city']}}</h3> 
              </v-card-title>
              <v-card-subtitle>
                <h2>Arrival: {{detail['to_city']}}</h2>
              </v-card-subtitle>
              <div class="mx-4">
                <h2>Transporter: {{ detail['rider_first_name'] }}</h2>
              </div>
              <div class="mx-4">
                <h3>Departure Date: {{ detail['travel_date'] }}</h3>
              </div>
              <div class="mx-4"><h3>Departure Time: {{ detail['leave_time'] }}</h3></div>
              <div class="d-flex justify-end mx-6">
                <book-ride :detail="detail" ></book-ride>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BookRide from '@/components/bookRide.vue'
import axios from 'axios'
// import NavBar from '@/components/navBar.vue'
import NavigationPage from "@/components/navigationPage.vue"
export default {
  components: {
    BookRide,
    // NavBar,
    NavigationPage
  },
  mounted() {
    this.get_rides()
  },
  methods: {
    get_rides() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/rides`,
          // responseType: 'blob'
        })
        .then((response) => {
          this.details = response['data']
        })
        .catch((error) => {
          error
        })
    },
  },
  data() {
    return {
      details: undefined,
      image_srcs: [],
    }
  },
}
</script>

<style lang="scss" scoped></style>

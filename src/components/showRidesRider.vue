<template>
  <div app>
    <!-- this component is for the rider who wants to see the rides posted and delete or edit them -->
    <div v-if="message !== undefined">
      <!-- will show the message on error and it will also help the emit event to pass error pass message  -->
      <v-row justify="center" align="end" class="mt-4">
        <h1 class="red--text">{{ message }}</h1>
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
              <h3>Departure Date: {{ detail['travel_date'] }}</h3>
            </div>
            <div class="mx-4">
              <h3>Departure Time: {{ detail['leave_time'] }}</h3>
            </div>
            <div class="mx-4">
              <h3>Ride ID: {{ detail['ride_id'] }}</h3>
            </div>
            <div>
              <edit-ride  @edit_response="replace_details(index,$event)" :detail="detail" ></edit-ride>
              <!-- sending a prop for deleting and expecting an event and it will delete the ride
                after a successfull response from the ridedelete component -->

              <ride-delete
                @delete_ride_response="index_splice(index, $event)"
                :ride_id="detail['ride_id']"
              ></ride-delete>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RideDelete from '@/dialogs/rideDelete.vue'
import EditRide from "@/dialogs/editRide.vue"
export default {
  components: {
    RideDelete,
    EditRide
  },

  mounted() {
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
    // will remove the ride from the array without refreshing
    index_splice(index) {
      this.details.splice(index, 1)
    },
    replace_details(index,detail){
        this.details.splice(index,1,detail)
    }
  


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

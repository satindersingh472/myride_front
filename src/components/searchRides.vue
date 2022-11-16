<template>
  <div>
    <!-- this component will search the rides through api and emit the results as search_response and send the details along -->
    <v-sheet style="display: grid; place-items: center;" min-height="300">
      <p class="text-h4 text-center primary--text">
        Search Rides
      </p>
      <p>Just enter one or both fields and press search</p>
      <div>
        <v-row justify="center">
          <v-col cols="10" lg="5" md="6">
            <!-- <p>for all rides from particular city just enter name in the <strong>From</strong> field and search</p> -->
            <v-text-field
              v-model="city_one"
              style="width: 300px;"
              class="rounded-xl"
              outlined
              label="From"
            ></v-text-field>
          </v-col>
          <v-col cols="10" lg="5" md="6">
            <!-- <p>for all rides to a particular city just enter the city in <strong>To</strong> field and press search</p> -->
            <v-text-field
              v-model="city_two"
              class="rounded-xl"
              outlined
              label="To"
              style="width: 300px;"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div>
        <!-- this button will send the request to an api -->
        <v-btn class="success rounded-xl" @click="send_request" large>
          Search
        </v-btn>
      </div>
      <p v-if="message !== undefined">{{ message }}</p>
    </v-sheet>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    // send an api request
    send_request() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/rides_filter`,
          params: {
            // from city and to city are the two cities for search
            from_city: this.city_one,
            to_city: this.city_two,
          },
        })
        // after a response emit the global event and send the data to show rides components
        .then((response) => {
          this.$root.$emit('search_response', response['data'])
        })
        // on error emit the event to show the error message
        .catch((error) => {
          this.$root.$emit('search_response_error', error['response']['data'])
        })
    },
  },
  data() {
    return {
      city_one: undefined,
      city_two: undefined,
      message: undefined,
    }
  },
}
</script>

<style lang="scss" scoped></style>

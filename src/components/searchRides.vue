<template>
  <div>
    <!-- this component will search the rides through api and emit the results as search_response and send the details along -->
    <v-sheet style="display: grid; place-items: center;" min-height="300">
      <p class="text-h3 font-weight-bold purple--text text--darken-3">
        Where do you want to go?
      </p>
      <div>
        <v-text-field
          v-model="city_one"
          style="width: 300px;"
          class="rounded-xl"
          outlined
          label="From"
        ></v-text-field>
        <v-text-field
          v-model="city_two"
          class="rounded-xl"
          outlined
          label="To"
          style="width: 300px;"
        ></v-text-field>
      </div>
      <div>
        <!-- this button will send the request to an api -->
        <v-btn class="success rounded-xl" @click="send_request"  large>Search</v-btn>
      </div>
      <p v-if="message !== undefined">{{message}}</p>
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
        .request({ url: `${process.env.VUE_APP_BASE_DOMAIN}/api/rides_filter`,
         params:{
          // from city and to city are the two cities for search
          from_city: this.city_one,
          to_city: this.city_two
         }
        })
        // after a response emit the global event and send the data to show rides components
        .then((response) => {
          this.$root.$emit('search_response',response['data'])
        })
        // on error show the message
        .catch((error) => {
          this.message = error['response']['data']
          setTimeout(() => {
            this.message = undefined
          }, 1500);
        })
    },
  },
  data() {
    return {
      city_one: undefined,
      city_two: undefined,
      message: undefined


    }
  },
}
</script>

<style lang="scss" scoped></style>

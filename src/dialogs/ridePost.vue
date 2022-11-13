<template>
  <div>
    <!-- this component is expecting props and will use that props to send as data with api
        and also to user information before confirmation -->
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <!-- when this button is clicked the dialog box will appear -->
        <v-btn class="ma-3" color="success" dark v-bind="attrs" v-on="on">
          Post Ride
        </v-btn>
      </template>
      <v-card>
        <v-toolbar class="yellow darken-3">
          Press Confirm to post or Cancel to go back
        </v-toolbar>
        <v-card-text v-if="message === undefined">
          From City : {{ city_one }}
          <br />
          From Province : {{ prov_one }}
          <br />
          To City : {{ city_two }}
          <br />
          To Province : {{ prov_two }}
          <br />
          Travel Date : {{ travel_date }}
          <br />
          Leave Time : {{ leave_time }}
          <br />
        </v-card-text>
        <v-card-text v-if="message !== undefined">{{ message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="red darken-3 white--text"
            @click="
              dialog = false
              disabled = false
            "
          >
            Go Back
          </v-btn>
          <v-btn class="success" :disabled="disabled" @click="post_ride">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  props: {
    city_one: String,
    city_two: String,
    prov_one: String,
    prov_two: String,
    leave_time: String,
    travel_date: String,
  },
  methods: {
    post_ride() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/ride`,
          method: 'POST',
          headers: {
            token: cookies.get('token'),
          },
          data: {
            from_city: this.city_one,
            from_prov: this.prov_one,
            to_city: this.city_two,
            to_prov: this.prov_two,
            travel_date: this.travel_date,
            leave_time: this.leave_time,
          },
        })
        .then((response) => {
          this.disabled = true
          this.message = `Your Ride ID : ${response['data']['ride_id']}`
          this.$root.$emit('success_response', true)
          setTimeout(() => {
            this.dialog = false
          }, 1500);
        })
        .catch((error) => {
          this.message = error['response']['data']
          setTimeout(() => {
            this.message = undefined
            this.dialog = false
          }, 2000)
        })
    },
  },
  data() {
    return {
      disabled: false,
      dialog: false,
      message: undefined,
    }
  },
}
</script>

<style lang="scss" scoped></style>

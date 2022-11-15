<template>
  <div>
    <!-- this componetn will post a ride for the rider and other users can see the rides posted -->
    <!-- it is just getting the information from the input fields and sending it all as props to the 
    dialog box component so that user can confirm before sending -->
    <!-- <navigation-page></navigation-page> -->
    <v-container>
      <v-row justify="center">
        <div>
          <p class="my-5 purple--text text-h3">Post a New Ride</p>
        </div>
      </v-row>
      <v-row justify="center">
        <v-form>
          <!-- below is the form with fields to fill -->
          <v-container>
            <form ref="form">
              <v-row justify="center">
                <v-col lg="6" md="7" sm="10" cols="12">
                  <v-text-field
                    v-model="city_one"
                    label="From City"
                    outlined
                    hint="For example, Edmonton, Calgary."
                  ></v-text-field>
                  <v-select
                    :items="items"
                    v-model="prov_one"
                    outlined
                    label="From Province"
                    hint="For example, AB,BC,SK,MB"
                  ></v-select>
                </v-col>
                <v-col lg="6" md="7" sm="10" cols="12">
                  <v-text-field
                    v-model="city_two"
                    label="To City"
                    outlined
                    hint="For example, Edmonton, Calgary"
                  ></v-text-field>
                  <v-select
                    :items="items"
                    v-model="prov_two"
                    outlined
                    label="To Province"
                    hint="For example, AB,BC,SK,MB"
                  ></v-select>
                </v-col>
                <v-col lg="6" md="7" sm="10" cols="12">
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Travel Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col lg="6" md="7" sm="10" cols="12">
                  <v-card width="300px" class="pa-2">
                    <v-toolbar class="my-2 primary white--text">
                      <h3
                        v-if="
                          an_hour !== undefined &&
                          a_minute !== undefined &&
                          am_pm !== undefined
                        "
                      >
                        {{ an_hour }}:{{ a_minute }} {{ am_pm }}
                      </h3>
                      <h3 v-else>No time selected</h3>
                    </v-toolbar>
                    <v-row>
                      <v-col>
                        <v-select
                          outlined
                          label="HH"
                          :items="hours"
                          v-model="an_hour"
                        ></v-select>
                      </v-col>
                      <v-col>
                        <v-select
                          outlined
                          label="MM"
                          :items="minutes"
                          v-model="a_minute"
                        ></v-select>
                      </v-col>
                      <v-col>
                        <v-select
                          outlined
                          label="AM"
                          :items="meridians"
                          v-model="am_pm"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </form>
            <!-- this below coomponent is used to generate the dialog box and accepting props which cab be used to send api request -->
            <v-row justify="center" class="my-8">
              <ride-post
                :city_one="city_one"
                :prov_one="prov_one"
                :city_two="city_two"
                :prov_two="prov_two"
                :travel_date="date"
                :leave_time="`${this.an_hour}:${this.a_minute} ${this.am_pm}`"
              ></ride-post>
            </v-row>
          </v-container>
        </v-form>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import NavigationPage from '@/components/navigationPage.vue'
import RidePost from '@/dialogs/ridePost.vue'
export default {
  components: {
    // NavigationPage,
    RidePost,
  },

  // will expect an event will reset the form on this page
  // this response is coming after success reponse of post ride
  mounted() {
    this.$root.$on('success_response', this.reset)
    // emit the response so that components that needs this response will get false value
    this.$root.$emit('cookies_presence', true)
  },

  // just reset the form and individually reset the time because it is not the part of a form it is just a string
  methods: {
    reset() {
      this.$refs['form'].reset()
      this.an_hour = undefined
      this.a_minute = undefined
      this.am_pm = undefined
    },
  },

  data() {
    return {
      items: [
        'AB',
        'BC',
        'MB',
        'NB',
        'NL',
        'PE',
        'NS',
        'QC',
        'ON',
        'SK',
        'YT',
        'NT',
        'NU',
      ],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modal: false,
      dialog: false,
      city_one: undefined,
      city_two: undefined,
      prov_one: undefined,
      prov_two: undefined,
      an_hour: undefined,
      a_minute: undefined,
      am_pm: undefined,

      hours: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
      ],
      minutes: ['00', '15', '30', '45'],
      meridians: ['AM', 'PM'],
    }
  },
}
</script>

<style lang="scss" scoped></style>

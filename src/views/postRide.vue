<template>
  <div app>
    <!-- this componetn will post a ride for the rider and other users can see the rides posted -->
    <navigation-page></navigation-page>
    <v-container>
      <v-row justify="center">
        <div>
          <h1 class="purple--text text--darken-3">Post a New Ride</h1>
        </div>
      </v-row>
      <v-row justify="center">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
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
              <v-col cols="12">
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
              <v-col cols="12">
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
              <v-col cols="12">
                <h3>Leaving the City at: </h3>
                <v-card width="350px" class="pa-2">
                  <v-toolbar class="my-2 primary white--text ">
                    <h3   
                    v-if="
                      an_hour !== undefined &&
                      a_minute !== undefined &&
                      am_pm !== undefined
                    " >{{ an_hour }}:{{a_minute}} {{am_pm}}</h3>
                    <h3  v-else>No time selected</h3>
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
            <v-row justify="center" class="my-8">
              <v-btn class="success rounded-lg" x-large>
                Post Ride
              </v-btn>
            </v-row>
          </v-container>
        </v-form>
      
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavigationPage from '@/components/navigationPage.vue'
export default {
  components: {
    NavigationPage,
  },

  mounted() {
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
      prov_one: undefined,
      prov_two: undefined,
      dialog: false,
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
      an_hour: undefined,
      a_minute: undefined,
      am_pm: undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <v-row justify="end">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="primary mr-6 mb-6" v-bind="attrs" v-on="on">
            Edit Ride
          </v-btn>
        </template>
        <v-card>
          <v-toolbar class="yellow darken-3">
            just change fields which are not correct Please save after making
            changes. Original values are displayed inside brackets
          </v-toolbar>
          <v-card-text class="mt-5" style="display: grid; gap: 15px;">
            <div>
              <label class="text-h6" for="from_city">
                From City:({{ detail['from_city'] }})
              </label>
              <input
                class="text-h6"
                style="border: 1px solid grey; text-align: center;"
                type="text"
                v-model="new_from_city"
                placeholder="Edit from city name"
              />
            </div>
            <div>
              <label for="from_prov" class="text-h6">
                From Province:({{ detail['from_prov'] }})
              </label>
              <select
                class="pa-1"
                name="from_prov"
                style="border: 2px solid black;"
                v-model="new_from_prov"
                ref="from_prov"
              >
                <option value="AB">AB</option>
                <option value="BC">BC</option>
                <option value="NL">NL</option>
                <option value="PE">PE</option>
                <option value="NS">NS</option>
                <option value="NB">NB</option>
                <option value="QC">QC</option>
                <option value="ON">ON</option>
                <option value="MB">MB</option>
                <option value="SK">SK</option>
                <option value="YT">YT</option>
                <option value="NT">NT</option>
                <option value="NU">NU</option>
              </select>
            </div>
            <div>
              <label class="text-h6" for="to_city">
                To City:({{ detail['to_city'] }})
              </label>
              <input
                class="text-h6"
                type="text"
                style="border: 1px solid grey; text-align: center;"
                placeholder="Edit to city name"
                v-model="new_to_city"
              />
            </div>
            <div>
              <label for="from_prov" class="text-h6">
                To Province:({{ detail['to_prov'] }})
              </label>
              <select
                class="pa-1"
                name="from_prov"
                style="border: 2px solid black;"
                v-model="new_to_prov"
                ref="from_prov"
              >
                <option value="AB">AB</option>
                <option value="BC">BC</option>
                <option value="NL">NL</option>
                <option value="PE">PE</option>
                <option value="NS">NS</option>
                <option value="NB">NB</option>
                <option value="QC">QC</option>
                <option value="ON">ON</option>
                <option value="MB">MB</option>
                <option value="SK">SK</option>
                <option value="YT">YT</option>
                <option value="NT">NT</option>
                <option value="NU">NU</option>
              </select>
            </div>
            <div>
              <label class="text-h6" for="date">
                Current Travel date: {{ detail['travel_date'] }}
              </label>
            </div>
            <div>
              <label class="text-h6" for="new_date">New Travel Date:  </label>
              <input class="text-h6" type="date" v-model="new_travel_date" />
            </div>
            <div>
                <label class="text-h6" for="leave_time">Current Leave Time: {{detail['leave_time']}}</label>
            </div>
            <div>
                <label class="text-h6" for="new_leave_time">New Leave Time: </label>
                 <v-col cols="12">
                <h3>Leaving the City at:</h3>
                <v-card width="350px" class="pa-2">
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
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="red text-white" @click="dialog = false">Cancel</v-btn>
            <v-btn class="success" @click="ride_patch">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  props: {
    detail: Object,
  },

  data() {
    return {
      dialog: false,
      new_from_prov: undefined,
      new_from_city: undefined,
      new_to_city: undefined,
      new_to_prov: undefined,
      new_travel_date: undefined,
      

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
      am_pm: undefined,
      new_leave_time: undefined
    }
  },

  methods: {

    ride_patch() {
        if(this.an_hour !== undefined && this.a_minute !== undefined && this.am_pm !== undefined){
            this.new_leave_time = `${this.an_hour}:${this.a_minute} ${this.am_pm}`
        } else {
            this.new_leave_time = null
        }
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/ride`,
          method: 'PATCH',
          headers: {
            token: cookies.get('token'),
            ride_id: this.detail['ride_id'],
          },
          data: {
            from_city: this.new_from_city,
            from_prov: this.new_from_prov,
            to_city: this.new_to_city,
            to_prov: this.new_to_prov,
            travel_date: this.new_travel_date,
            leave_time: this.new_leave_time
            

          },
        })
        .then((response) => {
          response
        })
        .catch((error) => {
          error
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>

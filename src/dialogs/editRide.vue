<template>
  <div>
    <!-- this component will edit the ride by sending a patch request -->
    <v-row justify="end">
        <!-- dialog will appear upon editing -->
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
            Change fields which are not correct Please save after making
            changes. Original values are displayed inside brackets
          </v-toolbar>
          <!-- it will create all the details about the ride -->
          <v-card-text  v-if="message === undefined" class="mt-5" style="display: grid; gap: 15px;">
            <div>
                <!-- old from city and new from city 
                will show the old city with in label and new city in input field -->
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
                <!-- show the old from province and let us choose new from prov -->
              <label for="from_prov" class="text-h6">
                From Province:({{ detail['from_prov'] }})
              </label>
              <select
                class="pa-1"
                name="from_prov"
                style="border: 1px solid grey;"
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
                <!-- show old to city and let us choose new to city -->
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
                <!-- show the old to prov and let us choose new to prov -->
              <label for="to_prov" class="text-h6">
                To Province:({{ detail['to_prov'] }})
              </label>
              <select
                class="pa-1"
                name="from_prov"
                style="border: 1px solid grey;"
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
                <!-- will show the old travel date and let us enter the new date with the help of datepicker -->
              <label class="text-h6" for="date">
                Current Travel date: ({{ detail['travel_date'] }})
              </label>
            </div>
            <div>
              <label class="text-h6" for="new_date">New Travel Date:  </label>
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
            label="Choose New Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
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
            </div>
            <div>
                <!-- will show the old time and also let us enter the new time -->
                <label class="text-h6" for="leave_time">Current Leave Time: ({{detail['leave_time']}})</label>
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
          <v-card-text class="text-h6" v-if="message !== undefined">{{message}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="red text-white" @click="dialog = false;clear_all">Go Back</v-btn>
            <v-btn class="success" :disabled="disabled" @click="ride_patch">Save</v-btn>
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
        // basic functionality variables
        message: undefined,
      dialog: false,
      disabled: false,
    //   details getting from form inputs with v-model
      new_from_prov: undefined,
      new_from_city: undefined,
      new_to_city: undefined,
      new_to_prov: undefined,
      new_travel_date: undefined,
      an_hour: undefined,
      a_minute: undefined,
      am_pm: undefined,
    //   new_leave_time will be hh:mm am/pm if all of those are not undefined
      new_leave_time: undefined,
    //   date for datepicker
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        modal: false,
      
    // values for time card
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
      meridians: ['AM', 'PM']
      
    }
  },

  methods: {
    // will help us to reset the form after success or failure of an api
    clear_all(){
        this.new_from_prov = undefined
        this.new_from_city = undefined
        this.new_to_prov = undefined
        this.new_to_city = undefined
        this.new_leave_time = undefined
        this.new_travel_date = undefined
    },


    ride_patch() {
        // this conditional check is for db because db was not accepting undefined:undefined undefined from leave time
        // because those values were `${this.an_hour}:${this.a_minute} ${this.am_pm}` so if these are undefined 
        // then it will send null to the python and the python will consider it none and wont change it
        if(this.an_hour !== undefined && this.a_minute !== undefined && this.am_pm !== undefined){
            this.new_leave_time = `${this.an_hour}:${this.a_minute} ${this.am_pm}`
        } else {
            this.new_leave_time = null
        }
        // api request
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
            travel_date: this.date,
            leave_time: this.new_leave_time
            

          },
        })
        .then((response) => {
            // upon response emit the local event to change the values at the page and the response contains the updated data
          this.$emit('edit_response',response['data'])
        //   this will disable the button
          this.disabled = true
          this.clear_all()
          setTimeout(() => {
            // on 2 seconds will change these values
            this.dialog = false
            this.disabled = false
            this.message = undefined
          }, 1000);
        })
        // upon errors message will be shown
        .catch((error) => {
            this.disabled = true
          this.message = error['response']['data']
          this.clear_all()
          setTimeout(() => {
            this.message = undefined
            this.disabled = false
          }, 3000);
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>

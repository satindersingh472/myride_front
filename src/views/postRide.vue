<template>
  <div app>
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
                  label="From City"
                  outlined
                  hint="For example, Edmonton, Calgary."
                  required
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
              <v-row justify="center">
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
                <v-col cols="12" align-self="center">
                  <div style="place-items:center;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;border-bottom:1px solid black ">
                    <label class="text-h4" for="time">Leave Time</label>
                    <input class="text-h4" type="time" ref="time" v-model="time">
                  </div>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </v-form>
      </v-row>
    </v-container>
    <h2>from prov:{{ prov_one }}</h2>
    <h2>To Prov: {{ prov_two }}</h2>
  </div>
</template>

<script>
import NavigationPage from '@/components/navigationPage.vue'
export default {
  components: {
    NavigationPage,
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
      time:undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>

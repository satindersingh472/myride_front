<template>
  <div>
    <!-- this component will act as notification panel for pages
    and it will send two api requests one for image in the corner and the other for the name
    in the notification panel -->
    <div>
      <v-app-bar :value="cookies_present" app clipped-left>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-title
          class="text-h4 font-weight-bold yellow--text text--darken-3"
        >
          MyRide
        </v-app-title>
        <v-spacer />
      </v-app-bar>
      <!-- this is the side notification for the page in which various navigations are attached -->
      <v-navigation-drawer
        :value="cookies_present"
        app
        v-model="drawer"
        clipped
      >
        <v-list class="text-h6">
          <v-list-item-group>
            <router-link
              class="text-decoration-none black--text"
              to="/discover_rides"
            >
              <v-list-item>
                <v-col>
                  <v-list-item-icon>
                    <v-icon color="blue" x-large>mdi-home</v-icon>
                  </v-list-item-icon>
                </v-col>
                <v-col>
                  <v-list-item-title>
                    Home
                  </v-list-item-title>
                </v-col>
              </v-list-item>
            </router-link>
            <router-link class="text-decoration-none" to="/personal_profile">
              <v-list-item>
                <v-col>
                  <v-icon color="green" x-large>mdi-account</v-icon>
                </v-col>
                <v-col>
                  <v-list-item-title>Profile</v-list-item-title>
                </v-col>
              </v-list-item>
            </router-link>
            <v-divider />
            <router-link
              class="black--text text-decoration-none"
              to="/post_ride"
            >
              <v-list-item>
                <v-col>
                  <v-icon color="brown" x-large>mdi-note-plus</v-icon>
                </v-col>
                <v-col>
                  <v-list-item-title>
                    Post Ride
                  </v-list-item-title>
                </v-col>
              </v-list-item>
            </router-link>
            <router-link
              class="black--text text-decoration-none"
              to="/posted_rides"
            >
              <v-list-item>
                <v-col>
                  <v-list-item-icon>
                    <v-icon x-large color="purple">
                      mdi-alpha-r-circle-outline
                    </v-icon>
                  </v-list-item-icon>
                </v-col>
                <v-col>
                  <v-list-item-title>
                    My Posted Rides
                  </v-list-item-title>
                </v-col>
              </v-list-item>
            </router-link>
            <router-link class="text-decoration-none" to="/passenger_bookings">
              <v-list-item>
                <v-col>
                  <v-icon x-large color="yellow darken-3">
                    mdi-alpha-b-circle-outline
                  </v-icon>
                </v-col>
                <v-col>
                  <v-list-item-title class="ml-7">
                    My Booked Rides
                  </v-list-item-title>
                </v-col>
              </v-list-item>
            </router-link>

            <v-list-item>
              <v-row class="text-center">
                <v-col>
                  <client-logout></client-logout>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import cookies from 'vue-cookies'
import ClientLogout from '@/dialogs/clientLogout.vue'
export default {
  components: {
    ClientLogout,
  },
  // on mount it will listen to the event and show or hide itself based on cookies response
  // every component will emit the response and let the navigation page know about cookies if no cookies then no navigation page component
  mounted() {
    this.$root.$on('cookies_presence', this.change_cookies)

    this.get_profile()
    // this.get_only_image()
  },

  methods: {
    change_cookies(response) {
      this.cookies_present = response
      this.drawer = false
    },
  },

  data() {
    return {
      shrink: true,
      drawer: false,
      cookies_present: true,
    }
  },
}
</script>

<style lang="scss" scoped></style>

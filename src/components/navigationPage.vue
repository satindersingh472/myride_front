<template>
  <div>
    <!-- this component will act as notification panel for pages
    and it will send two api requests one for image in the corner and the other for the name
    in the notification panel -->
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-title class="text-h4 font-weight-bold yellow--text text--darken-3">
        MyRide
      </v-app-title>
      <v-spacer />
      <v-list-item-avatar size="50" class="mr-6">
        <v-img :src="image"></v-img>
        <p v-if="message_two !== undefined">{{ message_two }}</p>
      </v-list-item-avatar>
    </v-app-bar>
    <!-- this is the side notification for the page in which various navigations are attached -->
    <v-navigation-drawer app v-model="drawer" clipped left>
      <v-list class="text-h6">
        <v-list-item-group>
          <v-row justify="center">
            <h3 v-if="message !== undefined">name not available</h3>
            <h3 v-if="message === undefined" class="my-6">
              {{ details['first_name'] }} {{ details['last_name'] }}
            </h3>
          </v-row>
          <v-divider />
          <v-list-item>
            <v-col>
              <v-list-item-icon>
                <v-icon color="blue" x-large>mdi-home</v-icon>
              </v-list-item-icon>
            </v-col>
            <v-col>
              <v-list-item-title>
                <router-link
                  class="text-decoration-none black--text"
                  to="/discover_rides"
                >
                  Home
                </router-link>
              </v-list-item-title>
            </v-col>
          </v-list-item>
          <v-divider />
          <v-list-item>
            <v-col>
              <v-icon color="brown" x-large>mdi-note-plus</v-icon>
            </v-col>
            <v-col>
              <v-list-item-title>
                <router-link class="black--text text-decoration-none" to='/post_ride'>Post Ride</router-link>
              </v-list-item-title>
            </v-col>
          </v-list-item>

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
                Posted Rides
              </v-list-item-title>
            </v-col>
          </v-list-item>
          <v-list-item>
            <v-col>
              <v-icon x-large color="yellow darken-3">
                mdi-alpha-b-circle-outline
              </v-icon>
            </v-col>
            <v-col>
              <v-list-item-title>
                Booked Rides
              </v-list-item-title>
            </v-col>
          </v-list-item>
          <v-list-item>
            <v-col>
              <v-icon color="green" x-large>mdi-account</v-icon>
            </v-col>
            <v-col>
              <v-list-item-title>Profile</v-list-item-title>
            </v-col>
          </v-list-item>
          <v-list-item>
            <v-col>
              <v-icon x-large color="black">
                mdi-logout
              </v-icon>
            </v-col>
            <v-col>
              <v-list-item-title>
                Logout
              </v-list-item-title>
            </v-col>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  // on mount it will execute the two functions to send the request and get the information about the profile
  mounted() {
    this.get_profile()
    this.get_only_image()
  },

  methods: {
    get_only_image() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client_image`,
          responseType: 'blob',
          headers: {
            token: cookies.get('token'),
          },
        })
        // will create the url from the string that was in the response
        .then((response) => {
          this.image = URL.createObjectURL(response['data'])
        })
        .catch((error) => {
          this.message_two = error['response']['data']
        })
    },

    get_profile() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
          params: {
            client_id: cookies.get('client_id'),
          },
        })
        .then((response) => {
          this.details = response['data']
        })
        .catch((error) => {
          this.message = error['response']['data']
        })
    },
  },

  data() {
    return {
      shrink: true,
      drawer: false,
      details: undefined,
      message: undefined,
      message_two: undefined,
      image: undefined,
    }
  },
}
</script>

<style lang="scss" scoped></style>

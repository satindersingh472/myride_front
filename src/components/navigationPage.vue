<template>
  <div>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-title class="text-h4 font-weight-bold yellow--text text--darken-3">
        MyRide
      </v-app-title>
      <v-spacer />
      <v-list-item-avatar size="50" class="mr-6 ">
    <v-img :src="image"></v-img>
      </v-list-item-avatar>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" clipped left>
      <v-list class="text-h6">
        <v-list-item-group>
          <v-row justify="center">
            <h3 class="my-6">{{ details['first_name']}} {{details['last_name']}}</h3>
          </v-row>
          <v-divider />
          <v-list-item>
            <v-col>
              <v-list-item-icon>
                <v-icon color="blue" x-large>mdi-home</v-icon>
              </v-list-item-icon>
            </v-col>
            <v-col>
              <v-list-item-title>Home</v-list-item-title>
            </v-col>
          </v-list-item>

          <v-list-item>
            <v-col>
              <v-list-item-icon>
                <v-icon color="blue darken-3" x-large>mdi-car-search</v-icon>
              </v-list-item-icon>
            </v-col>
            <v-col>
              <v-list-item-title>
                Find Rides
              </v-list-item-title>
            </v-col>
          </v-list-item>
          <v-divider />
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
          headers:{
            token: cookies.get('token')
          }
        })
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
      image: undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>

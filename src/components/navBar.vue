<template>
  <div>
    <div class="mobile_view">
      <v-toolbar v-if="mobile_view === true" class="yellow darken-3">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </v-toolbar>
      <v-navigation-drawer absolute temporary left v-model="drawer">
        <v-list>
          <v-list-item-group active-class="yellow darken-3">
            <v-list-item>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item>
              Account
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
    <div v-if="mobile_view === false">
        <v-toolbar class="yellow darken-3 " >
        <v-row class="mx-6 text-h5" align="center">
          <h3 class="font-weight-bold">MyRide</h3>
          <v-text class="mx-5">Rides</v-text>
          <v-col cols="2">
            <v-text-field v-model="text"></v-text-field>
          </v-col>
          <v-icon color="primary" large @click="text = 'yes'">
            mdi-magnify
          </v-icon>
        </v-row>
        </v-toolbar>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.screen_size()
    window.addEventListener('resize', this.screen_size)
  },

  methods: {
    screen_size() {
      if (document.documentElement.clientWidth < 500) {
        this.mobile_view = true
      } else if (document.documentElement.clientWidth >= 500) {
        this.mobile_view = false
      }
    },
  },
  data() {
    return {
      drawer: false,
      group: null,
      mobile_view: true,
      text: undefined,
    }
  },
}
</script>

<style lang="scss" scoped></style>

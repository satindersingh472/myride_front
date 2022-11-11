<template>
  <div> 
    <v-app-bar>
    <div class="mobile_view">
      <div v-if="mobile_view === true" class="yellow darken-3">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </div>
      <div>
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
      </div>
    </div>
    <div v-if="mobile_view === false">
      <v-toolbar class="yellow darken-3">
        <v-row class="mx-6 text-h5" align="center">
          <v-col cols="6">
            <v-text  class="font-weight-bold">MyRide</v-text>
          </v-col>
          <v-col cols="6" style="display:grid;" >
            <v-btn  style="justify-self:end;"  small class="grey lighten-2">Logout</v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
    </div>
    </v-app-bar>
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

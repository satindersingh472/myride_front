<template>
  <div>
    <v-app-bar app  clipped-left>
        <v-app-title class="text-h4 font-weight-bold yellow--text text--darken-3" >MyRide</v-app-title>
    </v-app-bar>



    <v-navigation-drawer
    app
      v-model="drawer"
      :mini-variant.sync="shrink"
      mini-variant-width="100px"
      fixed
      permanent
      clipped
    >
      <v-list class="text-h6">
        <v-list-item-group>
          <v-row justify="center" align="center" style="height: 60px;">
            <v-icon @click.stop="shrink = !shrink">mdi-chevron-left</v-icon>
          </v-row>
          <v-list-item>
            <v-col>
              <v-avatar class="grey"></v-avatar>
            </v-col>
            <v-col>
              <h3>user</h3>
            </v-col>
          </v-list-item>
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
                <v-icon x-large color="green">
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
export default {
  //   mounted() {
  //     this.screen_size()
  //     window.addEventListener('resize', this.screen_size)
  //   },

  //   methods: {
  //     screen_size() {
  //       if (document.documentElement.clientWidth < 1400) {
  //         this.mini = true
  //       } else if (document.documentElement.clientWidth >= 1400) {
  //         this.mini = false
  //       }
  //     },
  //   },
  data() {
    return {
      shrink: true,
      drawer: true,
    }
  },
}
</script>

<style lang="scss" scoped></style>

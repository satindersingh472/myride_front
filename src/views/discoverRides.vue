<template>
  <div>
    <!-- this component is using navigation search and show rides component to show the rides and search option and navigation -->
    <v-row>
      <v-col cols="1">
        <!-- <navigation-page></navigation-page> -->
      </v-col>
      <v-col>
        <v-col>
          <search-rides></search-rides>
        </v-col>
        <v-col>
          <v-row justify="center" >
            <h1 class="my-5 grey--text text-h4" >Upcoming Rides</h1>
          </v-row>
          <show-rides></show-rides>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import NavigationPage from '@/components/navigationPage.vue'
import SearchRides from '@/components/searchRides.vue'
import ShowRides from '@/components/showRides.vue'
export default {
  components: {
    // NavigationPage,
    SearchRides,
    ShowRides,
  },
  mounted () {
   // emit the response so that components that needs this response will get false value
    this.$root.$emit('cookies_presence',true)
  },
}
</script>

<style lang="scss" scoped></style>

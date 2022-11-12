<template>
  <div app>
    <!-- this component is using navigation search and show rides component to show the rides and search option and navigation -->
    <v-row>
      <v-col cols="1">
        <navigation-page></navigation-page>
      </v-col>
      <v-col>
        <v-col>
          <search-rides></search-rides>
        </v-col>
        <v-col>
          <show-rides></show-rides>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import NavigationPage from '@/components/navigationPage.vue'
import SearchRides from '@/components/searchRides.vue'
import ShowRides from '@/components/showRides.vue'
export default {
  components: {
    NavigationPage,
    SearchRides,
    ShowRides
  },

}
</script>

<style lang="scss" scoped></style>

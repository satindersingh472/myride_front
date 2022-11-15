<template>
  <v-app >
    <navigation-page></navigation-page>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavigationPage from './components/navigationPage.vue';
export default {
  name: 'App',
  components:{
    NavigationPage
  },

  methods: {
    change_cookies(response) {
      this.cookies_present = response
    }
  },


};
</script>
<style lang=scss >
</style>

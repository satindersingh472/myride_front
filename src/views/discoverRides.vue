<template>
  <div>
    <v-app>
        <v-container>
            <v-row>
      <v-col class="all_details" xs="12" sm="12" md="6" lg="4" v-for="(detail,index) in details" :key="index">
        <v-card elevation="8" >
            <v-card-title>{{detail['from_city']}} to {{detail['to_city']}}</v-card-title>
            <v-img height="250" :src="detail['profile_image']" ></v-img>
        </v-card>
      </v-col>
            </v-row>
        </v-container>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  mounted() {
    this.get_rides()
  },
  methods: {
    get_rides() {
      axios
        .request({ url: `${process.env.VUE_APP_BASE_DOMAIN}/api/rides`,
        // responseType: 'blob'
        })
        .then((response) => {
          this.details = response['data']
            for(let i=0;i<this.details.length;i++){
            this.details[i]['profile_image'] =  URL.createObjectURL(this.details[i])
    }
        })
        .catch((error) => {
          error
        })
    },
  },
  data() {
    return {
        details: undefined,
        image_srcs: []
    }
  },
}
</script>

<style lang="scss" scoped></style>

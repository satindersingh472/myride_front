<template>
    <div>
       <v-sheet style="display:grid;place-items:center;" min-height="300" >
            <p class=" text-h3 font-weight-bold purple--text text--darken-3">Where do you want to go?</p>
            <div>
              <v-text-field v-model="from_city" style="width:300px;" class="rounded-xl" outlined label="From" ></v-text-field>
              <v-text-field class="rounded-xl" outlined label="To" style="width:300px;" ></v-text-field>
            </div>
            <div>
              <v-btn class="success rounded-xl" large >Search</v-btn>
            </div>
          </v-sheet>
    </div>
</template>

<script>
import axios from 'axios'

    export default {
      
      methods: {
        send_request() {
          axios.requesy
        }
      },
    }
</script>

<style lang="scss" scoped>

</style>
<template>
  <div>
    <input type="date" v-model="today"/>
    <button @click="show_date" >submit</button>
    <div>
        <h1>{{today}}</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
show_date(){
    this.today = this.$refs['date']['value']
},

    send_request() {
      axios
        .request({ 
            url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
            data:{
                date: this.$refs['date']
            }
         })
        .then((response) => {
          response
        })
        .catch((error) => {
          error
        })
    },
  },
  data() {
    return {
        today: undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>

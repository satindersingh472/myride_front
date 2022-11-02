<template>
  <div>
    <h1>Hello world!!</h1>
    <form enctype="multipart/form-data">
    <input type="file"  name="file" ref="image" />
    <button @click="send_request">submit</button>
    </form>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    send_request() {
        this.image = this.$refs['image']['files'][0]
        let form = new FormData()
        form.append('file',this.image)
      axios
        .request({
             url: `${process.env.VUE_APP_BASE_DOMAIN}/api/user`,
             method: 'POST',
             headers:{
                'Content-Type': "multipart/form-data"
             },
            data: form 

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
        image: undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>

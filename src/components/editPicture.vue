<template>
  <div>
    <h1>Hello world!!</h1>
    <form>
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
        // let form = new FormData()
        // form.append('file',this.image)
      axios
        .request({
             url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client_image`,
             method: 'PATCH',
             headers:{
                'Content-Type': "multipart/form-data",
                token: '4111e4e608da49fc8cd228f08f788bfe'
             },
            data:{
              profile_image: this.image
            } 

         })
        .then((response) => {
          this.photo = URL.createObjectURL(response['data'])
        })
        .catch((error) => {
          error
        })
    },
  },
  data() {
    return {
        image: undefined,
        photo: undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>

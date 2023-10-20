<template>
  <div>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="350"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          size="130"
          v-bind="attrs"
          v-on="on"
          title="Edit Image"
          @click="disabled = false"
        >
          <v-img v-if="image !== undefined" :src="image"></v-img>
          <v-img
            v-if="image === undefined"
            src="@/assets/default_user.svg"
          ></v-img>
        </v-avatar>
        <v-row>
          <v-btn
            class="mt-5 ml-5"
            x-small
            @click="
              dialog = true
              disabled = false
            "
          >
            edit
            <v-icon x-small>mdi-pencil-outline</v-icon>
          </v-btn>
        </v-row>
      </template>
      <v-card>
        <v-toolbar class="yellow darken-3">Edit Image</v-toolbar>
        <v-card-text v-if="message === undefined">
          <v-file-input
            class="ma-5"
            prepend-icon="mdi-camera"
            outlined
            filled
            label="upload image file"
            v-model="image_upload"
            hint="(.png, .jpeg, .gif, .jpf) formats"
            persistent-hint
          ></v-file-input>
        </v-card-text>
        <v-card-text v-if="message !== undefined">{{ message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="grey"
            @click="
              dialog = false
              image_upload = undefined
            "
          >
            cancel
          </v-btn>
          <v-btn :disabled="disabled" @click="patch_image">
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'

export default {
  mounted() {
    this.grab_image()
  },
  methods: {
    grab_image() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client_image`,
          responseType: 'blob',
          params: {
            client_id: cookies.get('client_id'),
          },
        })
        .then((response) => {
          this.image = URL.createObjectURL(response['data'])
        })
        .catch(() => {
          this.image = undefined
        })
    },
    patch_image() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client_image`,
          method: 'PATCH',
          responseType: 'blob',
          headers: {
            token: cookies.get('token'),
            'Content-Type': 'multipart/form-data',
          },
          data: {
            profile_image: this.image_upload,
          },
        })
        .then((response) => {
          this.disabled = true
          this.dialog = false
          this.image_upload = undefined
          console.log(response)
          this.image = URL.createObjectURL(response['data'])
        })
        .catch((error) => {
          this.message = error['response']['data']
          this.disabled = true
          this.image_upload = undefined
          setTimeout(() => {
            this.message = undefined
            this.disabled = false
          }, 2000)
        })
    },
  },
  data() {
    return {
      image: undefined,
      dialog: false,
      disabled: true,
      image_upload: undefined,
      message: undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>

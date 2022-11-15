<template>
  <div>
    <div>
      <!-- this component will show the profile and edit the profile along with getting the profile image and edit the profile image -->
      <v-row justify="center">
        <p class="primary--text my-5 text-h4">Profile</p>
      </v-row>
    </div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="8">
          <v-card class="pa-2 rounded-lg">
            <v-row justify="end">
              <v-btn
                class="ma-3"
                @click="
                  disabled = false
                  read_mode = false
                "
              >
                edit profile
                <v-icon class="ml-2">mdi-pencil-outline</v-icon>
              </v-btn>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="6" lg="6">
                <profile-image></profile-image>
                <!-- <v-dialog
                  v-model="dialog_image"
                  transition="dialog-bottom-transition"
                  max-width="350"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-avatar
                      size="130"
                      v-bind="attrs"
                      v-on="on"
                      title="Edit Image"
                      @click="disabled_image_btn=false"
                    >
                      <v-img v-if="image !== undefined" :src="image"></v-img>
                      <v-img
                        v-if="image === undefined"
                        src="@/assets/default_user.svg"
                      ></v-img>
                    </v-avatar>
                    <v-row><v-btn class="mt-5 ml-5" x-small @click="dialog_image=true;disabled_image_btn=false" >edit <v-icon x-small>mdi-pencil-outline</v-icon></v-btn></v-row>
                  </template>
                  <v-card>
                    <v-toolbar class="yellow darken-3">Edit Image</v-toolbar>
                    <v-card-text v-if="message_error_image === undefined" >
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
                    <v-card-text v-if="message_error_image !== undefined" ></v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="error"
                        @click="
                          dialog_image = false
                          image_upload = undefined
                        "
                      >
                        cancel
                      </v-btn>
                      <v-btn class="success" :disabled="disabled_image_btn"  @click="patch_image">save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog> -->
           
              </v-col>
              <v-col class="ma-3" align-self="center">
                <v-textarea
                  class="text-caption"
                  label="Bio"
                  v-model="details['bio']"
                  outlined
                  :readonly="read_mode"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="10">
                <v-form :readonly="read_mode">
                  <v-text-field
                    label="First Name"
                    class="text-h5"
                    v-model="details['first_name']"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Last Name"
                    class="text-h5"
                    outlined
                    v-model="details['last_name']"
                  ></v-text-field>
                  <v-text-field
                    label="Email"
                    class="text-h5"
                    outlined
                    v-model="details['email']"
                  ></v-text-field>
                  <v-text-field
                    label="Contact"
                    class="text-h6"
                    outlined
                    v-model="details['phone_number']"
                  ></v-text-field>
                  <v-text-field
                    label="city"
                    class="text-h6"
                    outlined
                    v-model="details['city']"
                  ></v-text-field>
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="details['dob']"
                        label="Date of birth"
                        prepend-icon="mdi-calendar"
                        :disabled="disabled"
                        v-bind="attrs"
                        v-on="on"
                        class="text-h6"
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="details['dob']" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                  <v-row justify="center" class="my-10">
                    <v-btn
                      class="success"
                      :disabled="disabled"
                      @click="edit_profile"
                    >
                      save changes
                    </v-btn>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import ProfileImage from '@/dialogs/profileImage.vue'
export default {
components:{
    ProfileImage
},


  mounted() {
    this.grab_details()
    this.grab_image()
  },
  methods: {
    grab_details() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
          params: {
            client_id: cookies.get('client_id'),
          },
        })
        .then((response) => {
          this.details = response['data']
        })
        .catch((error) => {
          this.message = error['response']['data']
        })
    },
    // grab_image() {
    //   axios
    //     .request({
    //       url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client_image`,
    //       responseType: 'blob',
    //       params: {
    //         client_id: cookies.get('client_id'),
    //       },
    //     })
    //     .then((response) => {
    //       this.image = URL.createObjectURL(response['data'])
    //     })
    //     .catch(() => {
    //       this.image = undefined
    //     })
    // },
    edit_profile() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
          method: 'PATCH',
          headers: {
            token: cookies.get('token'),
          },
          data: {
            first_name: this.details['first_name'],
            last_name: this.details['last_name'],
            email: this.details['email'],
            city: this.details['city'],
            phone_number: this.details['phone_number'],
            bio: this.details['bio'],
            dob: this.details['dob'],
          },
        })
        .then(() => {
          this.disabled = true
          this.read_mode = true
        })
        .catch((error) => {
          this.message = error['response']['data']
        })
    },
    // patch_image() {
    //   axios
    //     .request({
    //       url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client_image`,
    //       method: 'PATCH',
    //       headers: {
    //         token: cookies.get('token'),
    //         'Content-Type': 'multipart/form-data',
    //       },
    //       data: {
    //         profile_image: this.image_upload,
    //       },
    //     })
    //     .then((response) => {
    //       this.new_image = URL.createObjectURL(response['data'])
    //       this.disabled_image_btn = true
    //       this.dialog_image = false
    //     })
    //     .catch((error) => {
    //       this.message_error_image = error['response']['data']
    //       this.disabled_image_btn = true
    //       setTimeout(() => {
    //         this.message_error_image = undefined
    //         this.disabled_image_btn=false
    //       }, 2000);
    //     })
    // },
  },
  data() {
    return {
      details: undefined,
      image: undefined,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modal: false,
      dialog: false,
      disabled: true,
      read_mode: true,
      dialog_image: false,
      image_upload: undefined,
      disabled_image_btn: false,
      message_error_image: undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>

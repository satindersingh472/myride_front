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
              <delete-account class="ma-3"></delete-account>
              <change-password class="ma-3" ></change-password>
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
                <!-- profile image component will handle the profile image part
                grabbing the image and editing the image -->
                <profile-image></profile-image>
              </v-col>
              <v-col class="ma-3" align-self="center">
                <!-- bio section for a client -->
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
                <!-- form inputs to display and change information about the profile -->
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
import ChangePassword from '@/dialogs/changePassword.vue'
import DeleteAccount from '@/dialogs/deleteAccount.vue'
export default {
  components: {
    ProfileImage,
    ChangePassword,
    DeleteAccount
  },

  mounted() {
    this.grab_details()
    this.grab_image()
  },
  methods: {
    // api request to grab the profile information
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

// api request for patch request for a profile
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
      message_error_image: undefined,
    }
  },
}
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialog"
      max-width="350"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">Change Password</v-btn>
      </template>
      <v-card>
        <v-toolbar class="yellow darken-3">
          Please enter your current and new password
        </v-toolbar>
        <v-card-text class="my-5">
          <v-form ref="form">
            <v-text-field
              class="my-3"
              outlined
              label="Current Password"
              v-model="current_password"
              hide-details="auto"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
            ></v-text-field>
            <v-text-field
              outlined
              label="New Password"
              v-model="new_password"
              hide-details="auto"
              :append-icon="show_two ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_two ? 'text' : 'password'"
              @click:append="show_two = !show_two"
            ></v-text-field>
          </v-form>
          <h4 v-if="message !== undefined">{{ message }}</h4>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- on click will cancel the change and goback -->
          <v-btn
            class="grey"
            @click="
              dialog = false
              reset()
              show = false
              show_two = false
            "
          >
            Go back
          </v-btn>
          <v-btn
            :disabled="disabled"
            @click="
              change_password()
              show = false
              show_two = false
              reset()
              disabled = true
            "
          >
            Save
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
  methods: {
    // will reset the form on executing
    reset() {
      this.$refs['form'].reset()
    },
    // make an api request
    change_password() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
          method: 'PATCH',
          headers: {
            token: cookies.get('token'),
          },
          //   send both passwords
          data: {
            old_password: this.current_password,
            new_password: this.new_password,
          },
        })

        .then((response) => {
          //   show the response
          this.message = response['data']

          setTimeout(() => {
            // after 2 seconds response disappear
            this.message = undefined
            // dialog box gone
            this.dialog = false
            // button save is back
            this.disabled = false
          }, 2000)
        })
        .catch((error) => {
          //   message is shown
          this.message = error['response']['data']

          setTimeout(() => {
            // after 2 seconds message is gone
            this.message = undefined
            // button save is back
            this.disabled = false
          }, 2000)
        })
    },
  },
  data() {
    return {
      disabled: false,
      dialog: false,
      current_password: undefined,
      new_password: undefined,
      message: undefined,
      show: false,
      show_two: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>

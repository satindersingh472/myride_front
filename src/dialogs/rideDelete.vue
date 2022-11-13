<template>
  <div>
    <v-row justify="end">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <!-- when this button is clicked the dialog box will appear -->
          <v-btn
            class="mb-3 mr-6 white--text"
            color="red"
            v-bind="attrs"
            v-on="on"
          >
            Delete Ride
          </v-btn>
        </template>
        <v-card>
          <v-toolbar class="yellow darken-3">Press Confirm to delete</v-toolbar>
          <v-card-text>
            <h3 v-if="message === undefined">
              The ride {{ ride_id }} will be deleted.Do you want to continue?
            </h3>
            <h3 v-else>{{ message }}</h3>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="success" @click="dialog = false">Cancel</v-btn>
            <v-btn
              class="red darken-3"
              :disabled="disabled"
              @click="delete_ride"
            >
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  props: {
    ride_id: Number,
  },

  methods: {
    delete_ride() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/ride`,
          method: 'DELETE',
          headers: {
            token: cookies.get('token'),
          },
          data: {
            ride_id: this.ride_id,
          },
        })
        .then((response) => {
          this.message = response['data']
          this.disabled = true
            this.$emit('delete_ride_response', this.ride_id)
          setTimeout(() => {
            this.dialog = false
         
          }, 1500)
        })
        .catch((error) => {
          this.message = error['response']['data']
        })
    },
  },
  data() {
    return {
      dialog: false,
      disabled: false,
      message: undefined,
    }
  },
}
</script>

<style lang="scss" scoped></style>

<template>
  <v-container fluid fill-height class="no-padding">
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 sm8 md6> 
        <v-card class="ma-3">
          <v-card-title primary-title>
            <div>
              <div class="form-title bold gray--text">Validate Your Email</div>
            </div>
          </v-card-title>
          <v-card-text>
            <p class="gray--text">An email has been sent to the address you provided. Please enter the authentication code included in that email.</p>
            <v-form class="register-form" ref="authForm">
              <v-container fluid fill-height>
                <v-layout align-center justify-center wrap row>
                  <v-flex xs12 sm6>
                    <p class="gray--text">Authentication Code</p>
                    <v-text-field
                      :rules="authRules"
                      :validate-on-blur="true"
                      solo
                      v-model.trim="authCode"
                      required
                      type="text"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <p class="gray--text">Password</p>
                    <v-text-field
                      :rules="passwordRules"
                      :validate-on-blur="true"
                      solo
                      v-model.trim="authPassword"
                      required
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </v-flex>
                  <v-btn block class="sb-btn" color="primary" @click="validate()">Submit</v-btn>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      authCode: '',
      authPassword: '',
      showPassword: false,
      authRules: [
        v => !!v || 'Authentication code is required'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  methods: {
    validate: function () {
      const vm = this;
      const form = vm.$refs.authForm.validate();
      if (form === true) {
        vm.emailValidation()
      } else {
        alert('Please enter a valid authentication code and password')
      }
    },
    emailValidation: function () {
      const vm = this;
      const content = {
        auth_token: vm.authCode,
        passwd: vm.authPassword
      };
      fetch('http://dev.api.strongblock.io/admin/register_que', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then(error => {
            throw new Error(error);
          });
        })
        .then(result => {

        })
        .catch(error => {
          alert(error.message)
        });
    }
  }
}
</script>

<style>

</style>

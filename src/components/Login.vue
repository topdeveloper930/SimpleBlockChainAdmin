<template>
  <v-container fluid fill-height class="no-padding">
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 sm12 md6>
        <div class="login-sections section-form">
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
              <v-flex class="text-xs-center" xs9>
                <v-card class="pa-3">
                  <div class="mb-3"></div>
                  <img src="../assets/logo.svg" class="image"/>
                  <v-card-text>
                    <v-form :value="!emailError && !passwordError">
                      <v-text-field v-model.trim="email" required name="email" label="Email" placeholder="Enter Email" type="text" :error="emailError" :errorMessages="emailErrorMsg" class="mb-2"></v-text-field>
                      <v-text-field v-model="password" required name="password" label="Password" placeholder="Enter Password" type="password"  :error="passwordError" :errorMessages="passwordErrorMsg"></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-layout align-center justify-space-around row fill-height>
                      <v-btn color="secondary darken-1" class="sb-btn" to="/register">Register</v-btn>
                      <v-btn color="primary" class="sb-btn" @click="validate()">Login</v-btn>
                    </v-layout>
                  </v-card-actions>
                  <div class="mb-3"></div>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-flex>
      <v-flex xs12 sm12 md6>
        <v-card flat class="login-sections section-text" id="everywhere">
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
              <v-flex class="text-xs-center">
                <h1 class="white--text">Blockchains. Everywhere.</h1>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      email: '',
      emailError: false,
      emailErrorMsg: '',
      password: '',
      passwordError: false,
      passwordErrorMsg: '',
    }),
    methods: {
      validate: function () {
        const vm = this;
        if (vm.validPassword && vm.validEmail) {
          vm.emailErrorState(false,'');
          vm.passwordErrorState(false,'');
          vm.login();
          return
        } else if (!vm.validPassword && !vm.validEmail) {
          vm.emailErrorState(true,'Please enter a valid email.');
          vm.passwordErrorState(true,'Passwords must be at least 8 characters long.');
          return
        } else if (vm.validPassword && !vm.validEmail) {
          vm.emailErrorState(true,'Please enter a valid email.');
          vm.passwordErrorState(false,'');
          return
        } else if (!vm.validPassword && vm.validEmail) {
          vm.emailErrorState(false,'');
          vm.passwordErrorState(true,'Passwords must be at least 8 characters long.');
          return
        }
      },
      emailErrorState: function (state,msg) {
        this.emailError = state;
        this.emailErrorMsg = msg;
      },
      passwordErrorState: function (state,msg) {
        this.passwordError = state;
        this.passwordErrorMsg = msg;
      },
      login: function () {
        const vm = this;
        const content = {
          email: vm.email,
          passwd: vm.password
        };
        fetch('http://dev.api.strongblock.io/login', {
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
    },
    computed: {
      validEmail: function () {
        const vm = this;
        return /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(vm.email)
      },
      validPassword: function () {
        const vm = this;
        return vm.password.length >=8
      },
    },
  }
</script>

<style scoped>
#everywhere {
  background: #1b68ac
}
.login-sections {
  height: 100vh
}
.section-text h1 {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 2.25em
}
@media screen and (max-width: 960px) {
  .section-form {
    height: 70vh
  }
  .section-text {
    height: 30vh
  }
}
</style>

<template>
  <v-container fluid fill-height class="no-padding">
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 sm8 md6> 
        <v-card class="ma-3">
          <v-card-title primary-title>
            <div>
              <div class="form-title bold gray--text">Create Group</div>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form class="register-form" ref="groupForm">
              <v-container fluid fill-height>
                <v-layout align-center justify-center wrap row>
                  <v-flex xs12>
                    <p class="gray--text">Group Name</p>
                    <v-text-field
                      :validate-on-blur="true"
                      solo
                      v-model.trim="groupName"
                      :rules="[rules.required]"
                      required
                      type="text"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <p class="gray--text">Group Description</p>
                    <v-textarea
                      v-model.trim="groupDesc"
                      :rules="[rules.required]"
                      required
                      type="text"
                      :validate-on-blur="true"
                      name="group-desc"
                      hint="What's this group for?"
                    ></v-textarea>
                  </v-flex>
                  <div class="mb-3"></div>
                  <v-btn class="sb-btn" color="primary" block>Create Group</v-btn>
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
  data: () => ({
    groupName: '',
    groupDesc: '',
    rules: {
      required: v => !!v || 'This field is required',
      number: v => /[0-9]$/.test(v) || 'Invalid Number'
    },
  })
}
</script>

<style scoped>

</style>

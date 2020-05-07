<template>
  <v-container fluid fill-height class="no-padding">
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 sm8> 
        <v-card class="ma-3">
          <v-card-title primary-title>
            <div>
              <div class="form-title bold gray--text">Launch Node</div>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form class="register-form" ref="chainNodeConfig">
              <v-container fluid fill-height>
                <v-layout align-center justify-center wrap row>
                  <v-flex xs12>
                    <p class="gray--text">Group</p>
                    <v-select
                      :validate-on-blur="true"
                      solo
                      v-model="chainNodeGroup"
                      :items="['Group One','Group Two']"
                      :rules="[rules.required]"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <p class="gray--text">Chain</p>
                    <v-select
                      :validate-on-blur="true"
                      solo
                      v-model="chainNodeChain"
                      :items="['Chain One','Chain Two']"
                      :rules="[rules.required]"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <p class="gray--text">Node Account Name</p>
                    <v-text-field
                      solo
                      :validate-on-blur="true"
                      v-model.trim="chainNodeAccountName"
                      :rules="[rules.required]"
                      required
                      type="text"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <p class="gray--text">Node Account Public Key</p>
                    <v-text-field
                      solo
                      :validate-on-blur="true"
                      v-model.trim="chainNodePublicKey"
                      :rules="[rules.required]"
                      required
                      type="text"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-container fluid fill-height>
                <v-layout row wrap>
                  <v-flex xs12 sm6 class="mb-3">
                    <p class="gray--text">Node Type</p>
                    <v-radio-group v-model="chainNodeType" :rules="[rules.required]">
                      <v-radio
                        color="primary"
                        value="Producing"
                        label="Producing"
                      ></v-radio>
                      <v-radio
                        color="primary"
                        value="Read-Only"
                        label="Read-Only"
                      ></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12 sm6 class="mb-3">
                    <p class="gray--text">History Node?</p>
                      <v-switch
                        color="primary"
                        v-model="chainHistoryNode"
                        :label="chainHistoryNode === true ? 'Yes' : 'No'"
                      ></v-switch>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-container fluid fill-height>
                <v-layout row wrap>
                  <v-flex xs12 sm6 class="mb-3">
                    <p class="gray--text">Node Region</p>
                    <v-radio-group v-model="chainNodeRegion" :rules="[rules.required]">
                      <v-radio
                        color="primary"
                        value="Singapore"
                        label="Singapore"
                      ></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12 sm6 class="mb-3">
                    <p class="gray--text">Node Provider</p>
                    <v-radio-group v-model="chainNodeProvider" :rules="[rules.required]">
                      <v-radio
                        color="primary"
                        value="StrongBlock"
                        label="StrongBlock"
                      ></v-radio>
                    </v-radio-group>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8> 
        <v-card class="ma-3" flat>
          <div class="mb-3"></div>
          <v-btn class="sb-btn" color="primary" block>Launch Node</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    chainNodeGroup: '',
    chainNodeChain: '',
    chainNodeAccountName: '',
    chainNodePublicKey: '',
    chainNodeType: '',
    chainHistoryNode: false,
    chainNodeRegion: 'Singapore',
    chainNodeProvider: 'StrongBlock',
    rules: {
      required: v => !!v || 'This field is required',
      number: v => /[0-9]$/.test(v) || 'Invalid Number'
    },
    genesisAmountError: ''
  })
}
</script>

<style scoped>

</style>

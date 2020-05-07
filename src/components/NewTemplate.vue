<template>
  <v-container fluid fill-height class="no-padding">
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 sm8> 
        <v-card class="ma-3">
          <v-card-title primary-title>
            <div>
              <div class="form-title bold gray--text">Create Chain Template</div>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form class="register-form" ref="chainConfig">
              <v-container fluid fill-height>
                <v-layout align-center justify-center wrap row>
                  <v-flex xs12>
                    <p class="gray--text">Group</p>
                    <v-select
                      :validate-on-blur="true"
                      solo
                      v-model="chainGroup"
                      :items="['Group One','Group Two']"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <p class="gray--text">Template Name</p>
                    <v-text-field
                      solo
                      :validate-on-blur="true"
                      v-model.trim="templateName"
                      type="text"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <p class="gray--text">Template Description</p>
                    <v-text-field
                      solo
                      :validate-on-blur="true"
                      v-model.trim="templateDesc"
                      :rules="[rules.required]"
                      required
                      type="text"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8> 
        <v-card class="ma-3">
          <v-card-title primary-title>
            <div>
              <div class="form-title bold gray--text">Node Settings</div>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form class="register-form" ref="nodeConfig">
              <v-container fluid fill-height>
                <v-layout align-center justify-center wrap row>
                  <v-flex xs12>
                    <p class="gray--text">Maximum Producing Nodes</p>
                    <v-text-field
                      solo
                      :validate-on-blur="true"
                      v-model.trim="chainMaxNodes"
                      required
                      type="number"
                    ></v-text-field>
                  </v-flex>
                  <v-layout row wrap>
                    <v-flex xs12 sm6 class="mb-3">
                      <p class="gray--text">Size of Nodes</p>
                      <v-radio-group v-model="chainNodeSize" :rules="[rules.required]">
                        <template v-for="item in chainSizes">
                          <v-radio
                            :key="item"
                            color="primary"
                            :label="item"
                            :value="item"
                          ></v-radio>
                        </template>
                      </v-radio-group>
                    </v-flex>
                    <v-flex xs12 sm6 class="mb-3">
                      <p class="gray--text">History Nodes</p>
                      <v-radio-group v-model="chainNodeHistory" :rules="[rules.required]">
                        <template v-for="item in chainHistory">
                          <v-radio
                            :key="item"
                            color="primary"
                            :label="item"
                            :value="item"
                          ></v-radio>
                        </template>
                      </v-radio-group>
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-container>
              <v-container fluid fill-height>
                <v-layout row wrap>
                  <v-flex xs12 sm6 class="mb-3">
                    <p class="gray--text">Region Whitelist</p>
                    <template v-for="item in chainRegions">
                      <v-checkbox color="primary" :key="item" v-model="chainRegionWhitelist" :label="item" :value="item"></v-checkbox>
                    </template>
                  </v-flex>
                  <v-flex xs12 sm6 class="mb-3">
                    <p class="gray--text">Provider Whitelist</p>
                    <template v-for="item in chainProviders">
                      <v-checkbox color="primary" :key="item" v-model="chainProviderWhitelist" :label="item" :value="item"></v-checkbox>
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8> 
        <v-card class="ma-3">
          <v-card-title primary-title>
            <div>
              <div class="form-title bold gray--text">Token Settings</div>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form class="register-form" ref="tokenConfig">
              <v-container fluid fill-height>
                <v-layout align-center justify-center wrap row>
                  <v-flex xs12>
                    <p class="gray--text">Token Symbol</p>
                    <v-text-field
                      solo
                      :validate-on-blur="true"
                      v-model.trim="chainTokenSymbol"
                      required
                      type="text"
                      mask="AAAAAA"
                      :rules="[rules.required]"
                      hint="3-6 Characters, A-Z"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <p class="gray--text">Quantity Created</p>
                    <v-text-field
                      solo
                      :validate-on-blur="true"
                      v-model.trim="chainTokenQuantity"
                      required
                      :rules="[rules.required]"
                      mask="##########"
                      type="number"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <p class="gray--text">Quantity Issued to Genesis Account</p>
                    <v-text-field
                      solo
                      :validate-on-blur="true"
                      v-model.trim="chainTokenGenesis"
                      required
                      :rules="[rules.required]"
                      :error-messages="genesisAmountError"
                      hint="Must be less than or equal to Quantity Created"
                      mask="##########"
                      type="number"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <p class="gray--text">Decimal Precision</p>
                    <v-radio-group v-model="chainDecimal" :rules="[rules.required]">
                      <v-radio
                        color="primary"
                        :value="0"
                        label="X"
                      ></v-radio>
                      <v-radio
                        color="primary"
                        :value="1"
                        label="X.X"
                      ></v-radio>
                      <v-radio
                        color="primary"
                        :value="2"
                        label="X.XX"
                      ></v-radio>
                      <v-radio
                        color="primary"
                        :value="3"
                        label="X.XXX"
                      ></v-radio>
                      <v-radio
                        color="primary"
                        :value="4"
                        label="X.XXXX"
                      ></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12>
                    <p class="gray--text">Unstaking Time</p>
                    <v-layout row wrap>
                      <v-flex xs12 sm3 class="mb-3">
                        <v-text-field
                          solo
                          :validate-on-blur="true"
                          v-model.trim="chainUnstaking.days"
                          required
                          label="Days"
                          :rules="[rules.required]"
                          type="number"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3 class="mb-3">
                        <v-text-field
                          solo
                          :validate-on-blur="true"
                          v-model.trim="chainUnstaking.hours"
                          required
                          label="Hours"
                          :rules="[rules.required]"
                          type="number"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3 class="mb-3">
                        <v-text-field
                          solo
                          :validate-on-blur="true"
                          v-model.trim="chainUnstaking.minutes"
                          required
                          label="Minutes"
                          :rules="[rules.required]"
                          type="number"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3 class="mb-3">
                        <v-text-field
                          solo
                          :validate-on-blur="true"
                          v-model.trim="chainUnstaking.seconds"
                          required
                          label="Seconds"
                          :rules="[rules.required]"
                          type="number"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8> 
        <v-card class="ma-3">
          <v-card-title primary-title>
            <div>
              <div class="form-title bold gray--text">Advanced Settings</div>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form class="register-form" ref="nodeConfig">
              <v-container fluid fill-height>
                <v-layout align-center justify-center wrap row>
                  <v-layout row wrap>
                    <v-flex xs12 sm4 class="mb-3">
                      <p class="gray--text">Super User Threshold</p>
                      <v-radio-group v-model="superUser" :rules="[rules.required]">
                        <template v-for="item in superUserSettings">
                          <v-radio
                            :key="item"
                            color="primary"
                            :label="item"
                            :value="item"
                          ></v-radio>
                        </template>
                      </v-radio-group>
                    </v-flex>
                    <v-flex xs12 sm4 class="mb-3">
                      <p class="gray--text">Account Management</p>
                      <v-radio-group v-model="accountMgmt" :rules="[rules.required]">
                        <template v-for="item in accountMgmtSettings">
                          <v-radio
                            :key="item"
                            color="primary"
                            :label="item"
                            :value="item"
                          ></v-radio>
                        </template>
                      </v-radio-group>
                    </v-flex>
                    <v-flex xs12 sm4 class="mb-3">
                      <p class="gray--text">Contract Management</p>
                      <v-radio-group v-model="contractMgmt" :rules="[rules.required]">
                        <template v-for="item in contractMgmtSettings">
                          <v-radio
                            :key="item"
                            color="primary"
                            :label="item"
                            :value="item"
                          ></v-radio>
                        </template>
                      </v-radio-group>
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8> 
        <v-card class="ma-3" flat>
          <div class="mb-3"></div>
          <v-btn class="sb-btn" color="primary" block>Create Template</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    chainGroup: '',
    templateName: '',
    templateDesc: '',
    chainMaxNodes: 1,
    chainSizes: ['Small','Medium','Large'],
    chainNodeSize: '',
    chainHistory: ['Prohibited','Required','Optional'],
    chainNodeHistory: true,
    chainRegions: ['Singapore','New York'],
    chainRegionWhitelist: [],
    chainProviders: ['StrongBlock','EOS New York'],
    chainProviderWhitelist: ['StrongBlock'],
    chainTokenSymbol: '',
    chainTokenQuantity: null,
    chainTokenGenesis: null,
    chainDecimals: [0,1,2,3,4],
    chainDecimal: null,
    chainUnstaking: {
      days: null,
      hours: null,
      minutes: null,
      seconds: null
    },
    superUser: '',
    superUserSettings: ['2/3 + 1', '1/2 + 1', '1/3 + 1'],
    accountMgmt: '',
    accountMgmtSettings: ['None','Whitelist','Blacklist'],
    contractMgmt: '',
    contractMgmtSettings: ['None','Whitelist','Blacklist'],
    rules: {
      required: v => !!v || 'This field is required',
      number: v => /[0-9]$/.test(v) || 'Invalid Number'
    },
    genesisAmountError: ''
  }),
  methods: {
    genesisAmount: function () {
      const vm = this;
      if (parseFloat(vm.chainTokenGenesis) <= parseFloat(vm.chainTokenQuantity)) {
        vm.genesisAmountError = '';
        return true
      }
      vm.genesisAmountError = 'Must be less than or equal to Quantity Created';
      return false
    }
  }
}
</script>

<style scoped>

</style>

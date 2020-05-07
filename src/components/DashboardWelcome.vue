<template>
  <div>
    <v-toolbar flat fixed app>
      <v-toolbar-items>
        <img src="@/assets/symbol-color.svg" class="image"/>&nbsp;
        <img src="@/assets/name-color.svg" class="image"/>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn class="sb-btn-round long-btn bold" color="primary" @click="validate()">
        <span v-text="step === 3 ? 'Launch' : 'Continue to Step '+(step+1)"></span>
      </v-btn>
    </v-toolbar>
    <div class="mb-2"></div>
    <v-container fluid fill-height class="no-padding">
      <v-layout align-center justify-center wrap row>
        <v-flex xs12 class="mb-5">
          <div class="text-xs-center">
            <p class="subheading bold gray--text">Step {{step}} of 3</p>
          </div>
          <div :class="'sb-wrap active-step'+step">
            <div class="sb-main">
              <div class="step-col step-col-3">
                <div class="sb-step-cont">
                  <div class="sb-step step-1"></div>
                  <span :class="step > 1 ? 'primary--text sb-label bold' : 'sb-label bold'">Create Group</span>
                </div>
              </div>
              <div class="step-col step-col-3">
                <div class="sb-step-cont">
                  <div class="sb-step step-2"></div>
                  <span :class="step > 2 ? 'primary--text sb-label bold' : 'sb-label gray--text bold'">Create Chain</span>
                </div>
              </div>
              <div class="step-col step-col-3">
                <div class="sb-step-cont">
                  <div class="sb-step step-3"></div>
                  <span :class="step === 3 ? 'sb-label gray--text bold' : 'sb-label gray--text bold'">Launch Node</span>
                </div>
              </div>
            </div>
          </div>
        </v-flex>
        <v-flex xs12 class="mb-2" v-if="step === 1">
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
                        </v-layout>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 class="mb-2" v-if="step === 2">
          <v-container fluid fill-height class="no-padding">
            <v-layout align-center justify-center wrap row>
              <v-flex xs12 sm8> 
                <v-card class="ma-3">
                  <v-card-title primary-title>
                    <div>
                      <div class="form-title bold gray--text">Configure Chain</div>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <v-form class="register-form" ref="chainConfig">
                      <v-container fluid fill-height>
                        <v-layout align-center justify-center wrap row>
                          <v-flex xs12>
                            <p class="gray--text">Group</p>
                            <v-text-field
                              solo
                              :validate-on-blur="true"
                              v-model.trim="chainGroup"
                              :value="chainGroup"
                              readonly
                              type="text"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <p class="gray--text">Chain Template</p>
                            <v-text-field
                              solo
                              :validate-on-blur="true"
                              v-model.trim="chainTemplate"
                              :value="chainTemplate"
                              readonly
                              type="text"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <p class="gray--text">Chain Name</p>
                            <v-text-field
                              solo
                              :validate-on-blur="true"
                              v-model.trim="chainName"
                              :rules="[rules.required]"
                              required
                              type="text"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <p class="gray--text">Genesis Account Name</p>
                            <v-text-field
                              solo
                              :validate-on-blur="true"
                              v-model.trim="chainGenesis"
                              :rules="[rules.required]"
                              required
                              type="text"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <p class="gray--text">Genesis Account Public Key</p>
                            <v-text-field
                              solo
                              :validate-on-blur="true"
                              v-model.trim="chainPublicKey"
                              :rules="[rules.required]"
                              required
                              type="text"
                            ></v-text-field>
                          </v-flex>
                          <v-layout row wrap>
                            <v-flex xs12 sm4 class="mb-3">
                              <p class="gray--text">Chain Tier</p>
                              <v-radio-group v-model="chainTier" :rules="[rules.required]">
                                <template v-for="item in chainTiers">
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
                              <p class="gray--text">Chain Policy</p>
                              <v-radio-group v-model="chainPolicy" :rules="[rules.required]">
                                <template v-for="item in chainPolicies">
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
                              <p class="gray--text">Include Demo Data?</p>
                              <v-switch
                                color="primary"
                                v-model="includeDemo"
                                :label="includeDemo === true ? 'Yes' : 'No'"
                              ></v-switch>
                            </v-flex>
                          </v-layout>
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
                              :value="chainMaxNodes"
                              required
                              readonly
                              type="text"
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
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 class="mb-2" v-if="step === 3">
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
                            <v-text-field
                              solo
                              :validate-on-blur="true"
                              v-model.trim="chainNodeGroup"
                              :value="chainGroup"
                              required
                              readonly
                              type="text"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <p class="gray--text">Chain</p>
                            <v-text-field
                              solo
                              :validate-on-blur="true"
                              v-model.trim="chainNodeChain"
                              :value="chainName"
                              required
                              readonly
                              type="text"
                            ></v-text-field>
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
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    groupName: '',
    groupDesc: '',
    chainGroup: '',
    chainTemplate: 'Demo Template',
    chainName: '',
    chainGenesis: '',
    chainPublicKey: '',
    chainTiers: ['Free','Tier 1'],
    chainTier: '',
    chainPolicies: ['Private','Permissioned','Open'],
    chainPolicy: '',
    includeDemo: true,
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
  }),
  created () {

  },
  methods: {
    nextStep: function () {
      this.step++
    },
    validate: function () {
      const vm = this;
      if (vm.step === 1) {
        const validGroup = vm.$refs.groupForm.validate();
        if (validGroup === true) {
          vm.chainGroup = vm.groupName;
          vm.chainTemplate = 'Demo Template';
          vm.nextStep()
        } else {
          return
        }
      } else if (vm.step === 2) {
        const chainConfig = vm.$refs.chainConfig.validate();
        const nodeConfig = vm.$refs.nodeConfig.validate();
        const tokenConfig = vm.$refs.tokenConfig.validate();
        if (chainConfig === true && nodeConfig === true && tokenConfig === true) {
          if (vm.genesisAmount() === true) {
            vm.chainNodeGroup = vm.chainGroup;
            vm.chainNodeChain = vm.chainName;
            vm.nextStep()
          } else {
            return
          }
        } else {
          alert('Please complete all chain, node, and token settings')
        }
      } else if (vm.step === 3) {
        const chainNodeConfig = vm.$refs.chainNodeConfig.validate();
        if (chainNodeConfig === true) {
          vm.$router.push('/dashboard/home')
/*           const content = {

          };
          fetch('', {
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
            }); */
        } else {
          alert('Please enter all node settings')
          return
        }
      }
      
    },
    genesisAmount: function () {
      const vm = this;
      if (parseFloat(vm.chainTokenGenesis) <= parseFloat(vm.chainTokenQuantity)) {
        vm.genesisAmountError = '';
        return true
      }
      vm.genesisAmountError = 'Must be less than or equal to Quantity Created';
      return false
    }
  },
  computed: {

  },
};
</script>

<style scoped>
.register-form p {
  font-size: 16px
}
.form-title {
  font-size: 20px
}
.sb-main {
  width: 100%;
  min-width: 320px;
  display: flex;
}
.step-col-2 {
  width: 50%;
  position: relative;
}
.step-col-3 {
  width: 33.333333333%;
  position: relative;
}
.step-col:first-child .sb-step:before {
  content: "1";
}
.step-col:nth-child(2) .sb-step:before {
  content: "2";
}
.step-col:nth-child(3) .sb-step:before {
  content: "3";
}
.sb-main .step-col:not(:first-child):before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 4px;
  top: 17.5px;
  left: calc(-51% + 20px);
  right: 0;
  background: #ebebeb;
  border: 2px #ebebeb solid;
  -o-transition: 0.4s;
  -ms-transition: 0.4s;
  -moz-transition: 0.4s;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.sb-step-cont {
  font-size: 16px;
  text-decoration: none;
  white-space: nowrap;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: space-between;
}
.sb-step {
  border: 5px #ebebeb solid;
  border-radius: 100%;
  line-height: 0;
  background: #959595;
  text-align: center;
  align-items: center;
  justify-content: center;
  align-self: center;
  display: flex;
  color: #fff;
  width: 35px;
  height: 35px;
  font-weight: 700;
  margin-bottom: 7px;
  z-index: 4;
}
.sb-label {
  font-size: 14px;
  color: #343A40;
  width: 100%;
  text-align: center;
}
.active-step1 .step-col:first-child .sb-step,
.active-step1-mini2 .step-col:first-child .sb-step,
.active-step1-mini3 .step-col:first-child .sb-step {
  background-color: #1976d2;
}
.active-step1 .step-col:first-child .sb-label,
.active-step1-mini3 .step-col:first-child .sb-label,
.active-step1-mini2 .step-col:first-child .sb-label,
.active-step1-mini4 .step-col:first-child .sb-label {
  color: #2c2c2c;
}
.active-step2 .step-col:first-child,
.active-step3 .step-col:nth-child(-n + 2),
.active-step4 .step-col:nth-child(-n + 3) {
  opacity: 0.5;
}
.active-step2 .step-col:first-child .sb-step:before,
.active-step3 .step-col:nth-child(-n + 2) .sb-step:before,
.active-step4 .step-col:nth-child(-n + 3) .sb-step:before {
  content: "\2713";
  padding: 7px;
}
.active-step2 .step-col:nth-child(-n + 2) .sb-step,
.active-step3 .step-col:nth-child(-n + 3) .sb-step {
  background-color: #1976d2;
}
.active-step2 .step-col:nth-child(-n + 2) .sb-label,
.active-step3 .step-col:nth-child(-n + 3) .sb-label {
  color: #2c2c2c;
}
.active-step2 .step-col:nth-child(-n + 2):before,
.active-step3 .step-col:nth-child(-n + 3):before {
  background: #1976d2 !important;
}
@media screen and (max-width: 640px) {
  .sb-main {
    flex-wrap: wrap;
  }
}
</style>

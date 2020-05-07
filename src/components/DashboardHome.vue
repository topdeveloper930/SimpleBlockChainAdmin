<template>
  <div>
    <h3 class="text-xs-left">Top Selections</h3>
    <v-container fluid fill-height class="mb-3">
      <v-layout row wrap>
        <template v-for="item in topSelections">
          <v-flex xs12 sm6 :key="item.title">
            <v-card class="pa-3 ma-2">
              <v-layout>
                <div class="inline-block">
                  <v-btn fab class="sb-btn" color="primary"><v-icon>{{item.icon}}</v-icon></v-btn>
                </div>
                <div class="inline-block pa-1">
                  <v-card-title class="no-padding">
                    <b>{{item.title}}</b>
                  </v-card-title>
                  <v-card-text class="no-padding">
                    Manage your {{item.title}}
                  </v-card-text>
                </div>
              </v-layout>
            </v-card>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
    <h3 class="text-xs-left">My Chains</h3>
    <v-container fluid fill-height class="mb-3">
      <v-layout row wrap>
        <template v-for="item in chains">
          <v-flex xs12 sm4 :key="item.name">
            <v-card class="pa-3 ma-2">
              <v-card-title class="no-padding mb-2">
                <b>{{item.name}}</b>
              </v-card-title>
              <v-card-text>
                <span><b>Group:&nbsp;</b></span> {{item.group}} <br>
                <span><b>Age:&nbsp;</b></span> {{item.age}}
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                <span><b>Tier:</b></span> {{item.tier}} — <span class="gray--text text--lighten-3">{{item.expiration}} <span v-text="item.expiration > 1 ? 'days' : 'day'"></span> remaining</span>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="primary" small>
                  Manage
                </v-btn>
                <v-spacer></v-spacer>
                <v-divider vertical></v-divider>
                <v-spacer></v-spacer>
                <span class="success--text bold">{{item.nodes.length}}</span>&nbsp;<span class="gray--text text--lighten-3" v-text="item.nodes.length > 1 ? 'Nodes' : 'Node'"></span>
              </v-card-actions>
            </v-card>
          </v-flex>
        </template>
        <v-flex xs12 sm4>
          <v-card class="text-xs-center pa-3 ma-2">
            <v-btn fab large to="/dashboard/chains/new">
              <v-icon color="success">add</v-icon>
            </v-btn>
            <div class="pa-3">
              <b class="mb-3">Add New Blockchain</b>
              <p>Lorem ipsum text goes here wooo</p>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <h3 class="text-xs-left">My Nodes</h3>
    <v-container fluid fill-height class="mb-3">
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table
            :headers="nodeTable"
            :items="nodes"
            :items-per-page="25"
            class="elevation-1"
            show-select
          >
            <template v-slot:items="props">
              <tr class="pointer">
                <td>{{props.item.name}}</td>
                <td>{{props.item.group}}</td>
                <td>{{props.item.chain}}</td>
                <td>{{props.item.size}}</td>
                <td>{{props.item.region}}</td>
                <td>{{props.item.provider}}</td>
                <td>{{props.item.type}}</td>
                <td><div :class="props.item.status === 'Active' ? 'success--text active-circle' : 'error--text inactive-circle'"></div></td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    topSelections: [
      {
        title: 'Groups',
        icon: 'group'
      },
      {
        title: 'Chains',
        icon: 'linear_scale'
      },
      {
        title: 'Nodes',
        icon: 'device_hub'
      },
      {
        title: 'Templates',
        icon: 'library_books'
      }
    ],
    chains: [
      {
        name: 'Test Chain One',
        group: 'Group One',
        age: '0:00:00:15',
        tier: 'Free',
        expiration: 30,
        nodes: [
          {
            name: 'Test Node One',
            group: 'Group One',
            chain: 'Test Chain One',
            size: 'Free',
            region: 'Singapore',
            provider: 'StrongBlock',
            type: 'Block Producer',
            status: 'Active'
          }
        ]
      },
      {
        name: 'Test Chain Two',
        group: 'Group One',
        age: '0:00:21:04',
        tier: 'Free',
        expiration: 12,
        nodes: [
          {
            name: 'Test Node One',
            group: 'Group One',
            chain: 'Test Chain Two',
            size: 'Free',
            region: 'Singapore',
            provider: 'StrongBlock',
            type: 'Block Producer',
            status: 'Active'
          },
          {
            name: 'Test Node Two',
            group: 'Group One',
            chain: 'Test Chain Two',
            size: 'Free',
            region: 'Singapore',
            provider: 'StrongBlock',
            type: 'Block Producer',
            status: 'Active'
          }
        ]
      }
    ],
    nodes: [
      {
        name: 'Test Node 1',
        group: 'Group One',
        chain: 'Test Chain One',
        size: 'Free',
        region: 'Singapore',
        provider: 'StrongBlock',
        type: 'Block Producer',
        status: 'Active'
      },
      {
        name: 'Test Node 2',
        group: 'Group One',
        chain: 'Test Chain One',
        size: 'Tier 1',
        region: 'New York',
        provider: 'EOS New York',
        type: 'Read Only',
        status: 'Active'
      },
      {
        name: 'Test Node 3',
        group: 'Group One',
        chain: 'Test Chain One',
        size: 'Tier 2',
        region: 'London',
        provider: 'StrongBlock',
        type: 'Block Producer',
        status: 'Inactive'
      },
    ],
    nodeTable: [
      { text: 'Name', value: 'name' },
      { text: 'Group', value: 'group' },
      { text: 'Chain', value: 'chain' },
      { text: 'Size', value: 'size' },
      { text: 'Region', value: 'region' },
      { text: 'Provider', value: 'provider' },
      { text: 'Type', value: 'type' },
      { text: 'Status', value: 'status' },
    ]
  })
}
</script>

<style scoped>
  .active-circle {
    display: inline-block;
    border-radius: 100%;
    height: 12px;
    width: 12px;
    background: #00d4a3;
    box-shadow: #00d4a3b0 0px 0px 10px 2px;
  }
  .inactive-circle {
    display: inline-block;
    border-radius: 100%;
    height: 12px;
    width: 12px;
    background: #d95970;
    box-shadow: #d95970c4 0px 0px 10px 2px;
  }
</style>

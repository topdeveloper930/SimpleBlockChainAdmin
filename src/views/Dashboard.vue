<template>
  <div>
    <v-toolbar flat fixed app clipped-right class="hidden-sm-and-down" v-if="$route.path !== '/dashboard/welcome'">
      <v-toolbar-items>
        <v-btn flat @click="$router.push('/dashboard/home')" :class="$route.path.includes('dashboard') && $route.path !== '/dashboard/settings' ? 'active-btn primary--text' : 'bold gray--text'">Dashboard</v-btn>
        <v-btn flat @click="$router.push('/dashboard/settings')" :class="$route.path === '/dashboard/settings' ? 'active-btn primary--text' : 'bold gray--text'">Settings</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat><v-icon color="gray lighten-4">inbox</v-icon></v-btn>
        <v-divider vertical inset></v-divider>
      </v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat class="gray--text no-margin" v-on="on">
            <v-icon style="padding-right:10px" color="gray lighten-4">account_circle</v-icon> My Account
            <v-icon dark>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer fixed app class="hidden-sm-and-down" v-if="$route.path !== '/dashboard/welcome'">
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex class="text-xs-center">
            <img src="@/assets/symbol-color.svg" class="image"/><br>
            <img src="@/assets/name-color.svg" class="image"/>
            <div class="mb-3"></div>
            <v-btn class="sb-btn long-btn">Connect To Chain</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <v-list>
        <v-divider></v-divider>
        <v-list-tile :to="'/dashboard/home'">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>
        <v-list-group v-for="item in menuTop" :key="item.icon">
          <template v-slot:activator>
            <v-list-tile :to="item.link">
              <v-list-tile-action>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile :to="item.subLink">
            <v-list-tile-title>{{item.subTitle}}</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>{{item.subIcon}}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
        <div v-for="item in menuBottom" :key="item.icon">
          <v-list-tile :to="item.link">
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-flex>
          <div class="mb-3"></div>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    menuTop: [
      {
        icon: 'group',
        title: 'Groups',
        subIcon:  'group_add',
        subTitle: 'Add Group',
        link: '/dashboard/groups',
        subLink: '/dashboard/groups/new'
      },
      {
        icon: 'library_books',
        title: 'Templates',
        subIcon:  'add_to_photos',
        subTitle: 'Add Template',
        link: '/dashboard/templates',
        subLink: '/dashboard/templates/new'
      },
      {
        icon: 'linear_scale',
        title: 'Chains',
        subIcon:  'control_point',
        subTitle: 'Add Chain',
        link: '/dashboard/chains',
        subLink: '/dashboard/chains/new'
      },
      {
        icon: 'device_hub',
        title: 'Nodes',
        subIcon:  'control_point',
        subTitle: 'Add Node',
        link: '/dashboard/nodes',
        subLink: '/dashboard/nodes/new'
      }
    ],
    menuBottom: [
      {
        icon: 'web',
        title: 'Portal',
        link: '/dashboard/portal'
      },
      {
        icon: 'developer_board',
        title: 'Dapps',
        link: '/dashboard/dapps'
      },
    ]
  }),
  methods: {

  },
}
</script>

<style scoped>
</style>

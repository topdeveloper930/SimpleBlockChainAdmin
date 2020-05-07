<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({

  }),
  created() {
    const vm = this;
    if (vm.$route.path === '/dashboard') {
      vm.$router.push('/dashboard/home')
    }
  },
}
</script>

<style>
body {
  font-family: 'Rubik', sans-serif!important;
}
.no-padding {
  padding: 0!important
}
.bold {
  font-weight: bold!important
}
.inline-block {
  display: inline-block
}
.sb-btn {
  border-radius: 3px 13px;
}
.sb-btn-round {
  border-radius: 20px;
}
.long-btn {
  min-width: 150px
}
.no-margin {
  margin: 0
}
.image {
  max-width: 100%
}
.active-btn {
  font-weight: bold;
  border-bottom: 2px solid;
  position: relative;
  top: 1px;
}
</style>

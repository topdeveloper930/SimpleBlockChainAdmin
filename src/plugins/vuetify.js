import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#1C68AE',
    gray: '#343A40',
    success: '#00d4a3',
    error: '#d95970'
  }
})

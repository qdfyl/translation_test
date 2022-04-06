import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'zh',
    messages: {
        zh: require('./language/zh'),
        en: require('./language/en')
    }
})

Vue.config.productionTip = false

new Vue({
    router,
    i18n,
    render: h => h(App),
}).$mount('#app')
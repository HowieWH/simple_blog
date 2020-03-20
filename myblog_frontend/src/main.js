import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/main.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import { Form, Card, FormItem, Input, Button, Select, Avatar, Header, Container, Footer, Main, Row, Col, DropdownMenu, DropdownItem, Dropdown, Message, Divider } from 'element-ui'
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Avatar)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Container)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Divider)
// Vue.use(Message) 这种写法，会自动弹出空的信息提示框
// Vue.component(Message)也不能用这种方式
Vue.prototype.$message = Message

Vue.prototype.axios = axios

axios.defaults.withCredentials = true

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

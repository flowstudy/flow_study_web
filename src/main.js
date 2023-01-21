import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import './icons' // icon
import './utils/error-log' // error log
import * as filters from './filters' // global filters

// 自定义指令
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));

import {lineNumbersBlock} from "@/assets/js/highlight-line-number"

Vue.directive('highlight', function(el) {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    if (block.getAttribute("highlighted") === "true") {
      return block;
    }
    // 防止已经高亮处理过的block再次被处理
    block.setAttribute("highlighted", "true");
    // 高亮
    hljs.highlightElement(block);
    block.innerHTML = block.innerHTML
      .replaceAll('&lt;em&gt;', '<span style="color:red;font-weight: bold;">')
      .replaceAll('&lt;/em&gt;', '</span>');
    // 添加行号
    lineNumbersBlock(block);
  });
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const {
    mockXHR
  } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

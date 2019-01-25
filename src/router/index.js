import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NotFound from '@/components/error-pages/NotFound'
import BookList from '@/components/book/BookList.component'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/books/list',
      name: 'BookList',
      component: BookList
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

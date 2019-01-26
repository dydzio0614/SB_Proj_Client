import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NotFound from '@/components/error-pages/NotFound'
import BookList from '@/components/book/BookList.component'
import BookCreate from '@/components/book/BookCreate'

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
      path: '/books/create',
      name: 'BookCreate',
      component: BookCreate
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

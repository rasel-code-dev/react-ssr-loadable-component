import React from 'react'
import loadable from '@loadable/component'
import Progress from './utils/Progress'

const HomePage = loadable( ()=> import("./pages/HomePage"), {
  ssr: true,
  fallback: <Progress/>,
})

const UsersPage = loadable( ()=> import("./pages/UsersPage"), {
  ssr: true,
  fallback: <Progress/>,
})

const AboutPage = loadable( ()=> import("./pages/AboutPage"), {
  ssr: true,
  fallback: <Progress/>
})
const ProductPage = loadable( ()=> import("./pages/ProductPage"), {
  ssr: true,
  fallback: <Progress/>
})

const routes = [
  {  
    path: '/',
    component: HomePage,
    exact: true
  },
  {  path: '/about',
    component: AboutPage,
  },
  {  path: '/products',
    component: ProductPage,
  },
  {  path: '/users',
    component: UsersPage,
  }
]

export default routes
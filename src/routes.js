import React from 'react'
import loadable from '@loadable/component'
import ProgressBar from 'react-topbar-progress-indicator'


const HomePage = loadable( ()=> import("./pages/HomePage"), {
  ssr: true,
  fallback: <ProgressBar/>,
})

const UsersPage = loadable( ()=> import("./pages/UsersPage"), {
  ssr: true,
  fallback: <ProgressBar/>,
})

const AboutPage = loadable( ()=> import("./pages/AboutPage"), {
  ssr: true,
  fallback: <ProgressBar/>
})
const ProductPage = loadable( ()=> import("./pages/ProductPage"), {
  ssr: true,
  fallback: <ProgressBar/>
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
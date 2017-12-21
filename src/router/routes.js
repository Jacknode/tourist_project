/**
 * Created by leibo on 17/11/29.
 */
import Login from '@/components/Login'  //登录

import Home from '@/components/Home' //首页
import SceneryUser from '@/components/SceneryUser' //导游信息
import SceneryOrder from '@/components/SceneryOrder' //导游预约表
export default [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    hidden: true,
    redirect: { name: 'Login' }
  },
  {
    path : '/home',
    component : Home,
    name : 'Home',
    children:[
      {
        path: 'sceneryUser',
        components: {
          default: Home,
          User: SceneryUser
        },
        name:'SceneryUser'
      },
      {
        path: 'sceneryOrder',
        components: {
          default: Home,
          User: SceneryOrder
        },
        name:'SceneryOrder'
      }
    ]
  }
]

import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import { useRoutes } from 'react-router-dom'

export default function useRouterElement() {
  let routesElements = useRoutes([
    {
      path: '/',
      element: <Profile />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <RegisterLayout />,
      children: [{ path: '/register', element: <Register /> }]
    }
  ])
  return routesElements
}

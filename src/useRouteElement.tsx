import MainLayout from './layouts/MainLayout/MainLayout'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Protect from './pages/Protect'
import Register from './pages/Register'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useAppSelector } from './redux/hooks'
import NewFeedLayout from './layouts/NewFeedLayout'
import CreatePost from './layouts/CreatePostLayout'
import CreatePostText from './components/CreatePost/CreatePostText'
import CreatePostLayout from './layouts/CreatePostLayout'
import CreatePostMedia from './components/CreatePost/CreatePostMedia'

export default function useRouterElement() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuth)
  console.log(isAuthenticated)

  //login roi=> cho vao trang profile, chua login=> cho ve trang login
  function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  }

  // neu login roi=> luon cho ve trang chu, chua login=> cho ve trang login
  function RejectedRoute() {
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  }

  let routesElements = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <NewFeedLayout />
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/login',
          element: <Login />
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: '/protect',
              element: <Protect />
            },
            {
              path: '/create-post',
              element: <CreatePost />
            },
            {
              path: '',
              element: <CreatePostLayout />,
              children: [
                {
                  path: '/create-post/text',
                  element: <CreatePostText />
                },
                {
                  path: '/create-post/media',
                  element: <CreatePostMedia />
                }
              ]
            }
          ]
        }
      ]
    }
  ])
  return routesElements
}

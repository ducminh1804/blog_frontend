import React from 'react'
import Header from '../../components/Header'
import Profile from '../../pages/Profile'
import Footer from '../../components/Footer'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import ChatLayout from '../ChatLayout'

export default function MainLayout() {

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

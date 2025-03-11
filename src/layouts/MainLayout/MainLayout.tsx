import React from 'react'
import Header from '../../components/Header'
import Profile from '../../pages/Profile'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

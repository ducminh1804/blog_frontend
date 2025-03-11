import React, { ReactNode } from 'react'
import { Outlet } from 'react-router'

export default function RegisterLayout() {
  return (
    <>
      <h1>register</h1>
      <div>
        <Outlet />
      </div>
    </>
  )
}

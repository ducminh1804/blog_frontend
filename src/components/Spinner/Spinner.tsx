import React from 'react'
import './index.css'
export default function Spinner() {
  return (
    <div>
      <div className='lds-roller'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>{' '}
    </div>
  )
}


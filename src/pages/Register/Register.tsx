import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type FormValues = {
  email: string
  username: string
  password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      username: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-2xl shadow-lg w-96'>
        <h2 className='text-2xl font-bold mb-4'>Register</h2>
        <p className='text-sm mb-4'>
          Need a Mailchimp account?{' '}
          <a href='#' className='text-blue-600'>
            Create an account
          </a>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-sm font-medium'>Email</label>
            <input type='email' className='w-full mt-1 p-2 border rounded-md' required {...register('email')} />
          </div>
          <div>
            <label className='block text-sm font-medium'>Username</label>
            <input
              type='text'
              className='w-full mt-1 p-2 border rounded-md'
              required
              {...register('username', {
                required: 'This is required',
                pattern: {
                  value: /^\S*$/,
                  message: 'No spaces allowed'
                }
              })}
            />
            {errors.username && <span className='text-red-500 text-sm italic'>{errors.username.message}</span>}
          </div>
          <div className='mb-4 relative'>
            <label className='block text-sm font-medium'>Password</label>
            <input
              type='password'
              {...register('password', {
                required: 'This is required',
                pattern: {
                  value: /^\S*$/,
                  message: 'No spaces allowed'
                }
              })}
              className='w-full mt-1 p-2 border rounded-md'
              required
            />
            {errors.password && <span className='text-red-500 text-sm italic'>{errors.password.message}</span>}
          </div>
          <button type='submit' className='w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700'>
            Log in
          </button>
        </form>
        <div className='mt-4 text-sm text-center'>
          <a href='#' className='text-blue-600 mr-4'>
            Forgot username?
          </a>
          <a href='#' className='text-blue-600'>
            Forgot password?
          </a>
        </div>
        <div className='mt-2 text-sm text-center'>
          <button className='text-blue-600'>Can't log in?</button>
        </div>
      </div>
    </div>
  )
}

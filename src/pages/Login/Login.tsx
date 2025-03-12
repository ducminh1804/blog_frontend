import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { loginAccount, type Auth } from '../../api/auth.api'
import { parse } from 'path'
import { parseErrorAxios } from '../../types/error.type'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../redux/hooks'
import { login } from '../../redux/slices/authentication.slice'
import { useNavigate } from 'react-router-dom'

type FormValues = {
  username: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await loginMutation.mutateAsync(data)
    dispatch(login())
  }

  const loginMutation = useMutation({
    mutationFn: (data: Auth) => loginAccount(data),
    onError: (error) => {
      const errorResponse = parseErrorAxios(error)
      toast.error(errorResponse?.message)
    },
    onSuccess: () => {
      toast.success('Login successfully')
      navigate('/')
    }
  })

  const dispatch = useAppDispatch()

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-2xl shadow-lg w-96'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <p className='text-sm mb-4'>
          Need a Mailchimp account?{' '}
          <a href='#' className='text-blue-600'>
            Create an account
          </a>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
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

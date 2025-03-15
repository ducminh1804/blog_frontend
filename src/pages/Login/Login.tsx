import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { parse } from 'path'
import { parseErrorAxios } from '../../types/error.type'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { login } from '../../redux/slices/authentication.slice'
import { useNavigate } from 'react-router-dom'
import type { Auth, UserInfo } from '../../types/auth.type'
import { AuthAPI } from '../../api/auth.api'
import { setTokenToLS } from '../../utils/localstore.service'

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

  //luon chay khi vao trang login, du co dang nhap hay k
  const userInfoQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => AuthAPI.getInfo(),
    enabled: false // ngan no tu dong chay khi mount
  })

  const loginMutation = useMutation({
    mutationFn: (data: Auth) => AuthAPI.loginAccount(data),
    onError: (error) => {
      const errorResponse = parseErrorAxios(error)
      toast.error(errorResponse?.message)
    },
    onSuccess: () => {
      toast.success('Login successfully')
      navigate('/')
    }
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    //muon xu li error thi phai dung mutateasync, no se throw ra exception neu co loi, con mutation chi bao loi thoi , nhung van thuc thi code tiep tuc
    await loginMutation.mutateAsync(data)
    //usequery k doi load xong moi dispatch
    const user = await userInfoQuery.refetch()
    const auth = user.data?.data.data as UserInfo
    setTokenToLS('id', auth.id)
    setTokenToLS('username', auth.username)
    // const userInfo = userInfoQuery.data?.data.data as UserInfo
    dispatch(login(auth))
    console.log('login running')
  }

  const auth = useAppSelector((state) => state.auth)

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

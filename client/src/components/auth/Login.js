import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { Link, useHistory } from 'react-router-dom'
import { types } from '../../types/types'
import Swal from 'sweetalert2'
import './auth.css';
import { Google } from './Google'


export const Login = () => {

  const { isAuth } = useSelector((state) => state);

  const dispatch = useDispatch()
  const history = useHistory();

  const [formLogin, handleLoginInputChange, resetLogin] = useForm({
    email: '',
    password: ''
  })

  const [formRegister, handleRegisterInputChange, resetRegister] = useForm({
    email: '',
    password: '',
    name: '',
    phone: '',
    rol: 'client'
  })


  const handleLogin = (e) => {
    e.preventDefault();

    fetch('https://barber-app-henry.herokuapp.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formLogin)
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.ok) {

          console.log(data)

          localStorage.setItem('token', data.token)
          dispatch({
            type: types.login, payload: {
              id: data.id,
              email: data.email,
              name: data.name,
              rol: data.rol
            }
          })
          history.replace('/')
        } else {
          Swal.fire('Error', 'Verifica tus datos', 'error')
        }
      })
      .catch(err => console.log(err))


    resetRegister()
  }

  const handleRegister = (e) => {
    e.preventDefault();

    fetch('https://barber-app-henry.herokuapp.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formRegister)
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.ok) {
          localStorage.setItem('token', data.token)
          dispatch({
            type: types.login, payload: {
              id: data.id,
              email: data.email,
              name: data.name,
              rol: data.rol
            }
          })
          history.replace('/')
        } else {
          if (data.errors.email) {
            Swal.fire('Error', `${data.errors.email.msg}`, 'error')
          } else if (data.errors.password) {
            Swal.fire('Error', `${data.errors.password.msg}`, 'error')
          } else if (data.errors.name) {
            Swal.fire('Error', `${data.errors.name.msg}`, 'error')
          }
        }
      })
      .catch(err => console.log(err))


    resetLogin()
  }

  if (isAuth) {
    return (
      <>
        <h1>Que diablos haces aqui andate al
          <Link to='/'> Home</Link>
        </h1>
      </>
    )
  }

  return (
    <div className='main'>
      <div className='col-login'>
        <div className='form-login'>
          <h1>Ingresar</h1>
          <form onSubmit={handleLogin} autoComplete='off'>
            <div className='form-group mb-2'>
              <input
                type='email'
                placeholder='Email'
                className='form-control'
                name='email'
                value={formLogin.email}
                onChange={handleLoginInputChange} />
            </div>

            <div className='form-group mb-2'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                className='form-control'
                value={formLogin.password}
                onChange={handleLoginInputChange} />

            </div>

            <div className='form-group mb-2'>
              <button
                type='submit'
                className='btn btn-primary'>Login</button>
            </div>

            <div className='form-group mb-2'>
              <Google />
            </div>
          </form>
        </div>
      </div>
      <div className='col-register'>
        <div className='form-register'>
          <h1>Registro</h1>
          <form onSubmit={handleRegister} autoComplete='off'>
            <div className='form-group mb-2'>
              <input
                type='email'
                placeholder='Email'
                className='form-control'
                name='email'
                value={formRegister.email}
                onChange={handleRegisterInputChange} />
            </div>

            <div className='form-group mb-2'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                className='form-control'
                value={formRegister.password}
                onChange={handleRegisterInputChange} />

            </div>

            <div className='form-group mb-2'>
              <input
                type='text'
                placeholder='Tu Nombre'
                name='name'
                className='form-control'
                value={formRegister.name}
                onChange={handleRegisterInputChange} />

            </div>

            <div className='form-group mb-2'>
              <input
                type='text'
                placeholder='Exmaple: +54 1234567899'
                name='phone'
                className='form-control'
                value={formRegister.phone}
                onChange={handleRegisterInputChange} />

            </div>

            <div className='form-group mb-2'>
              <button
                type='submit'
                className='btn btn-primary'>Registrarse</button>
            </div>

            <div className='form-group mb-2'>
              <Google />
            </div>
          </form>
        </div>
      </div>
      <div className='btn-volver'>
        <Link to='/'>Volver</Link>
      </div>
    </div>
  )
}

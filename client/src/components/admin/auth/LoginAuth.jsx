import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../redux/actions'
import { useForm } from '../../../hooks/useForm'
import { revalidarAuth } from '../../../redux/actions'
import { useEffect } from 'react'
// traer con use selector isauth


export const Login = () => {

  const isAuth  = useSelector((state) => state.isAuth);
  console.log(isAuth);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(revalidarAuth())
  }, [dispatch]);

  const [form, handleInputChange, reset] = useForm({
    email: '',
    password: ''
  })

  const {email, password} = form;

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login(form))
    reset()
    
  }

  return (
    <div>
      <h1>Login</h1>

      { isAuth?

        <h2>Online</h2>
        :
        <h2>Offline</h2>
    
        }
      <hr />
      <form onSubmit={handleLogin}>
        <input 
          type='email' 
          placeholder='email' 
          name='email'
          value={email}
          onChange={handleInputChange} />

        <input 
          type='password'
          placeholder='password'
          name='password'
          value={password}
          onChange={handleInputChange} />

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
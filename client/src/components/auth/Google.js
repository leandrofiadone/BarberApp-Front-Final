import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { types } from '../../types/types';
import { useHistory } from 'react-router-dom'

export const Google = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const responseGoogle = (response) => {
    const id_token = response.credential
    fetch('https://barber-app-henry.herokuapp.com/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id_token})
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
        }else{
          console.log(data)
        }
      })
      .catch(e => console.log(e))
  }

  return (
    <GoogleLogin
      clientId=""
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

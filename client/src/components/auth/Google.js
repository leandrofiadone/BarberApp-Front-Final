import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { types } from '../../types/types';
import { useHistory } from 'react-router-dom'
import { fetchSinToken } from '../../helpers/fetch';

export const Google = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const responseGoogle = async (response) => {

    const id_token = response.credential

    const resp = await fetchSinToken('auth/google', { id_token }, 'POST')
    const data = await resp.json();

    if (data.ok) {
      localStorage.setItem('token', data.token)
      dispatch({
        type: types.login, payload: {
          id: data.id,
          email: data.email,
          name: data.name,
          rol: data.rol,
          img: data.img,
          phone: data.phone
        }
      })
      history.replace('/')
    } else {
      console.log(data)
    }

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

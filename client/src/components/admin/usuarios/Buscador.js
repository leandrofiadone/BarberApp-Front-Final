import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { fetchConToken } from '../../../helpers/fetch';
import { useForm } from '../../../hooks/useForm';
import { types } from '../../../types/types';
import './usuarios.css'

export const Buscador = () => {

  const [query, handleChange, reset] = useForm({
    query: ''
  });

  const dispatch = useDispatch();

  const handleSearch = async(e) => {
    e.preventDefault();

    const resp = await fetchConToken(`users?name=${query.query}`);
    const data = await resp.json();

    if(data.ok){
      const payload = [data.user]
      dispatch({type: types.getAllUsers, payload})
    }else{
      Swal.fire('Error', data.msg, 'error')
    }

  }

  return (
    <>
      <div className='main-buscador'>
        <form onSubmit={handleSearch}>

          <input 
            type="search"
            name='query'
            className='form-control'
            value={query.query}
            onChange={handleChange}
            placeholder='Buscar un usuario' />

          <button 
            type='submit'
            className='btn btn-warning'>Buscar</button>

        </form>
      </div>
    </>
  )
}

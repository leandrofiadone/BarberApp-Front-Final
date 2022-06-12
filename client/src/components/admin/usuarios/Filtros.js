import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import {fetchConToken} from '../../../helpers/fetch';
import { types } from '../../../types/types';

export const Filtros = () => {
  
  const dispatch = useDispatch()

  const filterByState = async(e) => {
    const resp = await fetchConToken(`users?state=${e.target.value}`)
    const data = await resp.json()

    if(data.ok){
      dispatch({type: types.getAllUsers, payload: data.users})
    }else{
      Swal.fire('Error', data.msg, 'error')
    }
  }

  const filterByRol = async(e) => {
    const resp = await fetchConToken(`users?rol=${e.target.value}`)
    const data = await resp.json()

    if(data.ok){
      dispatch({type: types.getAllUsers, payload: data.users})
    }else{
      Swal.fire('Error', data.msg, 'error')
    }
  }

  const filterByAll = async(e) => {
    const resp = await fetchConToken('users');
    const data = await resp.json()

    if(data.ok){
      dispatch({type: types.getAllUsers, payload: data.users})
    }
  }

  return (
    <>
      <div className='contenedor-filtros'>
        <select onChange={filterByState} className='form-select'>
          <option hidden>Selecciona un Estado</option>
          <option value="true" key="1">Activo</option>
          <option value="false" key="2">Baneado</option>
        </select>
        <select onChange={filterByRol} className='form-select'>
          <option hidden>Selecciona un Rol</option>
          <option value='admin' key='3'>Administrador</option>
          <option value='client' key='4'>Cliente</option>
        </select>
        <button className='btn btn-warning' onClick={filterByAll}>Todos</button>
      </div>
    </>
  ) 
}

//ESTO ES PARA EL LOGIN !!!!!
import { types } from "../../types/types";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
// ESTO ES PARA EL LOGIN !!!!!!

import Swal from "sweetalert2";
import axios from "axios";

export const ALL_PRODUCTOS = "ALL_PRODUCTOS";
export const BUSCAR_PRODUCTOS = "BUSCAR_PRODUCTOS";
export const DETALLE_PRODUCTO = "DETALLE_PRODUCTO";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const ELIMINAR_INFO_DETALLE = "ELIMNAR_INFO_DETALLE";

export const GET_SERVICES = "GET_SERVICES";

export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const GET_EMPLOYEE = "GET_EMPLOYEE";

export const FILTER_CATEGORIAS = "FILTER_CATEGORIAS";
export const GET_CATEGORIES = "GET_CATEGORIES";

export const SORT_NAME = "SORT_NAME";
export const SORT = "SORT";
export const ORDER_PRECIO = "ORDER_PRECIO";

export const FILTER_RANGO_PRECIO = "FILTER_RANGO_PRECIO";

export const ALL_CITAS = " ALL_CITAS";
export const CREAR_CITA = "CREAR_CITA";

export const ALL_BARBEROS = "ALL_BARBEROS";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"

// all products carga todos los productos que estan activos solo activos
export function allProductos() {
  return async (dispatch) => {
    const resp = await fetchSinToken(`products?state=true`)
    const data = await resp.json();

    if (data.ok) {
      return dispatch({
        type: ALL_PRODUCTOS,
        payload: data.products,
      });
    }

  };
}

export function buscarProductos(name) {
  return async (dispatch) => {
    try {
      let informacion = await axios(
        // `https://barber-app-henry.herokuapp.com/api/products?name=${name}`
        `http://localhost:8080/api/products?name=${name}`
      );


      return dispatch({
        type: BUSCAR_PRODUCTOS,
        payload: informacion.data.product,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No encontramos el producto que estas buscando!",
        confirmButtonText: "Aceptar",
      });
      console.log(error);
    }
  };
}

export function detalleDeProductos(id) {
  return async (dispatch) => {
    try {
      let informacion = await axios(
        // `https://barber-app-henry.herokuapp.com/api/products/{id}`
        `http://localhost:8080/api/products/${id}`
      );
      return dispatch({
        type: DETALLE_PRODUCTO,
        payload: informacion.data.product,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function addProductos(product) {
  return async (dispatch) => {
    const resp = await fetchConToken('products', product, 'POST');
    const data = await resp.json();

    if(data.ok){

      Swal.fire('Success', 'producto creado', 'success')
      dispatch(addProductosAdmin(data.producto))
      return dispatch({
        type: ADD_PRODUCT,
        payload: data.producto,
      });
    }
  };
}

export function updateProductos(product) {
  return async (dispatch) => {
    try {
      const result = await fetchConToken(
        `products/${product.id}`,
        product,
        "PUT"
      );
      const data = await result.json();

      if (data.ok) {
        console.log(data)
        Swal.fire('Success', 'Producto actualizado', 'success')
        return dispatch({
          type: UPDATE_PRODUCT,
          payload: data.producto,
        });
      } else {
        console.log(data)
      }
    } catch (err) {
      console.log("error en modificacion:", err);
    }
  };
}

export function eliminarInfoDetalle() {
  return {
    type: ELIMINAR_INFO_DETALLE,
  };
}

export function getServices() {
  return async function (dispatch) {
    let servicios = await axios.get(
      // "https://barber-app-henry.herokuapp.com/api/services"
      "http://localhost:8080/api/services"
    );

    return dispatch({
      type: GET_SERVICES,
      payload: servicios.data,
    });
  };
}

export function addEmployee(employee) {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        // `https://barber-app-henry.herokuapp.com/api/employee`,
        `http://localhost:8080/api/employee`,
        employee
      );
      return dispatch({
        type: ADD_EMPLOYEE,
        payload: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getEmployee() {
  return async function (dispatch) {
    let result = await axios.get(
      // "https://barber-app-henry.herokuapp.com/api/employee"
      "http://localhost:8080/api/employee"
    );
    return dispatch({
      type: GET_EMPLOYEE,
      payload: result.data,
    });
  };
}

export function getCategories() {
  return async (dispatch) => {
    const resp = await fetchSinToken('categories');
    const data = await resp.json();
    console.log(data)
    if (data.ok) {
      return dispatch({
        type: GET_CATEGORIES,
        payload: data.categories,
      });
    }
  };
}

export function filterCategoriaProductos(payload) {
  return {
    type: FILTER_CATEGORIAS,
    payload,
  };
}

export function sortServices(order) {
  return {
    type: SORT,
    payload: order,
  };
}

export function sortName(order) {
  return {
    type: SORT_NAME,
    payload: order,
  };
}

export function orderByPrecio(payload) {
  return {
    type: ORDER_PRECIO,
    payload,
  };
}

export function allCitas() {
  return async (dispatch) => {
    const informacion = await axios(
      // `https://barber-app-henry.herokuapp.com/api/date`
      `http://localhost:8080/api/date`
    );

    return dispatch({
      type: ALL_CITAS,
      payload: informacion.data.allDates,
    });
  };
}

export function crearCita(payload) {
  return async (dispatch) => {
    try {
      const informacion = await axios.post(
        // "https://barber-app-henry.herokuapp.com/api/date",
        "http://localhost:8080/api/date",
        payload
      );

      return dispatch({
        type: CREAR_CITA,
        payload: informacion.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterPorPrecio(payload) {
  return {
    type: FILTER_RANGO_PRECIO,
    payload,
  };
}

export function allBarberos() {
  return async (dispatch) => {
    let informacion = await axios(
      // `https://barber-app-henry.herokuapp.com/api/employee`
      `http://localhost:8080/api/employee`
    );

    return dispatch({
      type: ALL_BARBEROS,
      payload: informacion.data.employees,
    });
  };
}

// ACCIONES DE LOGIN !!!
//-----------------------------------------------------------------------------------
export const login = (payload) => ({ type: types.login, payload })
// export const login = newFunction()

export function revalidarAuth() {
  return async (dispatch) => {
    const resp = await fetchConToken("auth/renew");
    const data = await resp.json();

    if (data.ok) {
      localStorage.setItem("token", data.token);
      const payload = {
        id: data.id,
        email: data.email,
        name: data.name,
        rol: data.rol,
        img: data.img,
        phone: data.phone
      };

      dispatch(adminGetAllProducts())
      return dispatch({
        type: types.login,
        payload,
      });
    }
  };
}

export function logout() {
  localStorage.clear();
  return {
    type: types.logout,
  };
}

export const userActive = (id) => {
  return async (dispatch) => {
    const resp = await fetchConToken(`users/${id}`)
    const data = await resp.json();

    if (data.ok) {
      const payload = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        rol: data.user.rol.rol
      }
      return dispatch({ type: types.userActive, payload })
    }
  }
}

//ACÁ TERMINAN LAS  ACCIONES DE LOGIN !!!
//-----------------------------------------------------------------------------------
export function deleteProduct(id) {
  return async function (dispatch) {
    let result = await fetchConToken(`products/${id}`, {}, 'DELETE')
    const data = await result.json();
    if (data.ok) {
      Swal.fire('Success', 'Producto eliminado', 'success')
      return dispatch({
        type: DELETE_PRODUCT,
        payload: id
      });
    }
  };
}


export const paymentMP = async (items, user, navigate, emptyCart) => {

  const carrito = []
  items.map((i) => {
    carrito.push({
      idUser: user.idUser,
      idProduct: i.idProduct,
      quantity: i.quantity
    })
  })
  const response = await fetch("https://barber-app-henry.herokuapp.com/api/purchaseOrder", {
    method: "POST",
    body: JSON.stringify(carrito),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  window.open(json.urlPayment, '_blank');
  emptyCart();
  navigate.push('/');
}


// ======================= estas acciones las agrego david por favor consultar conmigo para cualquier cambios =================================/
// ======================================== ALERTA

// esta accion sirve para banear y desbanear basicamente
export const banearUser = (user) => {
  return {
    type: types.banearUser,
    payload: user
  }
}

// esta accion le carga los usuarios para el administrador luego poder banearlos
export const getAllUsers = () => {
  return async (dispatch) => {
    const resp = await fetchConToken('users');
    const data = await resp.json();

    if (data.ok) {
      return dispatch({ type: types.getAllUsers, payload: data.users })
    }
  }
}

export const adminGetAllProducts = () => {
  return async (dispatch) => {
    const resp = await fetchSinToken('products?p=true');
    const data = await resp.json();

    if (data.ok) {
      return dispatch({ type: types.getAllProductsAdmin, payload: data.products })
    }
  }
}

export const addProductosAdmin = (product) => (
  {
    type: types.addProductsAdmin,
    payload: product
  }
)
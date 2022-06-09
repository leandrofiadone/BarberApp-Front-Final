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
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";



export function allProductos() {
  return async (dispatch) => {
    const resp = await fetchSinToken(`products?state=true`);
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
    const resp = await fetchSinToken(`products?name=${name}`);
    const data = await resp.json();

    if (data.ok) {
      return dispatch({
        type: BUSCAR_PRODUCTOS,
        payload: data.product,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No encontramos el producto que estas buscando!",
        confirmButtonText: "Aceptar",
      });
    }
  };
}

export function detalleDeProductos(id) {
  return async (dispatch) => {
    const resp = await fetchSinToken(`products/${id}`);
    const data = await resp.json();

    if (data.ok) {
      return dispatch({
        type: DETALLE_PRODUCTO,
        payload: data.product,
      });
    }
  };
}

export function addProductos(product) {
  return async (dispatch) => {
      const resp = await fetchConToken('products', product, 'POST');
      const data = await resp.json()

      if(data.ok){
        dispatch(addProductosAdmin(data.producto))
        dispatch({type: ADD_PRODUCT, payload: data.producto});

        Swal.fire('Sucess', `${data.producto.name} agregado`, 'success')
        // window.location.replace('/admin/product')
      }else{
        Swal.fire('Error', 'Verifica los datos', 'error')
      }
  };
}

export function eliminarInfoDetalle() {
  return {
    type: ELIMINAR_INFO_DETALLE,
  };
}

export function getServices() {
  return async function(dispatch) {
    let servicios = await axios.get(
      "https://barber-app-henry.herokuapp.com/api/services"
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
        `https://barber-app-henry.herokuapp.com/api/employee`,
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
  return async function(dispatch) {
    const resp = await fetchSinToken("employee");
    const data = await resp.json();

    if (data.ok) {
      return dispatch({
        type: GET_EMPLOYEE,
        payload: data,
      });
    }
  };
}

export function getCategories() {
  return async (dispatch) => {
    const resp = await fetchSinToken("categories");
    const data = await resp.json();

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

export function sortName(payload) {
  return {
    type: SORT_NAME,
    payload,
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
    const resp = await fetchSinToken("date");
    const data = await resp.json();

    if (data.ok) {
      return dispatch({
        type: ALL_CITAS,
        payload: data.allDates,
      });
    }
  };
}

export function crearCita(payload) {
  return async (dispatch) => {
    const respuesta = await fetchConToken("date", payload, "POST");
    const data = await respuesta.json();

    console.log(data);
    if (data.ok) {
      dispatch({ type: CREAR_CITA, payload: data });
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
    const resp = await fetchSinToken("employee");
    const data = await resp.json();

    if (data.ok) {
      return dispatch({
        type: ALL_BARBEROS,
        payload: data.employees,
      });
    }
  };
}

// ACCIONES DE LOGIN !!!
//-----------------------------------------------------------------------------------

export function logout() {
  localStorage.clear();
  return {
    type: types.logout,
  };
}

export const userActive = (id) => {
  return async (dispatch) => {
    const resp = await fetchConToken(`users/${id}`);
    const data = await resp.json();

    if (data.ok) {
      const payload = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        rol: data.user.rol.rol,
      };
      dispatch({ type: types.userActive, payload });
    }
  };
};

//ACÁ TERMINAN LAS  ACCIONES DE LOGIN !!!
//-----------------------------------------------------------------------------------
export function deleteProduct(id) {
  return async function(dispatch) {
    let result = await fetchConToken(`products/${id}`, {}, "DELETE");
    const data = await result.json();
    if (data.ok) {
      Swal.fire("Success", "Producto eliminado", "success");
      return dispatch({
        type: DELETE_PRODUCT,
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
        Swal.fire("Success", "Producto actualizado", "success");
        return dispatch({
          type: UPDATE_PRODUCT,
          payload: data.producto,
        });
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log("error en modificacion:", err);
    }
  };
}

  

export const paymentMP = async(items,user, navigate,emptyCart) =>{
  const carrito = []
        items.map((i)=>{
            carrito.push({
                idUser: user.id,
                idProduct:i.idProduct,
                quantity:i.quantity
            })
        })
  const token = localStorage.getItem('token')
  const response = await fetch("https://barber-app-henry.herokuapp.com/api/purchaseOrder", {
    method: "POST",
    body: JSON.stringify(carrito),
    headers: {
      "Content-Type": "application/json",
      "x-token": token
    },
  });
  const json = await response.json();
  window.open(json.urlPayment, '_blank');
  emptyCart();
  navigate.push("/");
};



export const login = (payload) => ({ type: types.login, payload });

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
        phone: data.phone,
      };

      if(data.rol === 'ADMIN'){
        dispatch(adminGetAllProducts());
        dispatch(getAllUsers())
      }

      // dispatch(getCategories())
      return dispatch({
        type: types.login,
        payload,
      });
    }
  };
}

// ======================= estas acciones las agrego david por favor consultar conmigo para cualquier cambios =================================/
// ======================================== ALERTA

// esta accion sirve para banear y desbanear basicamente
export const banearUser = (user) => {
  return {
    type: types.banearUser,
    payload: user,
  };
};

// esta accion le carga los usuarios para el administrador luego poder banearlos
export const getAllUsers = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("users");
    const data = await resp.json();

    if (data.ok) {
      return dispatch({ type: types.getAllUsers, payload: data.users });
    }
  };
};
export const adminGetAllProducts = () => {
  return async (dispatch) => {
    const resp = await fetchSinToken("products?all=true");
    const data = await resp.json();

    if (data.ok) {
      return dispatch({
        type: types.getAllProductsAdmin,
        payload: data.products,
      });
    }
  };
};

export const addProductosAdmin = (product) => ({
  type: types.addProductsAdmin,
  payload: product,
});

export const activarProducto = (id) => {
  return async (dispatch) => {
    const resp = await fetchConToken(`products/${id}`, {}, "PATCH");
    const data = await resp.json();
    console.log(data);
    if (data.ok) {
      dispatch({ type: types.activaProducto, payload: data.producto });
    }
  };
};






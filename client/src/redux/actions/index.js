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
export const ADD_SERVICE = "ADD_SERVICE";

export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const GET_EMPLOYEE = "GET_EMPLOYEE";

export const FILTER_CATEGORIAS = "FILTER_CATEGORIAS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const ADD_CATEGORIE = "ADD_CATEGORIE";

export const SORT_NAME = "SORT_NAME";
export const SORT = "SORT";
export const ORDER_PRECIO = "ORDER_PRECIO";

export const FILTER_RANGO_PRECIO = "FILTER_RANGO_PRECIO";

export const ALL_CITAS = " ALL_CITAS";
export const CREAR_CITA = "CREAR_CITA";

export const ALL_COMPRA = "ALL_COMPRA";

export const ALL_BARBEROS = "ALL_BARBEROS";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const GET_FAVOURITES = "SET_FAVOURITES";

export const DELETE_DATE = "DELETE_DATE";
export const ALL_CITAS_ADMIN = "ALL_CITAS_ADMIN";

export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
export const DETALLE_EMPLOYEE = "DETALLE_EMPLOYEE";
export const UPDATE_SERVICE = "UPDATE_SERVICE";
export const DETALLE_SERVICE = "DETALLE_SERVICE";
export const DELETE_SERVICE = "DELETE_SERVICE";
export const ADMIN_GET_ALL_SERVICES = "ADMIN_GET_ALL_SERVICES";
export const ADMIN_GET_ALL_EMPLOYEE = "ADMIN_GET_ALL_EMPLOYEE";

export const CITAS_EMPLEADO = "CITAS_EMPLEADO";


export const CONSTOCK_SINSTOCK = "CONSTOCK_SINSTOCK";
export const USUARIOS_BANEADOS = "USUARIOS_BANEADOS";
export const VENTAS_TRANSACCION = "VENTAS_TRANSACCION";

export const FILTER_RANGE = "FILTER_RANGE";


// all products carga todos los productos que estan activos solo activos
export function allProductos() {
  return async (dispatch) => {
    const resp = await fetchSinToken(`products?state=true`);
    const data = await resp.json();
    await dispatch(getConStockSinStock(data.products, 0, 0));
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
    const resp = await fetchConToken("products", product, "POST");
    const data = await resp.json();

    if (data.ok) {
      dispatch(addProductosAdmin(data.producto));
      dispatch({ type: ADD_PRODUCT, payload: data.producto });

      Swal.fire("Sucess", `${data.producto.name} agregado`, "success");
      // window.location.replace('/admin/product')
    } else {
      Swal.fire("Error", "Verifica los datos", "error");
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
    const resp = await fetchSinToken("services");
    const data = await resp.json();

    if (data.ok) {
      return dispatch({
        type: GET_SERVICES,
        payload: data.services,
      });
    }
  };
}
export function addEmployee(employee) {
  return async (dispatch) => {
    const resp = await fetchConToken("employee", employee, "POST");
    const data = await resp.json();
    if (data.ok) {
      Swal.fire('Sucess', 'Empleado creado correctamente', 'success')
      return dispatch({
        type: ADD_EMPLOYEE,
        payload: data.newEmployee,
      });
    }else{
      Swal.fire('Error', data.msg, 'error')
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
        payload: data.employees,
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
    const resp = await fetchSinToken("date?all=true");
    const data = await resp.json();

    if (data.ok) {
      dispatch({
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
    if (data.ok) {
      dispatch({ type: CREAR_CITA, payload: data });
      dispatch(allCitas());
      dispatch(allCitasAdmin());
    }
  };
}

export function crearCompra(id) {
  return async (dispatch) => {
    const respuesta = await fetchConToken(`pago/${id}`, "GET");
    const data = await respuesta.json();

    if (data.ok) {
      dispatch({ type: ALL_COMPRA, payload: data.notification });
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
    console.log(data)
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
        Swal.fire(
          "Success",
          `${data.producto.name} actualizado correctamente`,
          "success"
        );
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

export const paymentMP = async (items, user, navigate, emptyCart) => {
  const carrito = [];

  items.map((i) => {
    carrito.push({
      idUser: user.id,
      idProduct: i.idProduct,

      quantity: i.quantity,
    });
  });

  const token = localStorage.getItem("token");
  const response = await fetch(
    "https://barber-app-henry.herokuapp.com/api/purchaseOrder",
    {
      method: "POST",
      body: JSON.stringify(carrito),
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    }
  );
  const json = await response.json();
  window.open(json.urlPayment, "_blank");
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

      if (data.rol === "ADMIN") {
        dispatch(adminGetAllProducts());
        dispatch(getAllUsers());
        dispatch(getCategories());
        dispatch(allCitasAdmin());
      }
      dispatch(allCitas());





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
    await dispatch(getUsuariosBaneados(data.users, 0));
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

    if (data.ok) {
      dispatch({ type: types.activaProducto, payload: data.producto });
    }
  };
};

export function deleteDate(id) {
  return async function(dispatch) {
    const result = await fetchConToken(`date/${id}`, {}, "DELETE");
    const data = await result.json();
    if (data.ok) {
      dispatch(allCitas());
      dispatch(allCitasAdmin());
    }
  };
}

export const getFavourites = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await fetchConToken(`favorite/${idUser}`);
      const json = await response.json();
      dispatch({ type: GET_FAVOURITES, payload: json });
    } catch (error) {
      console.error(error);
    }
  };
};

export function allCitasAdmin() {
  return async (dispatch) => {
    const resp = await fetchSinToken("date?all=true");
    const data = await resp.json();

    if (data.ok) {
      return dispatch({
        type: ALL_CITAS_ADMIN,
        payload: data.allDates,
      });
    }
  };
}

export function addCategorie(categorie) {
  return async (dispatch) => {
    const resp = await fetchConToken("categories", categorie, "POST");
    const data = await resp.json();
    if (data.ok) {
      Swal.fire("Success", "Categoria creado", "success");
      return dispatch({
        type: ADD_CATEGORIE,
        payload: {
          id: data.id,
          categorie: data.categorie,
          products: [],
        },
      });
    }
  };
}
export function detalleEmployee(id) {
  return async (dispatch) => {
    const resp = await fetchSinToken(`employee/${id}`);
    const data = await resp.json();
    if (data.ok) {
      return dispatch({
        type: DETALLE_EMPLOYEE,
        payload: data.employee,
      });
    }
  };
}

export function updateEmpleados(employee) {
  return async (dispatch) => {
    try {
      const result = await fetchConToken(
        `employee/${employee.id}`,
        employee,
        "PUT"
      );
      const data = await result.json();
      if (data.ok) {
        Swal.fire("Success", "Empleado actualizado", "success");
        return dispatch({
          type: UPDATE_EMPLOYEE,
          payload: data.employee,
        });
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log("error en modificacion:", err);
    }
  };
}

export function deleteEmpleado(idEmployee) {
  return async function(dispatch) {
    let result = await fetchConToken(`employee/${idEmployee}`, {}, "DELETE");
    const data = await result.json();
    if (data.ok) {
      Swal.fire("Success", "Empleado eliminado", "success");
      return dispatch({
        type: DELETE_EMPLOYEE,
        payload: data.employee,
      });
    }
  };
}

export function addService(service) {
  return async function(dispatch) {
    let result = await fetchConToken(`services`, service, "POST");
    const data = await result.json();
    if (data.ok) {
      Swal.fire("Success", "Servicio Agregado", "success");
      return dispatch({
        type: ADD_SERVICE,
        payload: data.service,
      });
    }
  };
}

export function updateService(servicio) {
  return async (dispatch) => {
    try {
      const result = await fetchConToken(
        `services/${servicio.id}`,
        servicio,
        "PUT"
      );
      const data = await result.json();
      if (data.ok) {
        Swal.fire("Success", "Servicio actualizado", "success");
        return dispatch({
          type: UPDATE_SERVICE,
          payload: data.employee,
        });
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log("error en modificacion:", err);
    }
  };
}

export function detalleService(id) {
  return async (dispatch) => {
    const resp = await fetchSinToken(`services/${id}`);
    const data = await resp.json();
    if (data.ok) {
      return dispatch({
        type: DETALLE_SERVICE,
        payload: data.service,
      });
    }
  };
}
export function deleteService(idServicio) {
  return async function(dispatch) {
    let result = await fetchConToken(`services/${idServicio}`, {}, "DELETE");
    const data = await result.json();
    if (data.ok) {
      Swal.fire("Success", "Servicio eliminado", "success");
      return dispatch({
        type: DELETE_SERVICE,
        payload: data.service,
      });
    }
  };
}
export function getAdminAllServices() {
  return async function(dispatch) {
    const resp = await fetchSinToken("services?all=true");
    const data = await resp.json();
    if (data.ok) {
      return dispatch({
        type: ADMIN_GET_ALL_SERVICES,
        payload: data.allServices,
      });
    }
  };
}
export function getAdminAllEmpleados() {
  return async function(dispatch) {
    const resp = await fetchSinToken("employee?all=true");
    const data = await resp.json();
    if (data.ok) {
      return dispatch({
        type: ADMIN_GET_ALL_EMPLOYEE,
        payload: data.allEmployes,
      });
    }
  };
}

export function datesEmployee(idEmployee) {
  return async (dispatch) => {
    const resp = await fetchSinToken(`date/${idEmployee}`);
    const data = await resp.json();

    if (data.ok) {
      return dispatch({
        type: CITAS_EMPLEADO,
        payload: data.foundDatesEmployee,
      });
    }
  };
}

export function EliminarCita(id) {
  return async function(dispatch) {
    const result = await fetchConToken(`date/${id}`, {}, "DELETE");
    const data = await result.json();

    if (data.ok) {
      dispatch(allCitasAdmin());
      dispatch(allCitas());
    }
  };
}


export function getConStockSinStock(productos, data1, data2) {
  return async function(dispatch) {
    productos.map((producto) => {
      if (producto.stock !== 0) {
        data1 = data1 + 1;
      } else {
        data2 = data2 + 1;
      }
    });
    return dispatch({
      type: CONSTOCK_SINSTOCK,
      payload: data1,
      payload1: data2,
    });
  };
}

export function getUsuariosBaneados(usuarios, data) {
  return async function(dispatch) {
    usuarios.map((usuario) => {
      if (usuario.state === false) {
        data++;
      }
    });
    return dispatch({
      type: USUARIOS_BANEADOS,
      payload: data,
    });
  };
}

export function getVentasUsuarios() {
  return async function(dispatch) {
    let result = await fetchConToken(`pago`, {}, "GET");
    const data = await result.json();
    if (data.ok) {
      return dispatch({
        type: VENTAS_TRANSACCION,
        payload: data.order,
      });
    }
  };
}
export const filterRange = (products) =>{
  return (dispatch) =>{
    dispatch({type: FILTER_RANGE, payload:products})
  }
}

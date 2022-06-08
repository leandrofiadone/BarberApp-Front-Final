import * as ACTIONS from "../actions";

// para el login
import { types } from "../../types/types";
//para el login

const initialState = {
  servicios: [],
  productos: [],
  allProductos: [],
  allServicios: [],
  detalle: {},
  categorias: [],
  empleados: [],
  citas: [],
  allCitas: [],
  barberos: [],
  //login
  user: {},
  isAuth: false,
  //cierra login
  adminAllUsers: [],
  adminAllProducts: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ALL_PRODUCTOS:
      return {
        ...state,
        productos: action.payload,
        allProductos: action.payload,
      };

    case ACTIONS.BUSCAR_PRODUCTOS:
      return {
        ...state,
        productos: action.payload,
      };

    case ACTIONS.DETALLE_PRODUCTO:
      return {
        ...state,
        detalle: action.payload,
      };

    case ACTIONS.DELETE_PRODUCT:
      return {
        ...state,
        allProductos: state.productos.filter((p) => p.id !== action.payload),
      };

    case ACTIONS.ELIMINAR_INFO_DETALLE:
      return {
        detalle: [],
      };

    case ACTIONS.GET_SERVICES:
      return {
        ...state,
        servicios: action.payload,
        categorias: action.payload,
        allServicios: action.payload,
      };
    case ACTIONS.ADD_EMPLOYEE:
      return {
        ...state,
      };

    case ACTIONS.GET_EMPLOYEE:
      return {
        ...state,
        empleados: action.payload,
      };

    case ACTIONS.FILTER_CATEGORIAS:
      const filterProductos = state.allProductos;

      const infoCategoria =
        action.payload === "All"
          ? filterProductos
          : filterProductos.filter(
              (e) => e.category.categorie === action.payload
            );
      console.log(infoCategoria);

      console.log(filterProductos[0].category.categorie);
      return {
        ...state,
        allProductos: infoCategoria,
      };

    case ACTIONS.GET_CATEGORIES:
      return {
        ...state,
        categorias: action.payload,
      };

    case ACTIONS.SORT_NAME:
      let orderName = [...state.allProductos];
      orderName = orderName.sort((a, b) => {
        if (a.name < b.name) {
          return action.payload === "ASC" ? -1 : 1;
        }
        if (a.name > b.name) {
          return action.payload === "ASC" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        allProductos:
          action.payload === "Filter" ? state.allProductos : orderName,
      };

    case ACTIONS.SORT:
      let orderedCharacters = [...state.allProductos];
      orderedCharacters = orderedCharacters.sort((a, b) => {
        if (a.price < b.price) {
          return action.payload === "ASCENDENTE" ? -1 : 1;
        }
        if (a.price > b.price) {
          return action.payload === "ASCENDENTE" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        servicios:
          action.payload === "Filtro" ? state.allServicios : orderedCharacters,
      };

    case ACTIONS.ORDER_PRECIO:
      let ordenPrecio = [...state.allProductos];

      const info =
        action.payload === "All"
          ? ordenPrecio
          : action.payload === "max"
          ? ordenPrecio.sort((a, b) => b.price - a.price)
          : ordenPrecio.sort((a, b) => a.price - b.price);

      return {
        ...state,
        allProductos: info,
      };

    case ACTIONS.FILTER_RANGO_PRECIO:
      let productosFilter = state.productos;

      const res = productosFilter.filter(
        (e) => e.price >= action.payload[0] && e.price <= action.payload[1]
      );

      return {
        ...state,
        productos: res,
      };

    case ACTIONS.ALL_CITAS:
      return {
        ...state,
        citas: action.payload,
        allCitas: action.payload,
      };

    case ACTIONS.CREAR_CITA:
      return {
        ...state,
      };

    case ACTIONS.ALL_BARBEROS:
      return {
        ...state,
        barberos: action.payload,
      };

    // PARA EL LOGIN!!!!!

    case types.login:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };

    case types.logout:
      return {
        ...state,
        user: {},
        isAuth: false,
      };

    // CIERRA EL LOGIN!!!!!

    // ===================ACCIONES DE DAVID=================
    case types.getAllUsers:
      return {
        ...state,
        adminAllUsers: action.payload,
      };

    case types.banearUser:
      let users = state.adminAllUsers.filter(
        (user) => user.id !== action.payload.id
      );
      let user = action.payload;
      return {
        ...state,
        adminAllUsers: users.concat(user),
      };

    case types.getAllProductsAdmin:
      return {
        ...state,
        adminAllProducts: action.payload,
      };

    case ACTIONS.ADD_PRODUCT:
      return {
        ...state,
        allProductos: state.allProductos.concat(action.payload),
      };

    case types.addProductsAdmin:
      return {
        ...state,
        adminAllProducts: state.adminAllProducts.concat(action.payload),
      };

    case types.activaProducto:
      let activarProductoAdmin = state.adminAllProducts.filter(
        (pro) => pro.id !== action.payload.id
      );
      let productoActivar = action.payload;
      return {
        ...state,
        adminAllProducts: activarProductoAdmin.concat(productoActivar),
      };

    case ACTIONS.DELETE_PRODUCT:
      let arrDeProductos = state.adminAllProducts.filter(
        (p) => p.id !== action.payload.id
      );
      let productoActualizado = action.payload;
      return {
        ...state,
        allProductos: state.allProductos.filter(
          (p) => p.id !== action.payload.id
        ),
        adminAllProducts: arrDeProductos.concat(productoActualizado),
      };

    case ACTIONS.UPDATE_PRODUCT:
      let productos = state.allProductos.filter(
        (p) => p.id !== action.payload.id
      );
      let productosAdmin = state.adminAllProducts.filter(
        (p) => p.id !== action.payload.id
      );
      let producto = action.payload;
      let productoAdmin = action.payload;

      return {
        ...state,
        allProductos: productos.concat(producto),
        adminAllProducts: productosAdmin.concat(productoAdmin),
      };

    case ACTIONS.DELETE_DATE:
      let cancelarCita = state.citas.filter((e) => e.id !== action.payload);
      let todasLasCitas = action.payload;

      return {
        ...state,
        citas: cancelarCita.concat(todasLasCitas),
      };

    default:
      return state;
  }
}

export default rootReducer;

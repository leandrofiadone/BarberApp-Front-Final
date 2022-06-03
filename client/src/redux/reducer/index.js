import * as ACTIONS from "../actions";

// para el login
import { types } from "../../types/types";
//para el login

const initialState = {
  servicios: [],
  productos: [],
  allProductos: [],
  allServicios: [],
  detalle: [],
  categorias: [],
  empleados: [],
  citas: [],
  barberos: [],
  //login
  user: {},
  isAuth: false
  //cierra login

};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ALL_PRODUCTOS:
      console.log(action.payload);
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

    case ACTIONS.ADD_PRODUCT:
      return {
        ...state,
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
      const filterCategorias = state.categorias;
      const filterProductos = state.allProductos;

      const infoCategoria =
        action.payload === "All"
          ? filterProductos
          : filterProductos.filter(
            (e) => e.category.categorie === action.payload
          );

      return {
        ...state,
        productos: infoCategoria,
      };

    case ACTIONS.GET_CATEGORIES:
      return {
        ...state,
        categorias: action.payload,
      };

    case ACTIONS.SORT_NAME:
      let orderName = [...state.productos];
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
        productos: action.payload === "Filter" ? state.allProductos : orderName,
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
      let ordenPrecio = [...state.productos];

      const info =
        action.payload === "All"
          ? ordenPrecio
          : action.payload === "max"
            ? ordenPrecio.sort((a, b) => b.price - a.price)
            : ordenPrecio.sort((a, b) => a.price - b.price);

      return {
        ...state,
        productos: info,
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
        isAuth: true
      }

    case types.logout:
      return {
        ...state,
        user: {},
        isAuth: false
      }

    // CIERRA EL LOGIN!!!!!

    default:
      return state;
  }
}

export default rootReducer;

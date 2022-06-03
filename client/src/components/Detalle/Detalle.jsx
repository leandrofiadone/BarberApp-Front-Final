import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detalleDeProductos, eliminarInfoDetalle } from "../../redux/actions";

import { Link } from "react-router-dom";

import {useCart} from 'react-use-cart';
import Swal from 'sweetalert2'

import "./Detalle.css"

const Detalle = ({item}) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const {addItem} = useCart()

  // function ambos(id){
  //   Swal.fire({
  //     icon:'success',
  //     title:'Producto agregado al carrito!'
  //   })
  //   addItem(item, id)
  // } 

  useEffect((id) => {
    dispatch(detalleDeProductos(id));
  }, [dispatch]);

  useEffect(() => {
    return dispatch(eliminarInfoDetalle());
  }, [dispatch]);

  const productosId = useSelector((state) => state.detalle);

  return (
    <div >
      
      {productosId ? (
        <div className="containerDetail">
          <h3>{productosId.name}</h3>
          <img src={productosId.img} className="imgDetalle"/>
          <h2><b>$ {productosId.price}</b></h2>
          <p><i>Stock: {productosId.stock}</i></p>
          <button type="button" class="btn btn-success" onClick={() => addItem(id)}>Comprar</button>
        </div>
      ) : (
        <div>Cargando Producto</div>
      )}
      <br />

      <div className="divDesc">
      <p >
      Descripcion: <br />
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem ipsa quod deserunt qui, velit reprehenderit ea! Dicta, est, quis pariatur quas, error in harum id expedita earum porro dolorem consequatur.
      </p>
      </div>



      <Link to="/tienda">
        <button>Volver </button>
      </Link>
    </div>
  );
};

export default Detalle;

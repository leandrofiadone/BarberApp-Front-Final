import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detalleDeProductos, eliminarInfoDetalle } from "../../redux/actions";

import { Link } from "react-router-dom";

import { useCart } from "react-use-cart";
import Swal from "sweetalert2";

import "./Detalle.css";

const Detalle = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { addItem } = useCart();

  const { user } = useSelector((state) => state);

  function addCartAlert() {
    Swal.fire({
      icon: "success",
      title: "Producto agregado al carrito!",
    });
  }

  useEffect(() => {
    dispatch(detalleDeProductos(id));
  }, [dispatch, id]);

  const deleteInfoProduct = (id) => {
    dispatch(eliminarInfoDetalle(id));
  };

  const productosId = useSelector((state) => state.detalle);

  return (
    <div className="fotoBarber">
      <Link to="/tienda">
        <button className="boton">Volver </button>
      </Link>
      {productosId ? (
        <div className="izquierda media">
          <div className=" containerDetail">
            <img src={productosId.img} />
          </div>
          <div className="derecha media2 letra">
            <h1>{productosId.name}</h1>
            <br />

            <br />
            <h4> {productosId.detail}</h4>
            <br />
            <br />
            <br />
            <h2>
              <b>$ {productosId.price}</b>
            </h2>
            {/*  <p>
              <i>Stock: {productosId.stock}</i>
            </p> */}

            <button
              className="boton"
              type="button"
              onClick={() => {
                addItem({
                  id: productosId,
                  price: productosId.price,
                  stock: productosId.stock,
                  name: productosId.name,
                  idProduct: productosId.id,
                  idUser: user.idUser,
                  detail: productosId.detail,
                  quantity: 1,
                });
                addCartAlert();
              }}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      ) : (
        <div>Cargando Producto</div>
      )}
    </div>
  );
};

export default Detalle;

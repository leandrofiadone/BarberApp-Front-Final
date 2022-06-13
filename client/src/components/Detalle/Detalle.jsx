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
  const productosId = useSelector((state) => state.detalle);

  function addCartAlert() {
    Swal.fire({
      icon: "success",
      title: "Producto agregado al carrito!",
    });
  }

  useEffect(() => {
    dispatch(detalleDeProductos(id));
  }, [dispatch]);

  const detalleEliminar = () => {
    dispatch(eliminarInfoDetalle());
  };

  return (
    <div className="fotoBarber">
      <div className="fotoTransparente">
        <div className="botonDetalleVolver">
          <button onClick={() => detalleEliminar()}>
            <Link to="/tienda">Volver</Link>
          </button>
        </div>
        {productosId ? (
          <div className="transparenteContenedor">
            <div className=" containerImagen">
              <img src={productosId.img} />
            </div>
            <div className="ContenedorTituloLetra">
              <h1 className="letra">{productosId.name}</h1>
            </div>
            <div className="TextoClases">
              <div>
                <p>
                  {productosId.detail}
                </p>
              </div>
              <div>
                <h2>
                  <b>$ {productosId.price}</b>
                </h2>
              </div>
              <div>
                <span>Stock: {productosId.stock}</span>
              </div>
              <div>
                <button
                  className="botonDelCarrito"
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
          </div>
        ) : (
          <div>Cargando Producto</div>
        )}
      </div>
    </div>
  );
};

export default Detalle;

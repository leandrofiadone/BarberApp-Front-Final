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

  /*   useEffect(() => {
    return dispatch(eliminarInfoDetalle());
  }, [dispatch]); */

  return (
    <div className="fotoBarber">
      <div className="fotoTransparente">
        <div className="botonDetalleVolver">
          <button>
            <Link to="/tienda">Volver</Link>
          </button>
        </div>
<<<<<<< HEAD
=======

>>>>>>> f45f6c7d047da1c911025a6f00f1f53fb7b847ec
        {productosId ? (
          <div className="transparenteContenedor">
            <div className=" containerImagen">
              <img src={productosId.img} />
            </div>
<<<<<<< HEAD
            <div className="ContenedorTituloLetra">
              <h1 className="letra">{productosId.name}</h1>
            </div>
=======

            <div className="ContenedorTituloLetra">
              <h1 className="letra">{productosId.name}</h1>
            </div>

>>>>>>> f45f6c7d047da1c911025a6f00f1f53fb7b847ec
            <div className="TextoClases">
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Doloribus dolor, similique ullam velit consequuntur
                  aspernatur, labore vero ipsa error sequi eos animi, culpa
                  voluptatibus voluptatem porro cupiditate fugit possimus eaque.
                </p>
              </div>
<<<<<<< HEAD
=======

>>>>>>> f45f6c7d047da1c911025a6f00f1f53fb7b847ec
              <div>
                <h2>
                  <b>$ {productosId.price}</b>
                </h2>
              </div>
<<<<<<< HEAD
              <div>
                <span>Stock: {productosId.stock}</span>
              </div>
=======

              <div>
                <span>Stock: {productosId.stock}</span>
              </div>

>>>>>>> f45f6c7d047da1c911025a6f00f1f53fb7b847ec
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
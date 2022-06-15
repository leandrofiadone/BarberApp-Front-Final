import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { detalleDeProductos, eliminarInfoDetalle } from "../../redux/actions";
import imgCorazonRojo from "../Tienda/img/corazon-rojo.png";
import imgCorazonGris from "../Tienda/img/corazon-gris.png";

import { Link } from "react-router-dom";

import { useCart } from "react-use-cart";
import Swal from "sweetalert2";

import "./Detalle.css";

const Detalle = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const { addItem } = useCart();
  const { user, isAuth } = useSelector((state) => state);
  const productosId = useSelector((state) => state.detalle);
  const [favorite, setFavorite] = useState({ newFavourite: false });
  const location = useLocation();
  const {
    handleAddFavourites,
    handleDeleteFavourites,
    addFavourites,
    index,
    idCard,
  } = location.state;
  function addCartAlert() {
    Swal.fire({
      icon: "success",
      title: "Producto agregado al carrito!",
    });
  }

  useEffect(() => {
    dispatch(detalleDeProductos(id));
  }, [dispatch]);

  useEffect(() => {
    if (addFavourites[index].newFavourite) {
      setFavorite(() => {
        return {
          newFavourite: true,
        };
      });
    }
  }, [addFavourites, index]);

  const detalleEliminar = () => {
    dispatch(eliminarInfoDetalle());
  };

  const alertaReg = () => {
    Swal.fire({
      icon: "error",
      title: "Debe ingresar o registrarse",
    });
  }

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
                <p>{productosId.detail}</p>
              </div>
              <div>
                <h2>
                  <b>$ {productosId.price}</b>
                </h2>
              </div>
              <div>
                <span>Stock: {productosId.stock}</span>



                {/* <button
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
                </button> */}

                <div className="buttonComprarDetalle">

                  {
                    isAuth && isAuth ? (
                      <button
                        id="miBoton"
                        type="button"
                        className="btn btn-success fw-bold botonDelCarrito"
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
                    ) : (
                      <Link to="/auth/login">

                        <button
                          id="miBoton"
                          type="button"
                          className="btn btn-success fw-bold botonDelCarrito"
                          onClick={() => alertaReg()}
                        >
                          Agregar al carrito
                        </button>
                      </Link>
                    )
                  }

                  {Object.keys(user).length ? (
                    !favorite.newFavourite ? (
                      <img
                        onClick={() => {
                          handleAddFavourites(idCard, index);
                          setFavorite(() => {
                            return { newFavourite: true };
                          });
                        }}
                        className="imagen-corazon-gris-detalle"
                        src={imgCorazonGris}
                      ></img>
                    ) : (
                      <img
                        onClick={() => {
                          handleDeleteFavourites(index, idCard);
                          setFavorite(() => {
                            return { newFavourite: false };
                          });
                        }}
                        className="imagen-corazon-rojo-detalle"
                        src={imgCorazonRojo}
                      ></img>
                    )
                  ) : null}

                </div>
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

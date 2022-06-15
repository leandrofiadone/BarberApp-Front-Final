import "./Cards.css";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cards = ({ name, stock, price, img, id, category, idProduct }) => {
  const { isAuth, user } = useSelector((state) => state);


  const { addItem } = useCart();

  const ambos = () => {
    Swal.fire({
      icon: "success",
      title: "Producto agregado al carrito!",
    });

    //Falta agregar el id delk usuario logueado
    addItem({ name, stock, price, img, id, category, idProduct });
  };

  const alertaReg = () => {
    Swal.fire({
      icon: "error",
      title: "Debe ingresar o registrarse",
    });
  }

  return (
    <div className="containerCard">
      <div className="containerImg">
        <img src={img} alt="Img not found" maxwidth="500" />
      </div>

      <div className="containerText">
        <h3> {name}</h3>
        <br />
        <h3><i><b>$ {price}</b></i></h3>
        {/* <h6> Stock: {stock}</h6> */}
        {/* <h6>Categoria: {category}</h6> */}
           {/* <h6>{id}</h6> */}
        <div className="buttonComprar">

          {
            isAuth && isAuth ? (
              <button
            id="miBoton"
            type="button"
            className="btn btn-success fw-bold botonTiendaComprar"
            onClick={() => ambos()}
          >
            Comprar
          </button>
            ) : (
              <Link to="auth/login" className="linkComprarTienda">
              
              <button
            id="miBoton"
            type="button"
            className="btn btn-secondary fw-bold text-dark botonTiendaComprar"
            onClick={() => alertaReg()}
          >
            Comprar
          </button>
              </Link>
            )
          }
          
        </div>
      </div>
    </div>
  );
};

export default Cards;

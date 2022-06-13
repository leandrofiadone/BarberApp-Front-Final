import "./Cards.css";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";

const Cards = ({ name, stock, price, img, id, category, idProduct }) => {
  const { addItem } = useCart();

  const ambos = () => {
    Swal.fire({
      icon: "success",
      title: "Producto agregado al carrito!",
    });

    //Falta agregar el id delk usuario logueado
    addItem({ name, stock, price, img, id, category, idProduct });
  };

  return (
    <div className="containerCard">
      <div className="containerImg">
        <img src={img} alt="Img not found" maxwidth="500" />
      </div>

      <div className="containerText">
        <h3> {name}</h3>
        <br />
        <h4><i><b>${price}</b></i></h4>
        <br />
        <h6> Stock: {stock}</h6>
        <h6>Categoria: {category}</h6>
        {/*    <h6>{id}</h6> */}
        <div className="buttonComprar">
          <button
            id="miBoton"
            type="button"
            className="btn btn-success fw-bold botonTiendaComprar"
            onClick={() => ambos()}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;

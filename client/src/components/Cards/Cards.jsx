import "./Cards.css";
import {useCart} from 'react-use-cart';
import Swal from 'sweetalert2'


const Cards = ({ name, stock, price, img, id, category, item }) => {

  const {addItem} = useCart()

  const ambos =() => {
    Swal.fire({
      icon:'success',
      title:'Producto agregado al carrito!'
    })
    addItem(item)
  } 

  return (

    <div className="containerCard">
      <div className="containerImg">
        <img src={img} alt="Img not found" />
      </div>

      <div className="containerText">

        <h5> {name}</h5>
        <h5> ${price}</h5>
        <h6> Stock: {stock}</h6>
        <h6>Categoria: {category}</h6>
        <h6>{id}</h6>
        <div className="buttonComprar">
          <button id="miBoton" type="button" className="btn btn-success bg-dark fw-bold" onClick={() => ambos()}>Comprar</button>
        </div>
      </div>
    </div>

  );
};

export default Cards;

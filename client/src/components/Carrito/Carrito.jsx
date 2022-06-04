import React from "react";
import { useCart } from "react-use-cart";
import './Carrito.css'
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux";
import { paymentMP } from "../../redux/actions";
import { useSelector } from "react-redux";


export default function Carrito() {
    const { isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart
    } = useCart();

    //const {user} = useSelector(state => state)
    const user ={idUser:"c7c27d4c-5e59-4dff-aa6a-9bc366dc8766"};

    if (isEmpty) return <h1 className="text-center">El carrito esta vacio</h1>

    function cerrarReg() {
        document.getElementById('carrito').style.display = 'none';
    }


    const pay = (items) =>{
        const carrito = []
        items.map((i)=>{
            carrito.push({
                idUser: user.idUser,
                idProduct:i.idProduct,
                quantity:i.quantity
            })
        })
 
        paymentMP(carrito);
    }

    return (
        <section className="py-4 container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <button onClick={() => cerrarReg()} type="button" className="btn-close bg-danger text-light" aria-label="Close"></button>
                    <h5>Productos: ({totalUniqueItems}) Total items: ({totalItems})</h5>
                    <table className="table table-dark m-0">
                        {
                            items.map((e) => {
                                return (
                                    <tr>
                                        <td>
                                            <img src={e.img} alt="" style={{ height: "6rem" }} />
                                        </td>
                                        <td>{e.name}</td>
                                        {" "}
                                        <td className="fw-bold">$ {e.price}</td>
                                        {" "}
                                        <td>Cantidad: {e.quantity}</td>
                                        <td className="botonesCarrito">
                                            <button
                                                onClick={() => updateItemQuantity(e.id, e.quantity - 1)}
                                                className="btn btn-success ms-2 bg-dark menos fw-bold"
                                            >-</button>
                                            <button
                                                onClick={() => updateItemQuantity(e.id, e.quantity + 1)}
                                                className="btn btn-success ms-2 bg-dark fw-bold"
                                            >+</button>
                                            <button
                                                onClick={() => removeItem(e.id)}
                                                className="btn btn-danger bg-dark">X</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
                <div className="col-auto ms-auto">
                    <h2>Precio Total: $ {cartTotal}</h2>
                </div>
                <div className="col-auto">
                    <button className="btn btn-success fw-bold" style={{ padding: "1.5rem" }} onClick={()=>pay(items)}>Comprar Ahora</button>
                    <br />
                    <button className="btn btn-danger" onClick={() => emptyCart()}>Vaciar Carrito</button>
                </div>
            </div>
        </section>
    )
}
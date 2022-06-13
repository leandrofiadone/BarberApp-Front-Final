// import React from "react";
// import { Link, Redirect } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { ComprasPerfil } from "../Profile/compras/ComprasPerfil";

// import { logout } from "../../redux/actions/index";

// import "./NavBar.css";

// export default function NavBar() {

//   const { isAuth, user } = useSelector((state) => state);
//   const { isAuth, user } = useSelector((state) => state);

//   const dispatch = useDispatch();
//   const history = useHistory();
//   const handleLogout = () => {
//     dispatch(logout());
//     history.replace("/");
//   };
// export default function NavBar() {

//   const { isAuth, user } = useSelector((state) => state);

//   const dispatch = useDispatch();
//   const history = useHistory();
//   const handleLogout = () => {
//     dispatch(logout());
//     history.replace("/");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark p-3" id="menu">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/"></Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <a
//                 className="nav-link text-light"
//                 aria-current="page"
//                 href="#inicio"
//               >
//                 Inicio
//               </a>
//             </li>
//             <li>
//               <a className="nav-link text-light" href="#servicios">
//                 Servicios
//               </a>
//             </li>
//             <li >
//               <a className="nav-link text-light" >
//                 Quienes Somos
//               </a>
//             </li>
//             <li className="nav-item" id="LinkTienda">
//               <Link className="nav-link text-light" to="/tienda">
//                 Tienda
//               </Link>
//             </li>

//   const dispatch = useDispatch();
//   const history = useHistory();
//   const handleLogout = () => {
//     dispatch(logout());
//     history.replace("/");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark p-3" id="menu">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/"></Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <a
//                 className="nav-link text-light"
//                 aria-current="page"
//                 href="#inicio"
//               >
//                 Inicio
//               </a>
//             </li>
//             <li>
//               <a className="nav-link text-light" href="#servicios">
//                 Servicios
//               </a>
//             </li>
//             <li>
//               <a className="nav-link text-light" href="#quienesSomos">
//                 Quienes Somos
//               </a>
//             </li>
//             <li className="nav-item" id="LinkTienda">
//               <Link className="nav-link text-light" to="/tienda">
//                 Tienda
//               </Link>
//             </li>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <a
//                 className="nav-link text-light"
//                 aria-current="page"
//                 href="#inicio"
//               >
//                 Inicio
//               </a>
//             </li>
//             <li>
//               <a className="nav-link text-light" href="#servicios">
//                 Servicios
//               </a>
//             </li>
//             <li >
//               <a className="nav-link text-light" >
//                 Quienes Somos
//               </a>
//             </li>
//             <li className="nav-item" id="LinkTienda">
//               <Link className="nav-link text-light" to="/tienda">
//                 Tienda
//               </Link>
//             </li>

//             <li className="nav-item" >
//               <Link className="nav-link text-light" to="/compras">
//                 Mis Compras
//               </Link>
//             </li>

//             <li className="nav-item" >
//               <Link className="nav-link text-light" to="/compras">
//                 Mis Compras
//               </Link>
//             </li>

//             {!isAuth && (
//               <Link className="nav-item linkReserva" to="/auth/login">
//                 <li className="nav-item">
//                   <button className="bg-dark">Ingresar/Registrarse</button>
//                 </li>
//               </Link>
//             )}

//             {isAuth && (
//               <Link className="nav-item linkReserva" to={`/profile`}>
//                 <li className="nav-item">
//                   <button className="bg-dark">Perfil</button>
//                 </li>
//               </Link>
//             )}
//           </ul>


//             {!isAuth && (
//               <Link className="nav-item linkReserva" to="/auth/login">
//                 <li className="nav-item">
//                   <button className="bg-dark">Ingresar/Registrarse</button>
//                 </li>
//               </Link>
//             )}

//             {isAuth && (
//               <Link className="nav-item linkReserva" to={`/profile`}>
//                 <li className="nav-item">
//                   <button className="bg-dark">Perfil</button>
//                 </li>
//               </Link>
//             )}
//           </ul>

//           {isAuth && (
//             <span className="linkReserva">
//               <button
//                 onClick={handleLogout}
//                 className="btnCita btn btn-warning fw-bold"
//                 type="button"
//               >
//                 Salir
//               </button>
//             </span>
//           )}
//           {isAuth && isAuth ? (
//             <Link to="/reserva" className="linkReserva">
//               <button className="btnCita btn btn-warning fw-bold" type="button">
//                 Reserva tu cita
//               </button>
//             </Link>
//           ) : (
//             <Link to="auth/login" className="linkReserva">
//               <button className="btnCita btn btn-warning fw-bold" type="button">
//                 Reserva tu cita
//               </button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

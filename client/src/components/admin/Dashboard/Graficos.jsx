import React from "react";
import { useSelector } from "react-redux";
import { CategoriasPastel } from "./CategoriasPastel";
import { ReservasBarras } from "./ReservasBarras";
import { VentasBarras } from "./VentasBarras";

export const Graficos = () => {
  const {
    adminAllUsers,
    allCitas,
    userBan,
    conStock,
    sinStock,
    ventas,
  } = useSelector((state) => state);
  return (
    <div>
      <div className="input-group mb-3 row">
        <div className="col-xl-12 border  rounded bg-black">
          <h1 className="text-center">DASHBOARD</h1>
        </div>
      </div>

      <div className="input-group mb-3 row border  rounded bg-black">
        <h3 className="text-center ">Datos Generales</h3>
        <div className="col-xl-12 ">
          <div className="row mb-3 rounded">
            <div className="col-xl-4 col-sm-6 py-2 rounded ">
              <div className="card_grafic bg-success text-white h-100 rounded">
                <div
                  className="card-body bg-success rounded"
                  style={{ backgroundColor: "#57b960" }}
                >
                  <div className="rotate">
                    <i className="fa fa-user fa-4x"></i>
                  </div>
                  <h6 className="text-center rounded">Usuarios Registrados</h6>
                  <h1 className="display-4 text-center">
                    {adminAllUsers.length}
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 py-2  rounded">
              <div className="card_grafic bg-danger text-white h-100 rounded">
                <div
                  className="card-body bg-danger rounded"
                  style={{ backgroundColor: "#57b960" }}
                >
                  <div className="rotate">
                    <i className="fa fa-baneados fa-4x"></i>
                  </div>
                  <h6 className="text-center">Usuarios Baneados</h6>
                  <h1 className="display-4 text-center">{userBan}</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 py-2 rounded">
              <div className="card_grafic text-white bg-secondary h-100 rounded">
                <div className="card-body">
                  <div className="rotate">
                    <i className="fa fa-order fa-4x"></i>
                  </div>
                  <h6 className="text-center">Citas Registradas</h6>
                  <h1 className="display-4 text-center">{allCitas.length}</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 py-2 rounded ">
              <div className="card_grafic text-white bg-primary h-100 rounded">
                <div className="card-body">
                  <div className="rotate">
                    <i className="fa fa-conStock fa-4x"></i>
                  </div>
                  <h6 className="text-center">Productos con Stock</h6>
                  <h1 className="display-4 text-center">{conStock}</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 py-2  rounded">
              <div className="card_grafic text-white bg-info h-100 rounded">
                <div className="card-body">
                  <div className="rotate">
                    <i className="fab fa-sinStock fa-4x"></i>
                  </div>
                  <h6 className="text-center">Productos sin Stock</h6>
                  <h1 className="display-4 text-center">{sinStock}</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 py-2  rounded">
              <div className="card_grafic text-white bg-warning h-100 rounded">
                <div className="card-body">
                  <div className="rotate">
                    <i className="fa fa-order fa-4x"></i>
                  </div>
                  <h6 className="text-center">Ordenes Pagadas</h6>
                  <h1 className="display-4 text-center">{ventas.length}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="input-group mb-3 row">
        <div className="col-xl-12 border  rounded bg-black">
          <ReservasBarras />
        </div>
      </div>
      <div className="input-group mb-3 row">
        <div className="col-xl-12 border  rounded bg-black">
          <div className="row mb-3 rounded">
            <div className="col-xl-6 col-sm-6 py-2 rounded ">
              <div className="card_grafic  text-white h-400 rounded">
                <div
                  className="card-body  rounded"
                  style={{ backgroundColor: "#151514 " }}
                >
                  <div className="rotate">
                    <i className="fa fa-user fa-4x"></i>
                  </div>
                  <CategoriasPastel />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-sm-6 py-2  rounded">
              <div className="card_grafic  text-white h-400 rounded">
                <div
                  className="card-body rounded"
                  style={{ backgroundColor: "#151514 " }}
                >
                  <div className="rotate">
                    <i className="fa fa-baneados fa-4x"></i>
                  </div>
                  <VentasBarras />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

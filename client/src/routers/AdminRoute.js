import React from 'react'
import { Route, Switch } from "react-router-dom";
import { AddProducts } from '../components/admin/AddProducts';
import { Navbar } from '../components/admin/navbar/Navbar';


export const AdminRoute = () => {
  return (
    <div>
      {/* este es el menu del panel de administracion */}
      <Navbar />
       <Switch>
          <Route exact path='/admin/addProducts' component={AddProducts} />
          {/* aqui se definen las rutas de admin */}

       </Switch>
    </div>
  )
}
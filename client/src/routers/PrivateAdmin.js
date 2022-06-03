import React from 'react';
import {Route, Redirect} from 'react-router-dom'

export const PrivateAdmin = ({
    isAuth,
    admin,
    component: Component,
    ...rest
}) => {

    let isAdmin = false;
    if(admin === 'ADMIN'){
        isAdmin = true
    }

  return (
    <Route  
        component={(props) => (
            (isAuth && isAdmin)
                ? (<Component {...props} />)  
                : (<Redirect to='/' />)
        )}
    />
  )
}

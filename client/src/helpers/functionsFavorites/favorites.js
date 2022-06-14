import { fetchConToken } from "../fetch";

export const setFavouriteApi = async(favourite) =>{
    try {
      const response = await fetchConToken(`favorite`, favourite, "POST");
      const json = await response.json();
    } catch (error) {
      console.log(error);
      
    }
  }
  
  export const deleteFavouriteApi = async(favourite) =>{
    try {
      const response = await fetchConToken(`favorite`, favourite, "DELETE");
      const json = await response.json();
    } catch (error) {
      console.log(error);
      
    }
  }

  export const favoritesRender = (allFavorites, productosBarberia) =>{
    let favouritesRender = []
    if(allFavorites && allFavorites.length){
      for(let i = 0; i < allFavorites.length; i++){
          let found = productosBarberia.findIndex((f)=>f.id === allFavorites[i].idProduct);
           if(found > -1 ){ 
             favouritesRender[i] = productosBarberia[found]
           }
           }
  }
  return favouritesRender
  };

  export const paymentMPFavourites = async(item) =>{
    const token = localStorage.getItem('token')
    const response = await fetch("https://barber-app-henry.herokuapp.com/api/purchaseOrder", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        "x-token": token
      },
    });
    const json = await response.json();
    window.open(json.urlPayment, '_blank');
  };
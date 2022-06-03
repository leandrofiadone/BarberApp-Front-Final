const baseUrl = `https://barber-app-henry.herokuapp.com/api`;


//ESTE SIRVE DE ALGO???????????
export const fetchSinToken = (endpoint, data, method = 'GET') => {
   const url = `${baseUrl}/${endpoint}`;

   if(method === 'GET'){
      return fetch(url);
   }else {
      return fetch(url, {
         method,
         headers: {
            'Content-Type': 'appication/json'
         },
         body: JSON.stringify(data)
      })
   }
}

//ESTE SIRVE DE ALGO???????????

export const fetchConToken = (endpoint, data, method = 'GET') => {
   const url = `${baseUrl}/${endpoint}`
   const token = localStorage.getItem('token') || '';
   if(method === 'GET'){
      return fetch(url, {
         headers: {
            'x-token': token
         }
      })
   }else {
      return fetch(url, {
         method,
         headers: {
            'Content-Type': 'application/json',
            'x-token': token
         },
         body: JSON.stringify(data)
      })
   }
}
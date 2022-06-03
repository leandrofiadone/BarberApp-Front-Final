import { useState } from "react"

export const useForm = (initialState = {}) => {
   const [form, setForm] = useState(initialState);

   const reset = (newForm = initialState) => {
      setForm(newForm)
   }

   const handleInputChange = ({target}) => {
      setForm({
         ...form,
         [target.name]: target.value
      })
   }

   return [form, handleInputChange, reset]
}
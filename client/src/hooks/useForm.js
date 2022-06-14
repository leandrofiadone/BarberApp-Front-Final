import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [form, setForm] = useState(initialState);
  const [ken, setken] = useState(initialState);
  const reset = (newForm = initialState) => {
    setForm(newForm);
  };

  const handleInputChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
    let val = target.value.concat("2");
    setken({
      ...form,
      [target.name]: target.value,
    });
  };

  return [form, handleInputChange, reset, ken];
};

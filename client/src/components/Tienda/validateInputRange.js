const validateInput = (input) => {
    let errors = {};
  console.log(input)
    if (typeof(input.min) !== "number") {
      errors.min = "El tipo de dato es numerico";
    }

    if (typeof(input.max) !== "number") {
        errors.min = "El tipo de dato es numerico";
      }    
    return errors;
}

export default validateInput;
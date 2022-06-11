const validateEmail = (input) => {
    let errors = {};
  
    if (!input.email) {
      errors.email = "Email is required";
    } else if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(input.email)) {

      errors.email ="El formato de Email es incorrecto";
    }

    
    return errors;

}

export default validateEmail;
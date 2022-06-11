const validatePassword = (input) => {
    let errors = {};
  

    if (!input.password1 ||!input.password2 ) {
      errors.password = "Password is required";
    } 

    if(input.password1 !== input.password2){
      errors.password = "Passwords no coinciden";
    }
    return errors;

}

export default validatePassword;
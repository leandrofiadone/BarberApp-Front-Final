export const types = {
  login: "[auth] Login",
  logout: "[auth] Logout",

  userActive: "[user] active user",
  clearActiveUse: "[user] clear active user",
  updateUser: "[user] actualizar usuario",

  getAllUsers: "[admin => users] obtener todos los usuarios",
  banearUser: "[admin => users] banear un usuario",

  createUser: "[auth] register user",

  crearProducto: "[producto] crear un producto",
  activaProducto: "[admin => producto] activar un producto",
  getAllProductsAdmin:
    "[producto] obtener todos los productos sin importar su estado",
  addProductsAdmin: "[admin => product] añadir productos al panel de admin",
};

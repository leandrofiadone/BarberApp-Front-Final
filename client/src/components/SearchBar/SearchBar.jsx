import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buscarProductos, allProductos } from "../../redux/actions";
import Swal from "sweetalert2";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import "./SearchBar.css";

const SearchBar = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const productosComplet = useSelector((state) => state.productos);

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value.toLowerCase());
    console.log(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (name.length > 4) {
      console.log("enviado");
      setName("");
      dispatch(buscarProductos(name));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No encontramos el producto que estas buscando!",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="d-flex">
      <Stack>
        <Autocomplete
          id="producto"
          options={productosComplet.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              focus="false"
              value={name}
              label="Buscar Producto"
              variant="outlined"
              focused
              onChange={(e) => handleChange(e)}
              {...params}
              onSelect={(e) => handleChange(e)}
              InputProps={{
                ...params.InputProps,
                type: "text",
                style: {
                  height: 35,
                  width: 200,
                  alignContent: "center",
                },
              }}
            />
          )}
        />
      </Stack>
      <div className="mx-1">
        <button
          onClick={(e) => handleClick(e)}
          className="btn btn-warning"
          type="submit"
          disabled={name === "" ? true : false}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

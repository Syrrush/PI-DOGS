import React from "react";
import { useState } from "react";
import { searchByName } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";
import Styles from "./SearchBar.module.css"


export default function SearchBar() {
const [input,setInput] = useState("");
const dispatch = useDispatch();

function handleInputChange(e){
    let busqueda = e.target.value.toLowerCase().trim();
    setInput(busqueda)
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(searchByName(input))
    setInput("")
}

return(
    <div className={Styles.container}>
        <form onSubmit={e=> handleSubmit(e)}>
            <div className={Styles.inputs}>
                <input className={Styles.input} placeholder="Ingrese alguna raza..." onChange={(e)=> handleInputChange(e)} type='text' value={input} name='busqueda' />
                <input className={Styles.input} type="submit" value="Buscar" ></input>
            </div>
        </form>
    </div>
    )
}
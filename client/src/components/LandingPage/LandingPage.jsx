import React from "react";
import {Link} from "react-router-dom";
import Styles from "./LandingPage.module.css"
import ingreso from "../../images/botonIngreso.png"

export default function LandingPage(){
    return(
        <div className={Styles.container}>
            <div className={Styles.info}>
             <h1>Bienvenidos a <br/> "Puppy's world" 🐕</h1>
                <Link to= "/home">
                    <input className={Styles.botonIngresar} alt="Boton para ingresar" type="image" src={ingreso} />
                </Link>
            </div>
        </div>
    )
}
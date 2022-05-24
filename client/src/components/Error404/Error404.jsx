import React from "react";
import { Link } from "react-router-dom";
import AreaPuppies from "../../images/AreaPuppies.png"
import Styles from "./Error404.module.css"

const Error404 = () => {
    return (
    <div className={Styles.fondo}>   
    <img
    className={Styles.imagen} 
    alt="Problemas Tecnicos..." 
    src={AreaPuppies} 
    />
    <Link to="/home"><button className={Styles.volver}>Volver a Home</button></Link>
    </div>
 )}
 export default Error404;
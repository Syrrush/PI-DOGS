import React from "react";
import Styles from "../Card/Card.module.css"

export default function Card({id,image, nombre,temperament, peso}){
    return (
        <div className={Styles.card}>
            { image ? 
            <img className={Styles.imagen} src={image} alt="perritu" width="200px" height="250px" /> 
            : <img className={Styles.imagen} src="https://holatelcel.com/wp-content/uploads/2020/09/cheems-memes-9.jpg" alt="perritu" width="200px" height="250px" /> }
            {/* <img className={Styles.imagen} src={image} alt="perritu" width="200px" height="250px" /> */}
            <h3 className={Styles.Nombre}>{nombre}</h3>
            <h4 className={Styles.info} >{`${peso} kg`}</h4>
            <h4 className={Styles.info}>{temperament}</h4>
        </div>
            )
}

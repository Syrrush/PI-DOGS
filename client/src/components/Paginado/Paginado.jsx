import React from "react";
import Styles from "../Paginado/Paginado.module.css"

export default function Paginado({dogsPerPage, allDogs, pageTotal}){
    const pageNumbers = [];
    for(let i=1; i<= Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className={Styles.paginado}>
                { pageNumbers?.map(x => (
                    <div className={Styles.contenedor} key={x}>
                        <li className={Styles.numero} key={x} >
                            <a href onClick={() => pageTotal(x)} className={Styles.total}>{x}</a>
                        </li>
                    </div>
                ))}
            </ul>
        </nav>
    )
}
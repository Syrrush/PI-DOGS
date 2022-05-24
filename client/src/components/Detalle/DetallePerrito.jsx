import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDogDetail, cleaner } from "../../redux/actions/index.js";
import Styles from "./DetallePerrito.module.css"


export default function DetallePerrito(){
    
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogDetail(id))
    }, [dispatch, id]);

    useEffect(()=> {
        return dispatch(cleaner())
    }, [dispatch])

    
    const doggie = useSelector((state) => state.detalles)

    return (
            <div className={Styles.divgral}>
                {
                    doggie.length > 0 ? (
                            <div className={Styles.conteinerGrid}>
                                
                                <h1 className={Styles.raza}>{doggie[0].nombre}</h1>
                                 { doggie[0].image ? (
                                <img
                                className={Styles.imagen}
                                src={doggie[0].image} 
                                alt={doggie[0].nombre}  
                                />
                                 )  : ( <img 
                                    className={Styles.imagen}
                                    src="https://holatelcel.com/wp-content/uploads/2020/09/cheems-memes-9.jpg"
                                    alt={doggie[0].nombre} /> )
                                 }
                                 
                                 
                                { doggie[0].temperament? 
                                    <h3 className={Styles.informacion}>{doggie[0].temperament}</h3>
                                 : ( <h3 className={Styles.informacion}>{doggie[0].temperaments && (doggie[0].temperaments.map((x) => x.nameTemperament.concat(" "))).join(", ") }</h3>)
                            }
                            <h3 className={Styles.informacion}>{`${doggie[0].peso} KG`}</h3>
                            <h3 className={Styles.informacion}>{`${doggie[0].altura} CM`}</h3>
                            <h3 className={Styles.informacion}>{doggie[0].esperanza_vida}</h3>
                            <h3 className={Styles.informacion}>{`Familia de raza: ${doggie[0].familia_de_raza}`}</h3>
                            
                            <Link to="/home"><button className={Styles.volver}>Volver al inicio</button></Link>
                        </div>
                        )
                : <h1>Cargando...</h1> 
                }  

            </div>
    );
}

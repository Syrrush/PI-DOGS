import React from "react";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Card from "../Card/Card.jsx";
import Styles from "../Home/Home.module.css";
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import {getDogs,
    getTemperament,
    filterByTemperament,
    filterByWeight,
    filterByName,
    filterByCreated} from "../../redux/actions/index.js";
import goHome from "../../images/goHomeNaranja.png"
import createDog from "../../images/CreateDog.png"
import perrito from "../../images/perritoTorcido.png"
import gif from "../../images/EsperandoInformacion.gif"
import Puppies from "../../images/Puppies.png"


export default function Home () {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => state.temperaments)
    
    //Paginado 
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage,] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog);
    const pageTotal = (page) => {
        setCurrentPage(page)
    }
    


    
    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperament())
    },[dispatch])
    
    
    function HandleClickHome(e){
        e.preventDefault();
        dispatch(getDogs())
        setCurrentPage(1)
        setOrden("")
        setOrden1("")
    }
    
    const [, setOrden] = useState("")
    const [,setOrden1] = useState("")
    
   


    
    function handleFilterWeight(e){
        e.preventDefault();
        dispatch(filterByWeight(e.target.value))
        setCurrentPage(1)
        setOrden1(`Ordenado ${e.target.value}`)
    }

    function handleFilterTemperament(e) {
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value))
    }

    function handlefilterCreated(e){
        e.preventDefault();
        dispatch(filterByCreated(e.target.value))
    }

    function handleFilterName(e){
        e.preventDefault();
        dispatch(filterByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }


    return (
        <div>
            { currentDogs.length > 0 ? ( 
                
                <div>
            <div className={Styles.header}>
                <div className={Styles.goHome}>
                        <input onClick={e=> {HandleClickHome(e)}}  className={Styles.botonHome} alt="Boton para ingresar" type="image" src={goHome} />
                        <button onClick={e=> {HandleClickHome(e)}} className={Styles.informacion}>Home</button>
                </div>
                <div className={Styles.divTitulo}>
            <input onClick={e=> {HandleClickHome(e)}}  className={Styles.Puppies} alt="icono" type="image" src={Puppies} />
            <input onClick={e=> {HandleClickHome(e)}}  className={Styles.icono} alt="icono" type="image" src={perrito} />
                </div>
            <Link to="/dog">
            <input className={Styles.botonCreate} alt="Boton de Crear Dog" type="image" src={createDog} />
            </Link>
            </div>
            <div className={Styles.todo}>
            <nav className={Styles.nav}>
            <br/>
            <div className={Styles.navIzquierda} >
                <span className={Styles.informacionSpan}>Ordenar por:</span>
                <select className={Styles.inputs} onChange={e=> {handleFilterWeight(e)}}>
                    <option className={Styles.inputs} value="Ascendente">Peso ascendente</option>
                    <option className={Styles.inputs} value="Descendente">Peso descendente</option>
                </select>
                <select className={Styles.inputs} onClick={e => {handleFilterName(e)}}>
                    <option className={Styles.inputs} value="Ascendente">Nombre (A-Z) </option>
                    <option className={Styles.inputs} value="Descendente">Nombre (Z-A) </option>
                </select>
                </div>
                <div className={Styles.navMedio}>
                <span className={Styles.informacionSpan}>Filtrar por:</span>
                <div>
                    <select  className={Styles.inputs} onChange={e=> handleFilterTemperament(e)}>
                    <option className={Styles.inputs} key="Temperament" value="Temperamentos">Temperamentos</option>
                {
                    allTemperaments?.map((temperament) => {
                        return(
                            <option key={temperament.name} value={temperament}>{temperament}</option>
                            )})}
                    </select>
                </div>
                <select className={Styles.inputs} onChange={e=> handlefilterCreated(e)}>
                    <option className={Styles.inputs} value="allDogs">API y BD</option>
                    <option className={Styles.inputs} value="dogsDb">De la Base de Datos</option>
                    <option className={Styles.inputs} value="dogsApi">De la API</option>
                </select>
                </div>
                <div className={Styles.divDerecha}>
                <SearchBar  />
                </div>
                </nav>
                <Paginado dogsPerPage={dogsPerPage}
                allDogs= {allDogs.length}
                pageTotal = {pageTotal}
                />
                <div className={Styles.cards} >
            {
                currentDogs?.map((dog) => {
                    return (
                        <div className={Styles.Carta}>
                        <Link to={"/dogs/" + dog.id}>
                            <Card 
                            nombre={dog.nombre}
                            image={dog.image}
                            key={dog.id}
                            temperament={
                                dog.temperament 
                                ? dog.temperament
                                : dog.temperaments && (dog.temperaments.map((x) => x.nameTemperament.concat(" "))).join(", ")}
                            peso={dog.peso}
                            />
                        </Link>
                        </div>
                    )
                })
            }   
            </div>
            <Paginado dogsPerPage={dogsPerPage}
                allDogs= {allDogs.length}
                pageTotal = {pageTotal} />
                </div>
                </div>
            ) : 
            <div className={Styles.fondo}>
            <h2>La información que desea encontrar aún la estamos buscando, por favor espere</h2>
            <img className={Styles.gif} alt="Cargando..." src={gif} />
            </div>
            // <h1>Cargando...</h1>
        }

        </div>
    )
}
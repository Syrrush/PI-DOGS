import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { addDog, getTemperament, getDogs } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./NewDog.module.css"


export default function FormularioControlado(){
const dispatch = useDispatch()
const temperamentos = useSelector((state) => state.temperaments)
const dogs = useSelector((state) => state.allDogs)
let navigate = useNavigate()
useEffect(() => {
    dispatch(getTemperament());
    dispatch(getDogs())
},[dispatch])

    const [input,setInput] = useState({
        nombre: "",
        altura_minima:"",
        altura_maxima:"",
        peso_minimo:"",
        peso_maximo:"",
        esperanza_vida_minima:"",
        esperanza_vida_maxima:"",
        image:"",
        familia:"",
        temperaments:[]
        
    })
  const [errores, setErrores] = useState({
      nombre: "No hay informacion de la Raza"
  })

  function handleSubmit(e){
      e.preventDefault();
      dispatch(addDog({nombre:input.nombre,
         altura: `${input.altura_minima} - ${input.altura_maxima}`, 
         peso:`${input.peso_minimo} - ${input.peso_maximo}`, 
         life_span: `${input.esperanza_vida_minima} - ${input.esperanza_vida_maxima}`, 
         image: input.image ? input.image : "https://holatelcel.com/wp-content/uploads/2020/09/cheems-memes-9.jpg" , 
         familia_de_raza: input.familia, 
         temperament: input.temperaments}))
      alert("Perrito creado")
      setInput({nombre: "",
      altura_minima:"",
      altura_maxima:"",
      peso_minimo:"",
      peso_maximo:"",
      esperanza_vida_minima:"",
      esperanza_vida_maxima:"",
      image:"" ,
      familia_de_raza:"",
      temperaments:[]})
      navigate("../home", {replace:true})
  }
 
  
  function handleDelete(e){
      setInput({
          ...input,
          temperaments: input.temperaments.filter(x=> x !== e)
        })
    }
    
    function validacionDelFormulario(input){
        
        let errores = {}

        if(!input.nombre) errores.nombre = 'No hay informacion de la Raza'
        if(input.nombre.length < 3 || input.nombre.length > 50) errores.nombre = "El nombre debe tener mínimo tres carácteres  y como máximo 50"
        if(!/^[A-Za-z\s']+$/.test(input.nombre)){
            errores.nombre = "El nombre solo acepta letras, apóstrofes y espacios"
        }
        if(dogs.find(x=> x.nombre.toLowerCase() === input.nombre.toLowerCase().replace(/\s\s+/g, ' ').trim())) errores.nombre = "No puedes llamar a tu raza igual que otra ya existente"
        
        if(input.altura_minima){
            if(!input.altura_minima) errores.altura_minima = 'No hay información de la altura mínima'
            else if(!/^[0-9-e]+$/.test(input.altura_minima) || Number(input.altura_minima <= 0)){
                errores.altura_minima= "La altura mínima debe ser un número mayor a 0"
            }
        }
        

        if(!input.altura_maxima) errores.altura_maxima = 'no hay información de la altura máxima'
        else if(!/^[0-9]+$/.test(input.altura_minima) || Number(input.altura_minima <= 0)){
            errores.altura_maxima= "La altura máxima debe ser un número mayor a 0"
        } else if(Number(input.altura_minima) >= Number(input.altura_maxima)){
            errores.altura_maxima= "La altura máxima debe ser mayor a la altura mínima"
        }

        if(!input.peso_minimo) errores.peso_minimo = 'no hay información del peso mínimo'
        else if(!/^[0-9]+$/.test(input.peso_minimo) || Number(input.peso_minimo <= 0)){
            errores.peso_minimo= "El peso mínimo debe ser un número mayor a 0"
        }
        // if(input.peso_minimo.includes("e")) errores.peso_minimo = 'Solo se admiten numeros'

        if(!input.peso_maximo) errores.peso_maximo = 'no hay información del peso máximo'
        else if(!/^[0-9]+$/.test(input.peso_maximo) || Number(input.peso_maximo <= 0)){
            errores.peso_maximo= "El peso máximo debe ser un número mayor a 0"
        } else if(Number(input.peso_minimo) >= Number(input.peso_maximo)){
            errores.peso_maximo= "El peso máximo debe ser mayor al peso mínimo"
        }
        
        if(!input.esperanza_vida_minima) errores.esperanza_vida_minima = 'No hay información de los años de vida minimos'
        else if((!/^[0-9]+$/.test(input.esperanza_vida_minima)) || Number(input.esperanza_vida_minima <= 0)){
            errores.esperanza_vida_minima= "La esperanza de vida mínima debe ser un número mayor a 0"
        }

        if(!/^[A-Za-z\s']+$/.test(input.familia_de_raza) && input.familia_de_raza){
            errores.familia_de_raza = "La familia solo acepta letras, apóstrofes y espacios"
        }

        if((input.temperaments.length < 1)) errores.temperaments = "Coloque al menos dos temperamentos"
        
        if(!input.esperanza_vida_maxima) errores.esperanza_vida_maxima = 'no hay información de los años de vida maximos'
        else if(!/^[0-9]+$/.test(input.esperanza_vida_maxima) || Number(input.esperanza_vida_maxima <= 0)){
            errores.esperanza_vida_maxima= "La esperanza de vida máxima debe ser un número mayor a 0"
        } else if(Number(input.esperanza_vida_minima) >= Number(input.esperanza_vida_maxima)){
            errores.esperanza_vida_maxima= "La esperanza de vida máxima debe ser mayor al peso mínimo"
        }

        // if(!input.imagen) errores.imagen = 'no hay información del imagen'
        if(!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image) && input.image){
            errores.image= "Debe insertar una URL de imagen valida o dejar el espacio vacio"
        }

        return errores

  }


  function handleInputChange(evento){
         setInput({
              ...input,
              [evento.target.name]: evento.target.value
        } )
        setErrores(validacionDelFormulario({
              ...input,
              [evento.target.name]: evento.target.value
        }))  
  }
  function handleSelect(e){
      if(e.target.value.length>0){
      setInput({
          ...input,
          temperaments: input.temperaments.includes(e.target.value) ? [...input.temperaments] : [...input.temperaments, e.target.value]
      })} else {
          setInput({
              ...input,
              temperaments: [...input.temperaments]
          })
      }
      setErrores(validacionDelFormulario({
          ...input,
          [e.target.name]: e.target.value
    }))  
  
  }
  

  return(
      <div className={Styles.container} >
                <Link to="/home"><button className={Styles.inputEnviar}>Volver</button></Link>
                <h1 className={Styles.titulo}>Crea una nueva raza de perritos</h1>
                <form onSubmit={(e) => handleSubmit(e)}>

                <label className={Styles.labels}> Raza </label>
                <input className={Styles.inputs} onChange={(e)=> handleInputChange(e)}  type='text' value={input.nombre} name='nombre' required />
                { errores && errores.nombre ? <p className={Styles.errores}> { errores.nombre }  </p> : null    }
                  
                <br/>
                <label className={Styles.labels}> Peso mínimo </label>
                <input className={Styles.inputs} onChange={(e)=> handleInputChange(e)} type='number' value={input.peso_minimo} name='peso_minimo' required/>
                {  errores && errores.peso_minimo ? <p className={Styles.errores}> { errores.peso_minimo }  </p> : null    }
                <br/>
                <label className={Styles.labels}> Peso máximo  </label>
                <input className={Styles.inputs} onChange={(e)=> handleInputChange(e)} type='number' value={input.peso_maximo} name='peso_maximo' required/>
                {  errores && errores.peso_maximo ? <p className={Styles.errores}> { errores.peso_maximo }  </p> : null    }
                  

                <br/>
                <label className={Styles.labels}>Familia de Raza</label>
                <input className={Styles.inputs} onChange={(e)=> handleInputChange(e)} type='text' value={input.familia_de_raza} name='familia' />
                { errores && errores.familia_de_raza ? <p className={Styles.errores}> { errores.familia_de_raza }  </p> : null    }
                   

                <br/>
                <label className={Styles.labels}> Altura mínima </label>
                <input className={Styles.inputs} onChange={(e)=> handleInputChange(e)} type='number' value={input.altura_minima} name='altura_minima' required/>
                {  errores && errores.altura_minima ? <p className={Styles.errores}> { errores.altura_minima }  </p> : null    }
                <br/>
                <label className={Styles.labels}> Altura máxima </label>
                <input className={Styles.inputs} onChange={(e)=> handleInputChange(e)} type='number' value={input.altura_maxima} name='altura_maxima' required/>
                {  errores && errores.altura_maxima ? <p className={Styles.errores}> { errores.altura_maxima }  </p> : null    }
                   
                <br/>
                <label className={Styles.labels}> Esperanza de vida mínima </label>
                <input className={Styles.inputs} onChange={(e)=> handleInputChange(e)} type='number' value={input.esperanza_vida_minima} name='esperanza_vida_minima' required/>
                {   errores && errores.esperanza_vida_minima ? <p className={Styles.errores}> { errores.esperanza_vida_minima }  </p> : null    }
                <br/>
                <label className={Styles.labels}> Esperanza de vida máxima </label>
                <input className={Styles.inputs} onChange={(e)=> handleInputChange(e)} type='number' value={input.esperanza_vida_maxima} name='esperanza_vida_maxima' required/>
                {   errores && errores.esperanza_vida_maxima ? <p className={Styles.errores}> { errores.esperanza_vida_maxima }  </p> : null    }
                <br/>

                <label className={Styles.labels}> Temperamentos </label>
                <select onChange={(e) => handleSelect(e)} type="text">
                       <option value={null}></option>
                    {
                        temperamentos?.map((temperament,id) => {
                            return(
                                <option key={id} value={temperament}>{temperament}</option>
                            )
                        })
                    }
                </select>
                <ul><li className={Styles.labels}>{
                             input.temperaments?.map(x=>x + " ")   }</li></ul>
                             <div>
                    {errores && errores.temperaments ? <p className={Styles.errores}> {errores.temperaments}  </p> : null    }
                <p className={Styles.labels}>Has seleccionado estos:</p>
                
                {input.temperaments?.map(e => {
                    return(
                            <ul key={e}>
                                <li className={Styles.labels}>{e}</li>
                                <button onClick={() =>handleDelete(e)}>X</button>
                            </ul>
                        )
                        })}
                </div>
                <br/>
                <label className={Styles.labels}> Imagen </label>
                <input className={Styles.inputs} onChange={(e)=> handleInputChange(e)} type='text' value={input.image} name='image'/>
                {   errores && errores.image ? <p className={Styles.errores}> { errores.image }  </p> : null    }
                    <br/>
                <input className={Styles.inputEnviar} type='submit' name='submit' disabled = { Object.keys(errores).length === 0 ? false : true  }  />
                <br/>
                </form>
            </div>      

  )
}

// disabled = { Object.keys(errores).length === 0 ? false : true  }
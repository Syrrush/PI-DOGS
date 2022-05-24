const axios = require("axios");
const { Dog, Temperament } = require("../db.js")
const { API_DOGS } = require("../Utils/Globals.js");

const getDogsApi = async () => {
    try{
        const dogs = await axios.get(`${API_DOGS}`)
        const dogsInfo = dogs.data.map(el => {
            return {
                id : el.id,
                nombre: el.name,
                esperanza_vida: el.life_span,
                familia_de_raza: el.breed_group ? el.breed_group : "Solitario :c",
                image: el.image.url,
                peso: el.weight.metric === "NaN" ? "50 - 51" : el.weight.metric,
                altura: el.height.metric,
                temperament: el.temperament
            }
        })
        return dogsInfo
    } catch (e){
        console.log(e.message)
    }
}

const getDogsDb = async () => {
    try{
        const dogsDb = await Dog.findAll({
            include:{
                model: Temperament,
                attributes: ['nameTemperament'],
                throught: {
                    attributes: []
                }
            }
        })
        const dogsDbInfo = await dogsDb.map(x=> x.dataValues);
        return await dogsDbInfo
    } catch(e){
        console.log(e.message)
    }
}

const getAllDogs = async () =>  {
    try{
        let dogsApi = await getDogsApi()
        let dogsInDb = await getDogsDb()
        
        let allDogs = dogsApi.concat(dogsInDb);
            return allDogs.sort()
        }catch(e){
            console.log(e.message)
        }
    }

    // Función para que los parametros a comparar, sean iguales.
    const Legible = (name) => {
        if(typeof name == "number") {
            return name.toString()
           }
        let nombre = name.replace(/['"]+/g, '').toLowerCase().trim()
        return nombre
    }

    const getDogByName = async (name)  => {
        try{
            let nombre = await Legible(name)
            if(nombre.length < 3) throw new Error("Amiwo, poné al menos 3 carácteres")
            let allDoggies = await getAllDogs()
            let byName = await allDoggies.filter(x=> Legible(x.nombre).includes(nombre))
            if (byName.length){
                return byName
            }  else {
                throw new Error("Ño esta wey")
            }
        } catch (e){
            console.log(e.message)
        }
    }


    const getDogByIdRaza = async (id)  => {
            let allDogs = await getAllDogs()
            let paramId = Legible(id)
            let byId = await allDogs.filter(x=> x.id == paramId)
                if(byId.length) {
                   return byId
                }  else {
                 throw new Error("Ño esta wey") 
                }
    }

const getTemperament = async() => {
    try{
        let allDogs = await getDogsApi()
        let Alltemperaments = allDogs.map(x=>x.temperament).toString().split(",")
        Alltemperaments.forEach(x=>{
            Temperament.findOrCreate({
              where: {nameTemperament: x.trim()}
            })
        })
        const temperamentsDB = await Temperament.findAll()
        const mapeados = temperamentsDB.map(x=>x.nameTemperament)
        return mapeados
    }catch (e) {
        console.log(e.message)
    }
}

const orderByName = async () => {
    try{
        let allDogs = await getAllDogs()
        let doggies = allDogs.sort((a,b) => {
            const nombreA = a.nombre.toLowerCase()
            const nombreB = b.nombre.toLowerCase() 
            if(nombreA > nombreB) return -1
            if(nombreA < nombreB) return 1
            return 0
           })
           return doggies
    } catch (e){
        console.log(e.message)
    }
}

    module.exports = {
        getDogsApi,
        getDogsDb,
        getAllDogs,
        getDogByName,
        Legible,
        getDogByIdRaza,
        getTemperament,
        orderByName
}
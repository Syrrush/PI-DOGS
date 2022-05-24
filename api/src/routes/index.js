const { Router } = require('express');
const {getDogsApi,getDogsDb, getAllDogs,  getDogByName, getDogByIdRaza, getTemperament, orderByName} = require("../Controllers/Controller.js");
const { Dog, Temperament } = require("../db.js")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", async (req,res) => {
    let {name} = req.query
    // let nombre = await name.toLowerCase().trim()
    if(name){
        try{
            res.status(200).json(await getDogByName(name))
        } catch (e){
            res.status(404).send(e.message)
        }
    } else {
            res.status(200).send(await getAllDogs())
    }
});

router.get("/dogs/:id", async (req,res) => {
    let {id} = req.params
    try{
        if(id)
    res.status(200).json(await getDogByIdRaza(id))
    } catch (e) {
        res.status(404).send(e.message)
    }
});


router.get("/temperament", async (req,res) => {
    try{
        res.status(200).send(await getTemperament())
    } catch (e) {
        res.status(404).send(e.message)
    }
});


router.post("/dog", async (req,res) => {
   const {nombre, altura, peso, life_span, familia, image, createdInDb, temperament} = req.body
   let allTemperaments = await getTemperament();
   try{
    let dogCreation = await Dog.create ({
        nombre,
        altura,
        peso,
        life_span,
        familia,
        image,
        createdInDb
    })
    let temperamentDb = await Temperament.findAll({
        where: {nameTemperament : temperament}
    })
    await dogCreation.addTemperament(temperamentDb)
    res.send("personaje creado con exito")
   }catch (e){
    res.status(404).send(e.message)
   }
})

router.get("/ordenados" , async (req,res) => {
    try{
        const dogs = await orderByName()
        res.status(200).send(await dogs)
    } catch (e){
        res.status(404).send(e.message)
    }
})

module.exports = router;

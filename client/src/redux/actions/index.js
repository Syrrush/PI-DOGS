import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT"
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT"
export const FILTER_WEIGHT = "FILTER_WEIGHT"
export const FILTER_NAME = "FILTER_NAME"
export const ADD_DOG = "ADD_DOG"
export const FILTER_CREATED = "FILTER_CREATED"
export const DOG_DETAIL = "DOG_DETAIL"
export const CLEANER = "CLEANER"
export const SEARCH_NAME = "SEARCH_NAME"


export const getDogs = () => {
    return async function(dispatch){
        try{
            const dogs = await axios.get("http://localhost:3001/dogs")
            return dispatch({
                type: GET_DOGS,
                payload: dogs.data,
            });
        }   catch (e){
            console.error("Error in the action getDogs:", e.message)
            }
    }
}

export const getTemperament = () => {
    return async function(dispatch){
        try{
            const temperaments = await axios.get("http://localhost:3001/temperament")
            return dispatch({
                type: GET_TEMPERAMENT,
                payload: temperaments.data
            });
        } catch(e){
            console.error("Error in the action getTemperament:", e.message)
        }
    }
}

export const filterByTemperament = (payload) => {
    return async function(dispatch){
        try{
            return dispatch({
                type: FILTER_TEMPERAMENT,
                payload
            })
        } catch(e){
            console.error("Error in the action filterByTemperament:", e.message)
        }
    }
}


export const filterByWeight = (payload) => {
    return async function(dispatch) {
        try{
            return dispatch({
                type: FILTER_WEIGHT,
                payload
            })
        } catch(e){
            console.error("Error in the action filterByWeight:", e.message)
        }
    }
}


export const filterByName = (payload) => {
    return async function(dispatch){
        try{
            return dispatch({
                type: FILTER_NAME,
                payload
            })
        } catch(e){
            console.error("Error in the action filterByName:", e.message)
        }
    }
}

export const addDog = (payload) => {
    return async function(dispatch){
        try{
            const newDog = axios.post("http://localhost:3001/dog", payload)
            return newDog 
        } catch(e){
            console.error("Error in the action addDog:", e.message)
        }
    } 
}

export const filterByCreated = (payload) => {
    return async function(dispatch){
        try{
            return dispatch({
                type: FILTER_CREATED,
                payload
            })
        } catch(e){
            console.error("Error in the action filterByCreated:", e.message)
        }
    }
}
export const getDogDetail = (id) => {
    return async function(dispatch){
        try{
            let dogInfo = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: DOG_DETAIL,
                payload: dogInfo.data
            })
        } catch(e){
            console.error("Error in the action getDogDetail:", e.message)
        }
    }
}
export const cleaner = () => {
    return function(dispatch){
        try{
            return dispatch({
                type: CLEANER,
                payload: []
            })
        } catch(e){
            console.error("Error in the action cleaner:", e.message)
        }
    }
}

export const searchByName = (payload) => {
    return async function(dispatch){
        try{
            let dogsFinded = await axios.get("http://localhost:3001/dogs?name=" + payload)
            return dispatch({
                type: SEARCH_NAME,
                payload: dogsFinded.data
            })
        } catch(e){
            console.error("Error in the action searchByName:", e.message)
        }
    }
}
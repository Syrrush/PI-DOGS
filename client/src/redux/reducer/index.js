import {GET_DOGS,
    GET_TEMPERAMENT,
    FILTER_TEMPERAMENT,
    FILTER_WEIGHT,
    FILTER_NAME,
    ADD_DOG,
    FILTER_CREATED,
    DOG_DETAIL,
    CLEANER,
    SEARCH_NAME} from "../actions/index.js"

const initialState = {
    dogs: [],
    allDogs: [],
    weight: [],
    temperaments: [],
    detalles: [],
}

function rootReducer(state=initialState, action) {
    switch (action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            };
            case FILTER_NAME:
                let DogsOrdenados = [...state.dogs];
                 action.payload === "Ascendente"
                ? DogsOrdenados.sort((a,b) => {
                    const nombreA = a.nombre.toLowerCase()
                    const nombreB = b.nombre.toLowerCase() 
                    if(nombreA < nombreB) return -1
                     if(nombreA > nombreB) return 1
                     return 0
                   })
                :  DogsOrdenados.sort((a,b) => {
                    const nombreA = a.nombre.toLowerCase()
                    const nombreB = b.nombre.toLowerCase() 
                    if(nombreA > nombreB) return -1
                     if(nombreA < nombreB) return 1
                     return 0
                   });
                return {
                    ...state,
                    dogs: DogsOrdenados
                };
            case GET_TEMPERAMENT: 
            return{
                ...state,
                temperaments: action.payload
            };
            case FILTER_TEMPERAMENT:
                const allDoggies = [...state.allDogs];
                const temperamentFiltered = action.payload === "Temperamentos"
                 ? allDoggies 
                 : allDoggies.filter(dog=> dog.temperament 
                ? dog.temperament.includes(action.payload) 
                : dog.temperaments && (dog.temperaments.map((x) => x.nameTemperament.concat(" "))).join(", ").includes(action.payload))
            return {
                ...state,
                dogs: temperamentFiltered
            };

            case FILTER_WEIGHT: 
            const allDogs = state.dogs;
            const weightFiltered = action.payload === "Ascendente"
            ? allDogs.sort((a,b) => {
                const pesoA = Number(a.peso.split("-")[0])
                const pesoB = Number(b.peso.split("-")[0])
                if(pesoA < pesoB) return -1
                if(pesoA > pesoB) return 1
                return 0
            })
            : allDogs.sort((a,b) => {
                const pesoA = a.peso.split("-")
                const pesoB = b.peso.split("-")
                if(pesoA.length < 2 && pesoB.length < 2){
                    if(Number(pesoB) < Number(pesoA)) return -1
                    if(Number(pesoB) > Number(pesoA)) return 1
                    return 0
                } 
                if(pesoA.length < 2){
                    if(Number(pesoB[1]) < Number(pesoA)) return -1
                    if(Number(pesoB[1]) > Number(pesoA)) return 1
                    return 0
                }
                if(pesoB.length < 2){
                    if(Number(pesoB) < Number(pesoA[1])) return -1
                    if(Number(pesoB) > Number(pesoA[1])) return 1
                    return 0
                }
                    if(Number(pesoB[1]) < Number(pesoA[1])) return -1
                    if(Number(pesoB[1]) > Number(pesoA[1])) return 1
                    return 0
            })
            return {
                ...state,
                dogs: weightFiltered
            };
            case ADD_DOG:
                return {
                    ...state
                };
                case DOG_DETAIL:
                    return {
                        ...state,
                        detalles: action.payload
                    };
                    case CLEANER:
                        return{
                            ...state,
                            detalles: action.payload
                        };
                        case SEARCH_NAME:
                            return{
                                ...state,
                                dogs: action.payload
                            }
                    case FILTER_CREATED:
                    let losPerritos = state.allDogs
                    let filtrados = action.payload === "dogsDb" ? losPerritos.filter(x=> (x.id).toString().length > 10) : losPerritos.filter(x=> (x.id).toString().length < 10)
                    return {
                        ...state,
                        dogs: filtrados
                    }
            default:
                return state;
    }
}
export default rootReducer;
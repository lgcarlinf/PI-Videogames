import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        const json = await axios('http://localhost:3001/videogame')
        return dispatch({
            type:'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}

export function getNameVideogames(name){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/videogame?name=${name}`)
            return dispatch({
                type: 'GET_NAME_VIDEOGAMES',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByRating(payload){
    return{
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function getDetails(payload){
    return async function (dispatch){
        try {
            const json  = await axios.get('http://localhost:3001/videogame/'+payload)
            return dispatch({
                type:'GET_DETAILS',
                payload: json.data
            }

            )
        } catch (error) {
            console.log(error)
        }
  
    }
}

export function getGenres(){
    return async function(dispatch){
        const json = await axios('http://localhost:3001/genres')
        return dispatch({
            type:'GET_GENRES',
            payload: json.data
        })
    }
}

export function orderByGenre(payload){
    return{
        type: 'ORDER_BY_GENRE',
        payload
    }
}

export function orderByCreated(payload){
    return{
        type: 'ORDER_BY_CREATED',
        payload
    }

}

export function postVideogame(payload){
    return async function(dispatch){
        try {
            const json = await axios.post('http://localhost:3001/videogame', payload)
            return dispatch({
                type: 'POST_VIDEOGAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
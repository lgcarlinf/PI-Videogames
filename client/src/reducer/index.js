
const initialState = {
    allVideogames:[],
    videogames:[],
    details:[],
    genres:[],
    loader: true

}

function rootReducer (state=initialState,action){

    switch(action.type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        
        case 'GET_NAME_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload
            }
        
        case 'ORDER_BY_NAME':
            let nameFiltered =
            action.payload === 'A-Z'
              ? state.videogames.sort((a, b) => {
                  if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                  }
                  if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return -1;
                  }
                  return 0;
                })
              : state.videogames.sort((a, b) => {
                  if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                  }
                  if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return 1;
                  }
                  return 0;
                });


            return{
                ...state,
                videogames : nameFiltered
            }

        case 'ORDER_BY_RATING':
            let ratingFiltered =
            action.payload === "Lower Score"
              ? state.videogames.sort((a, b) => a.rating - b.rating)
              : state.videogames.sort((a, b) => b.rating - a.rating);
          return{
              ...state,
              videogames: ratingFiltered
          } 
          
        case 'GET_DETAILS':
          return {
            ...state,
            details: action.payload,
          }
        
        case 'GET_GENRES':
          const genres = action.payload.map(g=>g.name)
          return{
            ...state,
            genres
          }

        case 'ORDER_BY_GENRE':
          const games= state.allVideogames
        
           const filterGender = games.filter(v=> v.genre ? v.genre.includes(action.payload) === true : 'none') 
        
          return{
            ...state,
            videogames: filterGender
          } 

        case 'ORDER_BY_CREATED':
          const allgames = state.allVideogames
          const filterDb = action.payload === 'ALL' ? allgames : allgames.filter(g=> g.create === true)
          
          return{
            ...state,
            videogames : filterDb
          }

        default: return state
    }

}

export default rootReducer


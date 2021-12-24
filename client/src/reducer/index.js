
const initialState = {
    allvideogames:[],
    videogames:[],
    details:[],
    loader: true

}


function rootReducer (state=initialState,action){

    switch(action.type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload,
                allvideogames: action.payload
            }
        
        case 'GET_NAME_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload
            }
        
        case 'ORDER_BY_NAME':
            let nameFiltered =
            action.payload == 'A-Z'
              ? state.videogames.sort((a, b) => {
                  if (a.name > b.name) {
                    return 1;
                  }
                  if (b.name > a.name) {
                    return -1;
                  }
                  return 0;
                })
              : state.videogames.sort((a, b) => {
                  if (a.name > b.name) {
                    return -1;
                  }
                  if (b.name > a.name) {
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
        

        default: return state
    }

}

export default rootReducer


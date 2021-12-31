const axios= require('axios');
const { Videogame,Genero } = require("../db");
require('dotenv').config();
const {KEY} = process.env;

/* const getApiInfoNextPages = async ()=>{

    try {
        let promises = [2,3,4,5].map(async (e)=> await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page=${e}`) )
  
        response = await Promise.all(promises)
        response = response.reduce( 
            (prev,curr) => {
                return prev.concat(curr.data.results);
            },[]
            
        );
        
        const data = response.map(game=>{
            return{
                id: game.id,
                name: game.name,
                date: game.released,
                img: game.background_image,
                genre :  game.genres.map(gen=>gen.name),   
                rating: game.rating,
                platform : game.platforms.map(p=>p.platform.name) 
            }
        })

        return data
    } catch (error) {
        console.log(error)
    }
   
} */

const getApiInfo = async ()=>{
    
    const apiUrlOne = await axios.get(`https://api.rawg.io/api/games?key=${KEY}`)
    const apiUrlTwo = await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page=2`)
    const apiUrlThree = await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page=3`)
    const apiUrlFour = await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page=4`)
    const apiUrlFive = await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page=5`)

    let dat = await Promise.all([apiUrlOne,apiUrlTwo,apiUrlThree,apiUrlFour,apiUrlFive])
    let games = dat[0].data.results.concat(dat[1].data.results).concat(dat[2].data.results).concat(dat[3].data.results).concat(dat[4].data.results)

     const apiInfo = games.map((game)=>{
        
        return{
            id:game.id,
            name: game.name,
            date: game.released,
            img: game.background_image,
            genre : game.genres.map(g=>g.name), 
            rating: game.rating,
            platform : game.platforms.map(p=>p.platform.name)

        }
    }) 
    return apiInfo

}

const getDbInfo = async () =>{
    return await Videogame.findAll({
        include:{
            model:Genero          
        }
    })
}

module.exports={


    getDbInfo : async () =>{
        return await Videogame.findAll({
            include:{
                model:Genero          
            }
        })
    },

  getAllVideoGames: async ()=>{
    const apiInfo  = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);

    return infoTotal
},

 getVideoGameById : async (idVideogame)=>{
    try {
        const apiInfo = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${KEY}`)
        const videogame = apiInfo.data

        return  {
                id:videogame.id,
                name: videogame.name,
                description: videogame.description_raw,
                date: videogame.released,
                img: videogame.background_image,
                genre : videogame.genres.map(g=>g.name), 
                rating: videogame.rating,
                platform : videogame.platforms.map(p=>p.platform.name) 
    
            }
        
       
    } catch (error) {
        return null
    }   
} 

}
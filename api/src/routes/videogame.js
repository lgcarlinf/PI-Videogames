const axios= require('axios');

require('dotenv').config();
const {KEY} = process.env;
const { Router } = require("express");
const router = Router();
const { Videogame,Genero } = require("../db");

const getApiInfoNextPages = async ()=>{
    let infoNextPages = []
    for(let i=2;i<=5;i++){
        let apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page=${i}`)
        const apiJson = apiUrl.data
        const apiInfo = await apiJson.results.map((game)=>{
             
            return{
                id: game.id,
                name: game.name,
                date: game.released,
                img: game.background_image,
                genre : game.genres.map(g=>g.name), 
                rating: game.rating,
                platform : game.platforms.map(p=>p.platform.name)

            }
        })
        infoNextPages= infoNextPages.concat(apiInfo)
    }
    
    return infoNextPages
}

const getApiInfo = async ()=>{
    
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${KEY}`)
        const apiJson = apiUrl.data
         const apiInfo = await apiJson.results.map((game)=>{
            
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

 const getAllVideoGames = async ()=>{
    const apiInfo  = await getApiInfo();
    const getInfoNextPages = await getApiInfoNextPages();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo).concat(getInfoNextPages);
    return infoTotal
}

const getVideoGameById = async(idVideogame)=>{
    try {
        const apiInfo = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${KEY}`)
        const videogame = apiInfo.data

        return  {
                id:videogame.id,
                name: videogame.name,
                description: videogame.description,
                date: videogame.released,
                img: videogame.background_image,
                genre : videogame.genres.map(g=>g.name), 
                rating: videogame.rating,
                platform : videogame.platforms.map(p=>p.platform.name) 
    
            }
        
       
    } catch (error) {
        return {msg:'no se encontro el id enviado'}
    }   
} 


router.get('/',async (req,res)=>{
    try {
      const name = req.query.name
      const videogamesTotal = await getAllVideoGames()
      if(name){
          let videogamesName = await videogamesTotal.filter(v=>v.name.toLowerCase().includes(name.toLowerCase()))
        return  videogamesName.length ? res.json(videogamesName):
          res.json({msg:'No se encuentra el videojuego'})
      }
        return res.json(videogamesTotal)
      
      
    } catch (error) {
         console.log(error) 
    }
})

router.get('/:idVideogame',async (req,res)=>{
   try {
     
        const idVideogame = req.params.idVideogame
       if(idVideogame){
        
        const videogameApi = await getVideoGameById(idVideogame)
        const videogameDb = Videogame.findOne({
            where: {
                id: idVideogame,
              }
        })
        const videogame = [videogameApi,videogameDb]
        return res.json( videogameApi )
       }
        return res.json('No se encontro el id del videojuego')
      
   } catch (error) {
       console.log(error)
   }


}) 

router.post('/',async(req,res)=>{
    try {
        const {name,description,date,rating,platform,genero}= req.body

        const createVideogame = await Videogame.create({
            name,
            description,
            date,
            rating,
            platform
        })

        await createVideogame.setGeneros(genero)
        res.json({msg:'se creo exitosamente'})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
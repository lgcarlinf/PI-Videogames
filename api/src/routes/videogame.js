const axios= require('axios');

require('dotenv').config();
const {KEY} = process.env;
const { Router } = require("express");
const { restart } = require('nodemon');
const router = Router();
const { Videogame,Genero } = require("../db");
const{getAllVideoGames,getVideoGameById,getDbInfo} =require('../routes/controllers')

router.get('/',async (req,res)=>{
    try {
      const name = req.query.name
      const videogamesTotal = await getAllVideoGames()
      if(name){
          const gamesDb = await getDbInfo();
          let videogamesName = await videogamesTotal.filter(v=>v.name.toLowerCase().includes(name.toLowerCase()))
          if(videogamesName.length==''){
             videogamesName = gamesDb.filter(v=>v.name.toLowerCase().includes(name.toLowerCase()))
          }
        return /*  videogamesName.length ? */ res.json(videogamesName)/* :
          res.json({msg:'No se encuentra el videojuego'}) */
      }
        return res.json(videogamesTotal)
      
      
    } catch (error) {
       console.log(error)
       res.json('not found')
    }
})

router.get('/:idVideogame',async (req,res)=>{
   try {
     
        const idVideogame = req.params.idVideogame;
        const videogameApi = await getVideoGameById(idVideogame);
        if(videogameApi){
            return res.json(videogameApi)
        }else{
            const videogameDb = await Videogame.findOne({
                where: {
                    id:idVideogame
                },
                include:{
                    model: Genero
                }
            }) 
            return res.json(videogameDb)
        }
       
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

        await createVideogame.addGeneros(genero)
        res.json({msg:'se creo exitosamente'})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
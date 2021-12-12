const axios= require('axios');
const { json } = require('body-parser');
const { Router } = require("express");
const router = Router();
require('dotenv').config();
const {KEY} = process.env;
const { Genero } = require("../db");


const getGenres = async ()=>{
    const json = await axios(`https://api.rawg.io/api/genres?key=${KEY}`)
    const genres = json.data.results.map(g=> {
        return {name:g.name}}
        )
    const  genresDb = await Genero.findAll()
    if(genresDb.length==0){
        await Genero.bulkCreate(genres)
    }
    return genres
} 


router.get('/',async(req,res)=>{
   try {
       const genres = await getGenres()
       
    return res.json(genres)
   } catch (error) {
       console.log(error)
   }
})




module.exports = router;
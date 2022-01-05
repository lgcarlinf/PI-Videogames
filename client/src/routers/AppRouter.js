import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { Form } from '../components/Form/Form'
import { LandingPage } from '../components/LandingPage/LandingPage'
import { MainApp } from '../components/MainApp/MainApp'
import { Videogame } from '../components/Videogame/Videogame'


export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/videogame' element={<MainApp/>}></Route>
            <Route path='/videogame/:id' element={<Videogame/>}></Route>
            <Route path='/create' element={<Form/>}></Route>
        </Routes>
    )
}

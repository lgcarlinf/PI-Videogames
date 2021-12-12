import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { LandingPage } from '../components/LandingPage/LandingPage'
import { MainApp } from '../components/MainApp/MainApp'


export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/videogame' element={<MainApp/>}></Route>
        </Routes>
    )
}

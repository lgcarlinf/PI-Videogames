import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import { getNameVideogames } from '../../actions';

import styles from '../SearchBar/SearchBar.module.css'

export const SearchBar = () => {

    const dispatch = useDispatch()
    const [name,setName]=useState('')

    const handleInputChange = (e)=>{
        e.preventDefault()
        setName(e.target.value)
        
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(name)
        dispatch(getNameVideogames(name)) 
        setName('')
    }

    return (
        <div className={styles.containerSearch}>
            <input 
            className={styles.search}
            type="text" 
            placeholder='SEARCH'
            onChange= {(e)=>handleInputChange(e)}
            value={name}
            />
            <button className={styles.btn} type='submit' onClick={(e)=> handleSubmit(e)}>
            <i className={`${styles.icon} fas fa-search`}></i>
            </button>
           
        </div>
    )
}

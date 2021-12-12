import React from 'react'
import styles from '../MainApp/MainApp.module.css'
import logo from '../../assets/logomain.png'
import { SearchBar } from '../SearchBar/SearchBar'

export const MainApp = () => {
    return (
        <div className={styles.containerMain}>
            <div className={styles.sideBar}>
                <div className={styles.logo}>
                    <img className={styles.logoImg} src={logo} alt="Logo" />
                </div>
                <div className={styles.filters}>
                    <SearchBar/>
                    
                </div>
            </div>
            <div className={styles.main}>
            <h1>Main App</h1>
            </div>
           
        </div>
    )
}

import React from 'react'
import {Link} from 'react-router-dom'

import styles from './LandingPageRight.module.css'
import imgtext from '../../assets/h7-img-2.png'

export const LandingPageRight = () => {
    return (
        
             <div className={styles.right}>
                <div className={styles.containerRight}>
                <div className={styles.bgtext}>
                    <img className={styles.imgtext} src={imgtext} alt="imgtext" />
                    <h1> discover new videogames </h1>
                    <p><span>#</span>#OVERWOLD</p>
                </div>
                <div className={styles.description}>
                    <p>And we are gladly sharing our 500,000+ games, search, and machine learning recommendations with the world.</p>
                    <div className={styles.sociales}>
                        
                        <i className={`fab fa-twitter ${styles.icon}`}></i>
                        <i className={`fab fa-youtube ${styles.icon}`}></i>
                        <i className={`fab fa-twitch ${styles.icon}`}></i>
                    </div>
                </div>
                <div className={styles.border}>
                <Link to='/videogame' className={styles.button}>
                    ENTER NOW
                </Link>
                </div>
                
                </div>
           
            </div>
       
    )
}

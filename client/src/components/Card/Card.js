import React from 'react'
import styles from './Card.module.css'


export const Card = ({name,img,genre}) => {
   
    
    return (
        <div className={styles.card}>
        <img className={styles.img} src={img} alt="img not found" width="220px" height="140px"/>  
        <div className={styles.textCard}>
            <p>spring season 2022</p>
        <h3 >{name}</h3>
         <h5 >{genre.join('-')}</h5>
        </div>
    
    </div>
    )
}

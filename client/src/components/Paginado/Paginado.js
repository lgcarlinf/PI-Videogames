import React from 'react'
import styles from './Paginado.module.css'

export const Paginado = ({videogamesPerPage,allVideogames,paginado}) => {
    const pageNumbers = []

    for(let i=1;i<=Math.ceil(allVideogames/videogamesPerPage);i++){
        pageNumbers.push(i)
    }
    
    return (
        <nav className={styles.containerPaginate}>
        <ul className={styles.paginado}>
          
       
            {
                pageNumbers.map(number => (
                    
                    <li key={number} className={styles.pageItem}>
                        <a onClick={() => paginado(number)} className={styles.pageLink}>
                            {number}
                        </a>
                    </li>
                ))
            }
            
        </ul>
    </nav>
    )
}

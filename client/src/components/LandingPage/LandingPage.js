import React from 'react'

import { LandingPageRight } from './LandingPageRight'
import styles from './LandingPage.module.css'
import { LandingPageLeft } from './LandingPageLeft'

export const LandingPage = () => {
    return (
        <div className={styles.container}>
            <LandingPageLeft/>
           <LandingPageRight/>   
        </div>
    )
}

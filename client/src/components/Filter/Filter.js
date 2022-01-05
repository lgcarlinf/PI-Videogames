import React, { useState } from "react";
import styles from "./Filter.module.css";

export const Filter = ({nameFilter,filter,funtion}) => {
  const [isActive, setIsActive] = useState(false);

    const handleClickSelect = (e) =>{
        e.preventDefault()
        funtion(e)
        setIsActive(false)
    }

  return (
    <div className={styles.container}>
      <div className={styles.select}>
        <div className={styles.button}  onClick={(e) => setIsActive(!isActive)}>
        {nameFilter}
        </div>
        {isActive && (
          <div className={styles.options}>
               
           {
               filter.map((option,i)=>(
                <input type='button' key={i} onClick={handleClickSelect } value={option} className={styles.option}/>
               
               ))
               
           }
          </div>
        )}
      </div>
    </div>
  );

};

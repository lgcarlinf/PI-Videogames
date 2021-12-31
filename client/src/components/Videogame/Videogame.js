import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../actions";
import styles from "./Videogame.module.css";
import crown from "../../assets/crown.png";
import img from "../../assets/img-2.png";
import { Loader } from "../Loader/Loader";

export const Videogame = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, []);

  const myVideogame = useSelector((state) => state.details);

  const platform = myVideogame.platform
    ? myVideogame.platform.join(" - ")
    : " ";
  /*   let genres= myVideogame.genre ? 
  myVideogame?.genre.join(' - ') : myVideogame && myVideogame.Generos.map(gen=>gen.name) */

  return (
    <div className={styles.containerPage}>
      <Link to="/videogame" className={styles.btnBack}>
        <i className={`fas fa-arrow-left ${styles.back}`}></i>BACK
      </Link>
      <img src={crown} className={styles.imgCrown} alt="" />
      <div className={styles.containerImg}>
        <img
          className={styles.imgVideogame}
          src={myVideogame.img}
          alt="img-videogame"
        />
        <img className={styles.imgPhrase} src={img} alt="phrase" />
        <h1 className={styles.nameVideogame}>{myVideogame.name}</h1>
      </div>
      <div className={styles.info}>
        <h2>Information</h2>
        <div className={styles.numbers}>
          <div className={styles.rating}>
            <h4>RATING</h4>
            <p>{myVideogame.rating}</p>
          </div>
          <div className={styles.date}>
            <h4>DATE</h4>
            <p>{myVideogame.date}</p>
          </div>
          <div className={styles.generos}>
            <h4>GENRES</h4>
            <p>
              {" "}
              {myVideogame.Generos
                ? myVideogame?.Generos.map((gen, i) => (
                    <span key={i}>{gen.name} </span>
                  ))
                : myVideogame?.genre.map((gen, i) => (
                    <span key={i}>{gen}</span>
                  ))}{" "}
            </p>
          </div>
          <div className={styles.plataformas}>
            <h4>PLATFORMS</h4>
            <p>{platform}</p>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <h2>Description</h2>
        <p> {myVideogame.description}</p>
      </div>
      
    </div>
  );
};

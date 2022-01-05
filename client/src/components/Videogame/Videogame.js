import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../actions";
import styles from "./Videogame.module.css";
import crown from "../../assets/crown.png";
import img from "../../assets/img-2.png";



export const Videogame = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]);

  const myVideogame = useSelector((state) => state.details);

  const game = myVideogame
  console.log(myVideogame);
  const platform = game?.platform
    ? game?.platform.join(" - ")
    : " ";

  

  return (
    <div className={styles.containerPage}>
      <Link to="/videogame" className={styles.btnBack}>
        <i className={`fas fa-arrow-left ${styles.back}`}></i>BACK
      </Link>
      <img src={crown} className={styles.imgCrown} alt="" />
      <div className={styles.containerImg}>
        <img
          className={styles.imgVideogame}
          src={game.img ? game.img : "https://m.media-amazon.com/images/I/61-hTJfp3bL._SS500_.jpg"}
          alt=""
        />
        <img className={styles.imgPhrase} src={img} alt="phrase" />
        <h1 className={styles.nameVideogame}>{game?.name}</h1>
      </div>
      <div className={styles.info}>
        <h2>Information</h2>
        <div className={styles.numbers}>
          <div className={styles.rating}>
            <h4>RATING</h4>
            <p>{game?.rating}</p>
          </div>
          <div className={styles.date}>
            <h4>DATE</h4>
            <p>{game?.date}</p>
          </div>
          <div className={styles.generos}>
            <h4>GENRES</h4>
            <p>
            {game.genre?.map((genero) => ( 
              <span key={genero.id}>{genero+' '}</span>
            ))}
             
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
        <p> {game?.description}</p>
      </div>
    </div>
  );
};

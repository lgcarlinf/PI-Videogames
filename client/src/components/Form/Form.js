import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGenres, postVideogame } from "../../actions";
import styles from "./Form.module.css";

export const Form = () => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);

  const platforms = [
    "PlayStation 4",
    "PlayStation 5",
    "PC",
    "SEGA",
    "NINTENDO 64",
    "Nintendo Switch",
    "Xbox One",
    "Xbox 360",
    "Android",
    "IOS",
    "Linux"
  ];
  const [input, setInput] = useState({
    name: "",
    genero: [],
    rating: "",
    description: "",
    date: "",
    platform: []
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  const handleChange = (e) => {
    setInput({ 
        ...input,
         [e.target.name]: e.target.value 
        });
  };
 
  const handleGenreChange = (e) => {
    setInput({
        ...input,
        genero: [...input.genero, parseInt(e.target.value)],
      });
    };

    const handlePlatformChange = (e) => {
        setInput({
            ...input,
            platform: [...input.platform, e.target.value],
          });
        };

    const handleSubmit = (e) => {
        if(input.name === "" || input.rating === "" || input.description === "" || input.date === "" || input.platform.length === 0 || input.genero.length === 0){
          e.preventDefault();
          alert("Por favor, complete todos los campos");
            
        }else{
          e.preventDefault();
          dispatch(postVideogame(input));
          alert("Videojuego Creado");
  
          setInput({
            name: "",
            genero: [],
            rating: "",
            description: "",
            date: "",
            platform: []
          })
        }
 
    };

  return (
    <div className={styles.bg}>
      <Link className={styles.btnBack} to="/videogame">
        <i className="fas fa-arrow-left"></i> Back
      </Link>
      <div className={styles.containerForm}>
        <h1>CREATE A NEW VIDEOGAME!</h1>
        <form action="" className={styles.form} onSubmit={(e)=> handleSubmit(e)}>
          <div className={styles.name}>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              value={input.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.rating}>
            <label htmlFor="rating">Rating:</label>
            <input 
            id="rating" 
            name="rating"
            type="text" 
            value={input.rating}
            onChange={handleChange}
            
            />
          </div>
          <div className={styles.desc}>
            <label htmlFor="description">Description:</label>
            <textarea
            name="description"
            value={input.description}
            onChange={handleChange}
            ></textarea>
          </div>
          <div className={styles.date}>
            <label htmlFor="date">Release:</label>
            <input 
            type="date" 
            name="date" 
            id="date"
            value={input.date}
            onChange={handleChange}
            
            />
          </div>
          <div className={styles.genres}>
            <label htmlFor="">Genres:</label>
            <select className={styles.select} value={1} onChange={(e) => handleGenreChange(e)}>
              <option value={1}>--Select genres--</option>
              {allGenres.map((genre, i) => (
                <option key={i} value={i+1}>
                  {genre}
                </option>
              ))}
            </select>
            <ul>
            <li className={styles.lista}>{input.genero.map((el) => allGenres[el-1] + " ,")}</li>
          </ul>
          </div>
          <div className={styles.platforms}>
            <label htmlFor="platform">Platforms:</label>
            <select name="platform" value={1} id="platform" onChange={(e) => handlePlatformChange(e)}>
              <option value={1}>--Select Platforms--</option>
              {platforms.map((platf, i) => (
                <option key={i} value={platf}>
                  {platf}
                </option>
              ))}
            </select>
            <ul>
            <li className={styles.lista}>{input.platform.map((el) => el + " ,")}</li>
          </ul>
          </div>
          <button type="submit" className={styles.button}>
            Create Game
          </button>
        </form>
      </div>
    </div>
  );
};

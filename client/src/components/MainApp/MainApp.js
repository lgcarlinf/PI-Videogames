import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../MainApp/MainApp.module.css";
import logo from "../../assets/logomain.png";
import headerBg from "../../assets/headerimg.jpg";
import { SearchBar } from "../SearchBar/SearchBar";
import { getVideogames,orderByName, orderByRating,getGenres , orderByGenre,orderByCreated} from "../../actions";
import { Card } from "../Card/Card";
import { Link } from "react-router-dom";
import { Paginado } from "../Paginado/Paginado";
import { Loader } from "../Loader/Loader";
import { Filter } from "../Filter/Filter";


export const MainApp = () => {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);
  let loader = useSelector((state) => state.loader);
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);

  const [orden, setOrden] = useState("");
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogame = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );
  const alphabet = ["A-Z", "Z-A"];
  const rating = ["Lower Score", "Higher Score"];
  const db = ['ALL','Database']

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (allVideogames.length !== 0) {
    loader = false;
  }

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres())
  }, [dispatch]);

  const handleFilterName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleFilterRating = (e) => {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleFilterGenre = (e) => {
    e.preventDefault();
    dispatch(orderByGenre(e.target.value));
    setCurrentPage(1);
   
  }

  const handleFilterDb = (e) => {
    e.preventDefault();
    dispatch(orderByCreated(e.target.value));
    setCurrentPage(1);
   
  }

  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src={logo} alt="Logo" />
        </div>
        <div className={styles.filters}>
          <SearchBar />
          <Filter
            nameFilter={"Alphabetical Order"}
            filter={alphabet}
            funtion={handleFilterName}
          />
          <Filter
            nameFilter={"Rating"}
            filter={rating}
            funtion={handleFilterRating}
          />
          <Filter
            className={styles.filter}
            nameFilter={"Genres"}
            filter={allGenres}
            funtion={handleFilterGenre}
          />
          <Filter
            className={styles.filter}
            nameFilter={"Create in DB"}
            filter={db}
            funtion={handleFilterDb}
          />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.header}>
          <img className={styles.headerBg} src={headerBg} alt="" />
          <div className={styles.textHeader}>
            <p>Home / Videogames</p>
            <h1>Videogames HOME</h1>
            <div className={styles.barra}> </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.tittle}>
            <h2>All Videogames</h2>
          </div>
          <Paginado
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginado={paginado}
          />
          <div className={styles.containerCards}>
            {loader ? (
              <Loader />
            ) : (
              currentVideogame.map((game) => {
                return (
                  <div className={styles.bg} key={game.id}>
                    <Link
                      className={styles.textLink}
                      to={"/videogame/" + game.id}
                    >
                      <Card
                        key={game.id}
                        name={game.name}
                        genre={
                          game.genre
                            ? game.genre
                            : game.Generos.map((g) => g.name)
                        }
                        img={game.img}
                      />
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

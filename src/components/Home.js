import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useImperativeHandle,
} from "react";

import MoviesList from "./MoviesList";
import Filtre from "./Filtre";

function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState(0);
  const [filtre, setFiltre] = useState("all");

  const handleGenre = (event) => {
    setGenre(event.target.value);
  };

  const handleFiltre = (event) => {
    setFiltre(event.target.value);
  };
  /*
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const url =  "https://api.themoviedb.org/3/discover/tv?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&sort_by=popularity.desc&page=1&timezone=America/New_York&include_null_first_air_dates=false"
    if(genre) {
        console.log(genre);
        console.log("not null");
    }
    if(filtre) {
        console.log(filtre);
        console.log("filtre no null");
    }
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/tv?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&sort_by=popularity.desc&page=1&timezone=America/New_York&include_null_first_air_dates=false"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      //console.log(data);
      const transformedMovies = data.results.map((movieData) => {
        //console.log(movieData);
        return {
          id: movieData.id,
          name: movieData.original_name,
          overview: movieData.overview,
          poster_path: movieData.poster_path,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [filtre]);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  */
  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      setError(null);
      const url_prefix =
        "https://api.themoviedb.org/3/discover/movie?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&sort_by=popularity.desc&page=1";
        //https://api.themoviedb.org/3/discover/movie?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&sort_by=popularity.desc&page=1&with_genres=28
      let url = url_prefix;
      if (genre!== 0) {
        console.log(genre);
        url = url_prefix + "&with_genres=" + genre;
        console.log(url);
      }
      console.log(filtre);
      if (filtre!=="all") {
        url = "https://api.themoviedb.org/3/movie/"+filtre+"?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US";
      }
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        const transformedMovies = data.results.map((movieData) => {
          //console.log(movieData);
          return {
            id: movieData.id,
            name: movieData.original_name,
            overview: movieData.overview,
            poster_path: movieData.poster_path,
          };
        });
        setMovies(transformedMovies);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchMovieData();
  }, [genre, filtre]);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
    <section class="header"></section>
      <section>
        <Filtre
          selectOption={genre}
          handleOption={handleGenre}
          selectionFiltre={filtre}
          handleFiltreOption={handleFiltre}
        ></Filtre>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default Home;

import React from "react";

import classes from "./Movie.module.css";
import Details from "./Details";

const Movie = (props) => {
  const imgaeUrl = "https://image.tmdb.org/t/p/original/";
  return (
    <div className={classes.movie}>
      <img src={imgaeUrl + props.poster} alt={props.title}/>
      <br/>
      <h1>{props.title}</h1>
      <Details movieId={props.id}></Details>
    </div>
  );
};

export default Movie;

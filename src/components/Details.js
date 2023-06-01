import React, { useCallback, useState } from "react";

function Details(propos) {
  const [detailsMovie, setDetailsMovie] = useState([]);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesDetailsHandler() {
    setError(null);
    setDisplayDetails(!displayDetails);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3//movie/${propos.movieId}?api_key=92b418e837b833be308bbfb1fb2aca1e&append_to_response=videos`
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error("The resource you requested could not be found!");
      }
      const detailsMovie = () => {
        console.log(data);
        return {
          genres: data.genres,
          title: data.original_title,
          vote: data.vote_average,
          vote_count: data.vote_count,
          runtime: data.runtime,
          release_date: data.release_date,
          overview: data.overview,
        };
      };
      setDetailsMovie(detailsMovie);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  let content = <div></div>;
  if (error && displayDetails === true) {
    content = <p>Found no details of this movie.</p>;
  }
  if (Object.keys(detailsMovie).length > 0 && displayDetails === true) {
    content = (
      <div>
        <h3>Vote : {detailsMovie.vote}/10</h3>
        <h3>
          Runtime: {Math.floor(detailsMovie.runtime / 60)}:
          {detailsMovie.runtime % 60} hour
        </h3>
        <h3>Release date: {detailsMovie.release_date}</h3>
        {detailsMovie.genres &&
          detailsMovie.genres.map((genre) => (
            <span key={genre.id}>{genre.name} </span>
          ))}
        <h3>Synopsis: {detailsMovie.overview}</h3>
      </div>
    );
  }

  return (
    <div>
      {content}
      <button onClick={fetchMoviesDetailsHandler}>Details</button>
    </div>
  );
}
export default Details;

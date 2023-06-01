import React, {useEffect, useState, useMemo} from "react";
import Home from "./Home";

function Filtre(propos){
    const [genres, setGenres] = useState([{id:0, value:'Genre?'}]);
    const [filtres, setFiltres] = useState([
        {id: 0, value: 'all', name:'All'},
        {id: 1, value: 'now_playing', name:'Now Playing'},
        {id: 2, value: 'popular', name: 'Popular'},
        {id: 3, value: 'top_rated', name: 'Top Rated'},
        {id: 4, value: 'upcoming', name: 'Upcoming'},
    ]);

    const fetchGenres = useMemo(async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=92b418e837b833be308bbfb1fb2aca1e"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch genre options");
        }
        const data = await response.json();
        const optionsGenres = data.genres.map((genre) => {
          return {
            id: genre.id,
            value: genre.name,
          }; 
        });
        setGenres([...genres,...optionsGenres]);
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    }, []);
  
    return (<div> 
        <h1>Which movie you want to see ?</h1>
        <select value={propos.selectOption} onChange={propos.handleOption}>
          {genres.map((option) => (
            <option key={Math.random()} value={option.id}>
              {option.value}
            </option>
          ))}
        </select>
        <select value={propos.selectionFiltre} onChange={propos.handleFiltreOption}>
          {filtres.map((filtre) => (
            <option key={Math.random()} value={filtre.value}>
              {filtre.name}
            </option>
          ))}
        </select>
    </div>)

}

export default Filtre;
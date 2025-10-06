import { useEffect, useState } from "react";
import Movie from "./Movie";
import PaginaIndicator from "./PaginaIndicator";

const FeatureMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Nzg0ZGFmODJjMjBlMmNlN2NiODEzOGM0MWRlMWZlOSIsIm5iZiI6MTc1OTc0MjAwMC43ODU5OTk4LCJzdWIiOiI2OGUzODgzMDljMDQ1MmY4OGY2MTdkZjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1oiyK9zuhnvUcYrRq-1J9t2kx--3UVxPyazzI6vcyA4",
      },
    }).then(async (response) => {
      const data = await response.json();
      setMovies(data.results);
      console.log(movies);
    });
  }, []);

  return (
    <div className="relative text-white">
      <Movie />
      <PaginaIndicator />
    </div>
  );
};
export default FeatureMovies;

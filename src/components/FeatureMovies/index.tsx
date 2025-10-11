import { useEffect, useState } from "react";
import Movie from "@/components/Movie";
import PaginaIndicator from "@/components/FeatureMovies/PaginaIndicator";
import { useFetch } from "@/hooks/useFetch";

const FeatureMovies = () => {
  const [activeMovieId, setActiveMovieId] = useState<number | null>(null);

  const { data: moviesResponse } = useFetch<MoviesResponseType>({
    url: "/movie/popular",
  });

  const movies = (moviesResponse?.results ?? []).slice(0, 4);

  useEffect(() => {
    if (movies.length === 0) return;
    
    setActiveMovieId(movies[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(movies)]);

  return (
    <div className="relative aspect-video overflow-hidden text-white">
      <div className="relative h-full w-full">
        {movies
          .filter((movie) => movie.id === activeMovieId)
          .map((movie) => (
            <Movie key={movie.id} data={movie} />
          ))}
      </div>

      <PaginaIndicator
        movies={movies}
        activeMovieId={activeMovieId ?? 0}
        setActiveMovieId={(id) => setActiveMovieId(id)}
      />
    </div>
  );
};

export default FeatureMovies;

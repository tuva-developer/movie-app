import { useEffect, useMemo, useState } from "react";
import Movie from "./Movie";
import PaginaIndicator from "./PaginaIndicator";

type MovieType = {
  id: number;
  backdrop_path: string;
  title: string;
  release_date: string;
  overview: string;
};

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Nzg0ZGFmODJjMjBlMmNlN2NiODEzOGM0MWRlMWZlOSIsIm5iZiI6MTc1OTc0MjAwMC43ODU5OTk4LCJzdWIiOiI2OGUzODgzMDljMDQ1MmY4OGY2MTdkZjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1oiyK9zuhnvUcYrRq-1J9t2kx--3UVxPyazzI6vcyA4";

const FeatureMovies = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [activeMovieId, setActiveMovieId] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const data = await res.json();
        const popularMovies: MovieType[] = (data?.results ?? []).slice(0, 4);
        setMovies(popularMovies);
        if (popularMovies.length) setActiveMovieId(popularMovies[0].id);
      } catch (e) {
        console.error(e);
      }
    })();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    movies.forEach((m) => {
      if (m.backdrop_path) {
        const img = new Image();
        img.src = `https://image.tmdb.org/t/p/original${m.backdrop_path}`;
      }
    });
  }, [movies]);

  const activeIndex = useMemo(
    () => movies.findIndex((m) => m.id === activeMovieId),
    [movies, activeMovieId],
  );

  return (
    <div className="relative overflow-hidden text-white aspect-video">
      <div className="relative h-full w-full">
        {movies.map((movie, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100" : "pointer-events-none opacity-0"} will-change-opacity`}
            >
              <Movie data={movie} />
            </div>
          );
        })}
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

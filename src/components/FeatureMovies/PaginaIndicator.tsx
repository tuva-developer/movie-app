// import { useEffect, useRef } from "react";

type MovieType = {
  id: number;
  backdrop_path: string;
  title: string;
  release_date: string;
  overview: string;
};

interface PaginaIndicatorProps {
  movies: MovieType[];
  activeMovieId: number;
  setActiveMovieId: (id: number) => void;
}

const PaginaIndicator = ({
  movies,
  activeMovieId,
  setActiveMovieId,
}: PaginaIndicatorProps) => {
//   const idxRef = useRef(0);

//   useEffect(() => {
//     if (!movies.length) return;
//     const i = movies.findIndex((m) => m.id === activeMovieId);
//     idxRef.current = i === -1 ? 0 : i;
//   }, [movies, activeMovieId]);

//   useEffect(() => {
//     if (!movies.length) return;

//     const interval = setInterval(() => {
//       idxRef.current = (idxRef.current + 1) % movies.length;
//       setActiveMovieId(movies[idxRef.current].id);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [movies, movies.length, setActiveMovieId]);

  return (
    <div className="absolute right-8 bottom-[10%]">
      <ul className="flex gap-1">
        {movies.map((movie) => (
          <li key={movie.id}>
            <button
              onClick={() => setActiveMovieId(movie.id)}
              aria-label={`Chuyển đến ${movie.title}`}
              className={`block h-2 w-4 cursor-pointer transition-colors duration-300 ${
                movie.id === activeMovieId
                  ? "bg-slate-100"
                  : "bg-slate-600 hover:bg-slate-400"
              }`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginaIndicator;

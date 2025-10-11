type PaginaIndicatorProps = {
  movies: MovieType[];
  activeMovieId: number;
  setActiveMovieId: (id: number) => void;
};

const PaginaIndicator = ({
  movies,
  activeMovieId,
  setActiveMovieId,
}: PaginaIndicatorProps) => {
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

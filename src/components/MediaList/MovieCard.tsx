import { Link } from "react-router-dom";
import CircularProcessBar from "@/components/CircularProcessBar";
import ImageComponent from "@/components/ImageComponent";

type MovieCardProps = {
  id: string;
  title: string;
  releaseDate: string;
  posterPath: string;
  point: number;
  mediaType: string;
};

const MovieCard = ({
  id,
  title,
  releaseDate,
  posterPath,
  point,
  mediaType,
}: MovieCardProps) => {
  return (
    <Link
      to={mediaType === "tv" ? `/tv/${id}` : `/movie/${id}`}
      className="cursor-pointer rounded-lg border border-slate-800 transition-all duration-300 hover:scale-104 hover:shadow-lg hover:shadow-white/10"
    >
      <div className="relative">
        {mediaType === "tv" && (
          <div className="absolute top-1 right-1 rounded bg-black p-1 text-sm font-bold text-white shadow-md">
            TV Show
          </div>
        )}
        <ImageComponent
          src={posterPath && `https://image.tmdb.org/t/p/w500${posterPath}`}
          width={210}
          height={300}
          className="w-full rounded-lg"
        />
        <div className="relative -top-[1.5vw] px-4">
          <CircularProcessBar
            percent={Math.round(point * 10)}
            strokeColor={point >= 7 ? "green" : point >= 5 ? "orange" : "red"}
          />
          <p className="mt-2 font-bold">{title}</p>
          <p className="text-slate-300">{releaseDate}</p>
        </div>
      </div>
    </Link>
  );
};
export default MovieCard;

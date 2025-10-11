import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "@/components/Image"

export type MovieProps = {
  data: {
    backdrop_path: string;
    title: string;
    release_date: string;
    overview: string;
  };
}

const Movie = (props: MovieProps) => {
  const { data } = props;

  return (
    <div>
      <Image
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        className="aspect-video brightness-50 w-full"
        width={1430}
        height={800}
      />
      <div className="sx:w-1/3 absolute bottom-[10%] left-8 w-1/2">
        <p className="mb-2 font-bold sm:text-[2vw]">
          {data.title || "Untitled"}:
        </p>
        <div>
          <p className="mb-1 inline-block border border-gray-400 p-1 text-gray-400">
            PG: 13
          </p>
          <p className="text-[1.2vw]">{data.release_date || "Unknown date"}</p>
          <div className="mt-4 hidden text-[1.2vw] sm:block">
            <p className="mb-2 font-bold">Overview</p>
            <p>{data.overview || "No overview available."}</p>
          </div>
          <div className="mt-4">
            <button className="mr-2 cursor-pointer rounded bg-white px-4 py-2 text-[10px] text-black lg:text-lg">
              <FontAwesomeIcon icon={faPlay} />
              Trailer
            </button>
            <button className="rounded bg-slate-300/35 px-4 py-2 text-[10px] lg:text-lg">
              View Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Movie;

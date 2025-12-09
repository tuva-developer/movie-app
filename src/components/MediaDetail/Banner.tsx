import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProcessBar from "@/components/CircularProcessBar";
import { groupBy } from "lodash";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Image from "@/components/Image";

type BannerProps = {
  title?: string;
  backdropPath?: string;
  posterPath?: string;
  certification?: string;
  crews?: CrewType[];
  genres?: GenresType[];
  releaseDate?: string;
  point?: number;
  overView?: string;
};

const Banner = ({
  title = "",
  backdropPath = "",
  posterPath = "",
  certification = "",
  crews = [],
  genres = [],
  releaseDate = "",
  point = 0,
  overView = "",
}: BannerProps) => {
  const groupedCrews = groupBy(
    crews.filter((crew) =>
      ["Director", "Screenplay", "Writer"].includes(crew.job),
    ),
    "job",
  );

  return (
    <div className="relative overflow-hidden bg-black text-white shadow-sm shadow-slate-800">
      <Image
        className="absolute inset-0 w-full brightness-[.2] aspect-video"
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        width={1905}
        height={680}
      ></Image>
      <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-10 lg:gap-8">
        <div className="flex-1">
          <Image
            width={600}
            height={900}
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterPath}`}
          ></Image>
        </div>
        <div className="flex-2">
          <p className="mb-2 text-[2vw] font-bold">{title}</p>
          <div className="flex items-center gap-4 text-[1.2vw]">
            <span className="border border-gray-400 p-1 text-gray-400">
              {certification}
            </span>
            <p>{releaseDate}</p>
            <p>{genres.map((g) => g.name).join(", ")}</p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProcessBar
                percent={Math.round(point * 10)}
                size={3.5}
                strokeWidth={0.3}
              />
              Rating
            </div>
            <button>
              <FontAwesomeIcon icon={faPlay} className="mr-1" />
              Trailer
            </button>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
            <p>{overView}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.keys(groupedCrews).map((job) => (
              <div key={job}>
                <p className="font-bold">{job}</p>
                <p>{groupedCrews[job].map((crew) => crew.name).join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;

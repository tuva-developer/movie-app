import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProcessBar from "@/components/CircularProcessBar";
import { groupBy } from "lodash";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Image from "@/components/Image";

type BannerProps = {
  mediaInfo: MediaDetailType | undefined;
};

const Banner = ({ mediaInfo }: BannerProps) => {
  const certification =
    mediaInfo?.release_dates?.results
      ?.find((result) => result.iso_3166_1 === "US")
      ?.release_dates?.find((r: { certification: string }) => r.certification)
      ?.certification ?? "G";

  const findCrews = (mediaInfo?.credits.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({
      id: crew.id,
      job: crew.job,
      name: crew.name,
    }));

  const groupedCrews = groupBy(findCrews, "job");

  return (
    <div className="relative overflow-hidden text-white shadow-sm shadow-slate-800">
      <Image
        className="absolute inset-0 w-full brightness-[.2]"
        src={`https://image.tmdb.org/t/p/original${mediaInfo?.backdrop_path}`}
        width={1905}
        height={680}
      ></Image>
      <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-10 lg:gap-8">
        <div className="flex-1">
          <Image
            width={600}
            height={900}
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${mediaInfo?.poster_path}`}
          ></Image>
        </div>
        <div className="flex-2">
          <p className="mb-2 text-[2vw] font-bold">
            {mediaInfo?.media_type === "movie"
              ? mediaInfo?.title
              : mediaInfo?.name}
          </p>
          <div className="flex items-center gap-4 text-[1.2vw]">
            <span className="border border-gray-400 p-1 text-gray-400">
              {certification}
            </span>
            <p>{mediaInfo?.release_date}</p>
            <p>{mediaInfo?.genres.map((g) => g.name).join(", ")}</p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProcessBar
                percent={Math.round(mediaInfo?.vote_average ?? 0) * 10}
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
            <p>{mediaInfo?.overview}</p>
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

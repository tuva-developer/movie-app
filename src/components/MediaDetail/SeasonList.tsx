import { useState } from "react";
import CircularProcessBar from "../CircularProcessBar";
import ImageComponent from "../ImageComponent";

type SeasonListProps = {
  seasons: Season[];
};
const SeasonList = ({ seasons = [] }: SeasonListProps) => {
  const [isShowMore, setIsShowMore] = useState(false);

  const currentSeasons = !isShowMore
    ? seasons?.slice(0, 3) || []
    : seasons || [];

  return (
    <div className="mt-8 text-[1.3vw]">
      <p className="mb-4 text-[1.4vw] font-bold">Seasons</p>
      <div className="space-y-4">
        {currentSeasons.map((seasons: Season) => (
          <div
            key={seasons.id}
            className="flex gap-4 rounded-lg border border-slate-200 p-3 shadow-md"
          >
            <ImageComponent
              className="w-1/4 rounded-lg"
              src={
                seasons.poster_path &&
                `https://image.tmdb.org/t/p/w300${seasons.poster_path}`
              }
              width={130}
              height={195}
            />

            <div className="space-y-1">
              <p className="text-[1.4vw] font-bold">{seasons.name}</p>
              <div className="flex items-center gap-2">
                <p className="font-bold">Rating</p>
                <CircularProcessBar
                  percent={Math.round(seasons.vote_average * 10)}
                  size={2.5}
                  strokeWidth={0.2}
                />
              </div>
              <p>
                <span className="font-bold">Release Date:</span>{" "}
                {seasons.air_date}
              </p>
              <p>Episodes {seasons.episode_cout}</p>
              <p>{seasons.overview}</p>
            </div>
          </div>
        ))}
      </div>
      {seasons.length > 3 && (
        <p
          className="mt-1 cursor-pointer"
          onClick={() => setIsShowMore(!isShowMore)}
        >
          {isShowMore ? "Show Less" : "Show More"}
        </p>
      )}
    </div>
  );
};
export default SeasonList;

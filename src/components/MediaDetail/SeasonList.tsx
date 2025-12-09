import CircularProcessBar from "../CircularProcessBar";
import ImageComponent from "../Image";

type SeasonListProps = {
  seasons: Season[];
};
const SeasonList = ({ seasons = [] }: SeasonListProps) => {
  return (
    <div className="mt-8 text-[1.3vw]">
      <p className="mb-4 text-[1.4vw] font-bold">Seasons</p>
      <div className="space-y-4">
        {seasons.map((seasons: Season) => (
          <div
            key={seasons.id}
            className="flex gap-4 rounded-lg border border-slate-200 p-3 shadow-md"
          >
            <ImageComponent
              className="h-[195px] w-[130px] rounded-lg"
              src={`https://image.tmdb.org/t/p/w130_and_h195_face${seasons.poster_path}`}
              width={130}
              height={195}
            />

            <div className="space-y-1">
              <p className="text[1.4vw] font-bold">{seasons.name}</p>
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
    </div>
  );
};
export default SeasonList;

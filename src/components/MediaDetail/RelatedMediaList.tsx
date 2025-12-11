import Loading from "@/components/Loading";
import MovieCard from "@/components/MediaList/MovieCard";

type RelatedMediaListProps = {
  title?: string;
  mediaList?: MediaDetail[];
  isLoading: boolean;
};

const RelatedMediaList = ({
  title,
  mediaList = [],
  isLoading,
}: RelatedMediaListProps) => {
  return (
    <div className="mt-6">
      <p className="mb-4 text-[1.4vw] font-bold">{title}</p>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {mediaList.map((media) => (
            <MovieCard
              key={media.id}
              id={media.id}
              title={media?.media_type === "tv" ? media?.name : media?.title}
              releaseDate={
                media?.media_type === "tv"
                  ? media?.first_air_date
                  : media?.release_date
              }
              posterPath={media.poster_path}
              point={media.vote_average}
              mediaType={"movie"}
            ></MovieCard>
          ))}
        </div>
      )}
    </div>
  );
};
export default RelatedMediaList;

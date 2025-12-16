import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import Banner from "@/components/MediaDetail/Banner";
import ActorList from "@/components/MediaDetail/ActorList";
import RelatedMediaList from "@/components/MediaDetail/RelatedMediaList";
import { useFetch } from "@/hooks/useFetch";
import MediaInfomation from "@/components/MediaDetail/MediaInfomation";

const MovieDetail = () => {
  const { id } = useParams();

  const { data: movieResponse, isLoading: isLoading } = useFetch<MovieDetail>({
    url: `/movie/${id}?append_to_response=release_dates,credits,videos`,
  });

  const movieInfo: MovieDetail | undefined = movieResponse
    ? { ...movieResponse, media_type: "movie" }
    : undefined;

  const { data: relatedMoviesRespone, isLoading: isRelatedLoading } =
    useFetch<RecommendationsResponse>({
      url: `/movie/${id}/recommendations`,
    });

  const relatedMovies = relatedMoviesRespone?.results ?? [];

  const certification =
    movieInfo?.release_dates?.results
      ?.find((result) => result.iso_3166_1 === "US")
      ?.release_dates?.find((r: { certification: string }) => r.certification)
      ?.certification ?? "";

  const crews = (movieInfo?.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  const casts = (movieInfo?.credits?.cast || []).map((cast) => ({
    id: cast.id,
    name: cast.name,
    profile_path: cast.profile_path,
    character: cast.character,
  }));

  const trailerVideoKey = (movieInfo?.videos?.results || []).find(
    (video) => video.type === "Trailer",
  )?.key;

  if (isLoading) return <Loading />;

  return (
    <div>
      <Banner
        title={movieInfo?.title}
        backdropPath={movieInfo?.backdrop_path}
        posterPath={movieInfo?.poster_path}
        certification={certification}
        genres={movieInfo?.genres}
        releaseDate={movieInfo?.release_date}
        point={movieInfo?.vote_average}
        overView={movieInfo?.overview}
        crews={crews}
        trailerVideoKey={trailerVideoKey}
      />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="container">
          <div className="flex-3">
            <ActorList actors={casts} />
            <RelatedMediaList
              title="More like this"
              mediaList={relatedMovies}
              isLoading={isRelatedLoading}
              className="mt-6"
            />
          </div>
          <div className="flex-1">
            <MediaInfomation mediaInfo={movieInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;

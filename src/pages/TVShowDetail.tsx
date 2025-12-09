import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import Banner from "@/components/MediaDetail/Banner";
import ActorList from "@/components/MediaDetail/ActorList";
import RelatedMediaList from "@/components/MediaDetail/RelatedMediaList";
import MediaInfomation from "@/components/MediaDetail/MediaInfomation";
import { useFetch } from "@/hooks/useFetch";
import SeasonList from "@/components/MediaDetail/SeasonList";

const TVShowDetail = () => {
  const { id } = useParams();

  const { data: tvShowResponse, isLoading: isLoading } =
    useFetch<TVShowDetailType>({
      url: `/tv/${id}?append_to_response=content_ratings,aggregate_credits`,
    });

  const tvShowInfo: TVShowDetailType | undefined = tvShowResponse
    ? { ...tvShowResponse, media_type: "tv" }
    : undefined;

  const { data: relatedTVShowRespone, isLoading: isRelatedLoading } =
    useFetch<RecommendationsResponse>({
      url: `/tv/${id}/recommendations`,
    });

  const relatedTVShow = relatedTVShowRespone?.results ?? [];

  const certification =
    tvShowInfo?.content_ratings?.results?.find(
      (result) => result.iso_3166_1 === "US",
    )?.rating ?? "";

  const crews = (tvShowInfo?.aggregate_credits?.crew || [])
    .filter((crew) => {
      const jobs = (crew.jobs || []).map((j) => j.job);

      return ["Director", "Writer"].some((job) => jobs.find((j) => j === job));
    })
    .slice(0, 6)
    .map((crew) => ({ id: crew.id, job: crew.jobs[0].job, name: crew.name }));

  const casts = (tvShowInfo?.aggregate_credits?.cast || []).map((cast) => ({
    id: cast.id,
    name: cast.name,
    profile_path: cast.profile_path,
    character: cast.roles[0]?.character,
    episodeCount: cast.roles[0]?.episode_count,
  }));

  if (isLoading) return <Loading />;

  return (
    <div>
      <Banner
        title={tvShowInfo?.name}
        backdropPath={tvShowInfo?.backdrop_path}
        posterPath={tvShowInfo?.poster_path}
        certification={certification}
        releaseDate={tvShowInfo?.first_air_date}
        point={tvShowInfo?.vote_average}
        overView={tvShowInfo?.overview}
        crews={crews}
      />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-3">
            <ActorList actors={casts} />
            <SeasonList seasons={(tvShowInfo?.seasons || []).reverse()} />
            <RelatedMediaList
              mediaList={relatedTVShow}
              isLoading={isRelatedLoading}
            />
          </div>
          <div className="flex-1">
            <MediaInfomation mediaInfo={tvShowInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TVShowDetail;

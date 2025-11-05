import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import Banner from "@/components/MediaDetail/Banner";
import ActorList from "@/components/MediaDetail/ActorList";
import RelatedMediaList from "@/components/MediaDetail/RelatedMediaList";
import MediaInfomation from "@/components/MediaDetail/MediaInfomation";
import { useFetch } from "@/hooks/useFetch";

const TVShowDetail = () => {
  const { id } = useParams();

  const { data: tvShowResponse, isLoading: isLoading } =
    useFetch<TVShowDetailType>({
      url: `/tv/${id}?append_to_response=release_dates,credits`,
    });

  const tvShowInfo: TVShowDetailType | undefined = tvShowResponse
    ? { ...tvShowResponse, media_type: "tv" }
    : undefined;

  const { data: relatedMoviesRespone, isLoading: isRelatedLoading } =
    useFetch<RecommendationsResponse>({
      url: `/tv/${id}/recommendations`,
    });

  const relatedMovies = relatedMoviesRespone?.results ?? [];

  if (isLoading) return <Loading />;

  return (
    <div>
      <Banner mediaInfo={tvShowInfo} />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-3">
            <ActorList actors={tvShowInfo?.credits.cast || []} />
            <RelatedMediaList
              mediaList={relatedMovies}
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

import RelatedMediaList from "@/components/MediaDetail/RelatedMediaList";
import SearchForm from "@/components/SearchForm";
import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";

const SearchPage = () => {
  const [searchFormValues, setSearchFormValues] = useState<SearchFormValues>({
    mediaType: "movie",
    genres: [],
    rating: "all",
  });

  const [minRating, maxRating] =
    searchFormValues.rating === "all"
      ? [0, 100]
      : searchFormValues.rating.split("-");

  const { data } = useFetch<RecommendationsResponse>({
    url: `/discover/${searchFormValues.mediaType}?sort_by=popularity.desc&with_genres=${searchFormValues.genres.join(",")}&vote_average.gte=${(minRating as number) / 10}&vote_average.lte=${(maxRating as number) / 10}`,
  });

  const mediaList = data?.results || [];

  return (
    <div className="container flex-col bg-black text-white">
      <p className="text-2xl font-bold">Search</p>
      <div className="flex gap-6">
        <div className="flex-1">
          <SearchForm setSearchFormValues={setSearchFormValues}></SearchForm>
        </div>
        <div className="flex-3">
          <RelatedMediaList isLoading={false} mediaList={mediaList} />
        </div>
      </div>
    </div>
  );
};
export default SearchPage;

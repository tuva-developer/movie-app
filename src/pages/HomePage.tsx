import FeatureMovies from "@/components/FeatureMovies";
import MediaList from "@/components/MediaList";
import { TopRatedTabs, TrendingTabs } from "@/libs/constants";

function HomePage() {
  return (
    <div>
      <FeatureMovies />
      <MediaList title="Trending" tabs={TrendingTabs} />
      <MediaList title="Top Rated" tabs={TopRatedTabs} />
    </div>
  );
}

export default HomePage;

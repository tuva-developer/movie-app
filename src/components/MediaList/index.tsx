import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

interface MediaType {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type: string;
}

interface MediaListProps {
  title: string;
  tabs: { id: string; label: string; url: string }[];
}

const MediaList = ({ title, tabs }: MediaListProps) => {
  const [mediaList, setMediaList] = useState<MediaType[]>([]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  useEffect(() => {
    if (!tabs || tabs.length === 0) return;

    const url = tabs.find((tab) => tab.id === activeTabId)?.url;
    if (!url) return;

    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Nzg0ZGFmODJjMjBlMmNlN2NiODEzOGM0MWRlMWZlOSIsIm5iZiI6MTc1OTc0MjAwMC43ODU5OTk4LCJzdWIiOiI2OGUzODgzMDljMDQ1MmY4OGY2MTdkZjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1oiyK9zuhnvUcYrRq-1J9t2kx--3UVxPyazzI6vcyA4",
      },
    }).then(async (response) => {
      const data = await response.json();
      const trendingMedia = data.results.slice(0, 12);
      setMediaList(trendingMedia);
    });
  }, [activeTabId, tabs]);

  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="font-bold text-[2%vw]">{title}</p>
        <ul className="flex items-center gap-4 rounded border border-white">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`cursor-pointer rounded px-2 py-1 ${activeTabId === tab.id ? "bg-white text-black" : ""}`}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
        {mediaList.map((media) => (
          <MovieCard
            key={media.id}
            title={media.title ?? media.name ?? "No title"}
            releaseDate={
              media.release_date ?? media.first_air_date ?? "No data"
            }
            posterPath={media.poster_path}
            point={media.vote_average}
            mediaType={media.media_type ?? activeTabId}
          />
        ))}
      </div>
    </div>
  );
};
export default MediaList;

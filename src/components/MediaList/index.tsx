import { useState } from "react";
import MovieCard from "@/components/MediaList/MovieCard";
import { useFetch } from "@/hooks/useFetch";

type MediaListProps = {
  title: string;
  tabs: { id: string; label: string; url: string }[];
}

const MediaList = ({ title, tabs }: MediaListProps) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  const url = tabs.find((tab) => tab.id === activeTabId)?.url || "";
  const { data } = useFetch<MediaListResponse>({ url });
  const mediaList = data?.results.slice(0, 12);

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
        {mediaList?.map((media) => (
          <MovieCard
            key={media.id}
            id={media.id}
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

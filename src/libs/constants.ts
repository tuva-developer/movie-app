export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_HOST = import.meta.env.VITE_API_HOST;

export const TrendingTabs = [
  { id: "all", label: "All", url: "/trending/all/day" },
  { id: "movie", label: "Movie", url: "/trending/movie/day" },
  { id: "tv", label: "TV Show", url: "/trending/tv/day" },
];

export const TopRatedTabs = [
  { id: "movie", label: "Movie", url: "/movie/top_rated" },
  { id: "tv", label: "TV Show", url: "/tv/top_rated" },
];

export const GENDER_MAPPING: Record<number, string> = {
  0: "Not set / not specified",
  1: "Male",
  2: "Female",
  3: "Non-binary",
};
type Movie = {
  id: number;
  backdrop_path: string;
  title: string;
  release_date: string;
  overview: string;
};

type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type VideosResponse = { results: [{ type: string; key: string }] };

type GenresType = {
  id: string;
  name: string;
};

type Crew = {
  id: string;
  job: string;
  name: string;
};

type MovieDetail = {
  media_type: "movie";
  id: string;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  original_title: string;
  origin_country: string[];
  genres: GenresType[];
  status: string;
  budget: number;
  revenue: number;
  release_dates: {
    results: [
      {
        iso_3166_1: string;
        release_dates: { certification: string }[];
      },
    ];
  };
  credits: {
    crew: [
      {
        id: string;
        job: string;
        name: string;
      },
    ];
    cast: [
      {
        id: string;
        name: string;
        character: string;
        profile_path: string;
      },
    ];
  };
  videos: { results: [{ type: string; key: string }] };
};

type TVShowDetail = {
  media_type: "tv";
  id: string;
  name: string;
  first_air_date: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: GenresType[];
  original_name: string;
  origin_country: string[];
  status: string;
  budget: number;
  revenue: number;
  networks: [
    {
      id: string;
      name: string;
      logo_path: string;
    },
  ];
  content_ratings: {
    results: [
      {
        iso_3166_1: string;
        rating: string;
      },
    ];
  };
  credits: {
    crew: [
      {
        id: string;
        job: string;
        name: string;
      },
    ];
    cast: [
      {
        id: string;
        name: string;
        character: string;
        profile_path: string;
      },
    ];
  };
  aggregate_credits: {
    crew: [
      {
        id: string;
        name: string;
        jobs: [
          {
            job: string;
          },
        ];
      },
    ];
    cast: [
      {
        id: string;
        name: string;
        profile_path: string;
        roles: [
          {
            character: string;
            episode_count?: number;
          },
        ];
      },
    ];
  };
  seasons: Seasion[];
  videos: { results: [{ type: string; key: string }] };
};

type MediaDetail = MovieDetail | TVShowDetail;

type MediaType = {
  id: string;
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type: string;
};

type MediaListResponse = {
  page: number;
  results: MediaType[];
  total_pages: number;
  total_results: number;
};

type RecommendationsResponse = {
  page: number;
  results: MediaDetail[];
  total_pages: number;
  total_results: number;
};

type Season = {
  id: string;
  name: string;
  overview: string;
  poster_path: string;
  air_date: string;
  episode_cout: number;
  season_number: number;
  vote_average: number;
};

type People = {
  name: string;
  known_for_department: string;
  gender: number;
  place_of_birth: string;
  birthday: string;
  biography: string;
  profile_path: string;
  combined_credits?: {
    cast: MediaDetail[]
  },
}
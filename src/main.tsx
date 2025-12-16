import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/pages/RootLayout.tsx";
import ModalProvider from "@/contexts/ModalProvider";
import { API_KEY } from "@/libs/constants";
import { lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const MovieDetail = lazy(() => import("@/pages/MovieDetail"));
const TVShowDetail = lazy(() => import("@/pages/TVShowDetail"));
const PeoplePage = lazy(() => import("@/pages/PeoplePage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "/tv/:id",
        element: <TVShowDetail />,
      },
      {
        path: "/people/:id",
        element: <PeoplePage />,
        loader: async ({ params }) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/person/${params.id}?append_to_response=combined_credits`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${API_KEY}`,
              },
            },
          );

          return res;
        },
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <RouterProvider router={router}></RouterProvider>
    </ModalProvider>
  </StrictMode>,
);

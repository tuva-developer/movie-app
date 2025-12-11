import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@/pages/HomePage.tsx";
import MovieDetail from "@/pages/MovieDetail.tsx";
import RootLayout from "@/pages/RootLayout.tsx";
import TVShowDetail from "@/pages/TVShowDetail";
import ModalProvider from "@/contexts/ModalProvider";

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

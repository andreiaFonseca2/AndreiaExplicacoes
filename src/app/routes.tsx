import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Prices } from "./pages/Prices";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "precos", element: <Prices /> },
      { path: "sobre-mim", element: <About /> },
      { path: "contactos", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
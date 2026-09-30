import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./pages/First";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./ecommerce.css";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <First />
        <Footer />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;

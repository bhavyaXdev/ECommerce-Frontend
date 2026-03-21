import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./Utility/ProductSlice.js";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import { Outlet } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch products dynamically from external API when App mounts
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="app font-sans text-gray-900 bg-white min-h-screen flex  flex-col">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;

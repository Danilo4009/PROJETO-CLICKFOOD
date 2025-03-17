import React from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import Stores from "./components/Stores";
import Footer from "./components/Footer";
import "./styles/Global.css";

function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Categories />
      <Stores />
      <Footer />
    </div>
  );
}

export default App;

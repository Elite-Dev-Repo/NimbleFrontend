import React from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Featured from "./components/Featured";
import Footer from "./components/Footer";
import Faqs from "./components/Faqs";
import About from "./components/About";
import Loading from "./components/Loading";

const App = () => {
  return (
    <div>
      <Nav />

      <Hero />
      <Featured />
      <About />
      <Faqs />
      <Footer />
    </div>
  );
};

export default App;

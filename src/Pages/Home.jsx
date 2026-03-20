import React from "react";
import BannerSlider from "../Components/BannerSlider";
import SuggestionSection from "../Components/SuggestionSection";
import EthnicWearSection from "../Components/EthnicWearSection";

const Home = () => {
  return (
    <div className="bg-white md:px-4">
      <BannerSlider />

      <SuggestionSection />

      <EthnicWearSection />


    </div>
  );
};

export default Home;

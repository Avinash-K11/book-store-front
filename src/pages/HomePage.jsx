import Banner from "../components/Banner";
import News from "../components/News";
import Recommendation from "../components/Recommendation";
import TopSellers from "../components/TopSellers";

const HomePage = () => {
  return (
    <>
      <Banner />
      <TopSellers />
      <Recommendation />
      <News />
    </>
  );
};

export default HomePage;

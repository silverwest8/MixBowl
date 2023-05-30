import Banner from "../components/home/Banner";
import HomeAnswer from "../components/home/HomeAnswer";
import HomeCocktail from "../components/home/HomeCocktail";
import HomeBar from "../components/home/HomeBar";
import HomeCommunity from "../components/home/HomeCommunity";

const HomePage = () => {
  return (
    <main>
      <section>
        <Banner></Banner>
      </section>
      <section>
        <HomeAnswer></HomeAnswer>
      </section>
      <section>
        <HomeCocktail></HomeCocktail>
      </section>
      <section>
        <HomeBar></HomeBar>
      </section>
      <section>
        <HomeCommunity></HomeCommunity>
      </section>
    </main>
  );
};

export default HomePage;

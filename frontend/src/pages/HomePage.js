import Banner from "../components/home/Banner";
import HomeAnswer from "../components/home/HomeAnswer";
import HomeRecipe from "../components/home/HomeRecipe";
import HomeBar from "../components/home/HomeBar";
import HomeBulletin from "../components/home/HomeBulletin";

const HomePage = () => {
  return (
    <main>
      <section>
        <Banner></Banner>
      </section>
      <section>
        <HomeAnswer num={1}></HomeAnswer>
      </section>
      <section>
        <HomeRecipe num={2}></HomeRecipe>
      </section>
      <section>
        <HomeBar num={2}></HomeBar>
      </section>
      <section>
        <HomeBulletin num={3}></HomeBulletin>
      </section>
    </main>
  );
};

export default HomePage;

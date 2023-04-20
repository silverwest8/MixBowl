import Title from "../components/common/Title";
import Banner from "../components/common/home/Banner";
import HomeAnswer from "../components/common/home/HomeAnswer";
import HomeRecipe from "../components/common/home/HomeRecipe";
import HomeBar from "../components/common/home/HomeBar";
import HomeBulletin from "../components/common/home/HomeBulletin";

const HomePage = () => {
  return (
    <main>
      <Title title="칵테일 레시피" />
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

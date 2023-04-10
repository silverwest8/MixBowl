import DropdownMenu from "../components/common/DropdownMenu";
import Input from "../components/common/Input";
import MemberBadge from "../components/common/MemberBadge";
import SearchBar from "../components/common/SearchBar";
import Title from "../components/common/Title";
import { ModalShowButton } from "../components/common/Modal";
import { ToastMessageShowButton } from "../components/common/ToastMessage";

const HomePage = () => {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Title title="칵테일 레시피" />
      <h1>Home</h1>
      <section>
        <h2>Input component</h2>
        <Input placeholder="이메일" name="email" />
        <Input placeholder="비밀번호" type="password" />
        <Input
          placeholder="이메일"
          value="jenabill@naver.com"
          Button={<button>재전송</button>}
        />
        <Input
          type="number"
          placeholder="인증번호 4자리"
          message="인증번호가 발송되었습니다. 메일함을 확인해주세요."
        />
        <Input
          type="number"
          placeholder="인증번호 4자리"
          value="1234"
          message="인증번호가 불일치합니다."
          messageType="error"
        />
        <Input
          type="number"
          placeholder="인증번호 4자리"
          value="5678"
          message="인증이 완료되었습니다."
          messageType="success"
        />
      </section>
      <section>
        <h2>Search Bar</h2>
        <SearchBar
          placholder="원하는 레시피를 검색해보세요"
          showSearchButton={true}
        />
        <SearchBar placholder="원하는 레시피를 검색해보세요" value="asdf" />
      </section>
      <section>
        <h2>Member Badge</h2>
        <MemberBadge level={1} />
        <MemberBadge level={2} />
        <MemberBadge level={3} />
        <MemberBadge level={4} />
      </section>
      <section>
        <h2>Dropdown Menu</h2>
        <DropdownMenu />
      </section>
      <section>
        <h2>Toast Message</h2>
        <ToastMessageShowButton />
      </section>
      <section>
        <h2>Modal</h2>
        <ModalShowButton />
      </section>
    </main>
  );
};

export default HomePage;

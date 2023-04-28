import DropdownMenu from "../components/common/DropdownMenu";
import Input from "../components/common/Input";
import MemberBadge from "../components/common/MemberBadge";
import SearchBar from "../components/common/SearchBar";
import Title from "../components/common/Title";
import { ModalShowButton } from "../components/common/Modal";
import { ToastMessageShowButton } from "../components/common/ToastMessage";
import { ImageSliderModalShowButton } from "../components/common/ImageSliderModal";
import Slider from "../components/common/Slider";

const images = [
  "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
  "https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1550426735-c33c7ce414ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=371&q=80",
  "https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1550426735-c33c7ce414ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=371&q=80",
];

const SamplePage = () => {
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
        <SearchBar placholder="원하는 레시피를 검색해보세요" />
        <SearchBar
          placholder="원하는 레시피를 검색해보세요"
          value="asdf"
          showCloseButton={true}
        />
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
      <section>
        <h2>Image Slider Modal</h2>
        <ImageSliderModalShowButton />
      </section>
      <section>
        <h2>Slider</h2>
        <Slider
          spaceBetween={24}
          elementList={images.map((image, index) => (
            <img src={image} key={index} />
          ))}
        />
      </section>
    </main>
  );
};

export default SamplePage;

import { useRecoilValue, useSetRecoilState } from "recoil";
import DropdownMenu from "../components/common/DropdownMenu";
import Input from "../components/common/Input";
import MemberBadge from "../components/common/MemberBadge";
import SearchBar from "../components/common/SearchBar";
import Title from "../components/common/Title";
import { toastShowState, toastState } from "../store/toast";
import { useModal } from "../hooks/useModal";
import Modal from "../components/common/Modal";
const HomePage = () => {
  const setToastState = useSetRecoilState(toastState);
  const showToast = useRecoilValue(toastShowState);
  const { openModal, closeModal } = useModal();
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
          close
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
        <button
          disabled={showToast}
          onClick={() =>
            setToastState({
              show: true,
              message: "삭제가 완료되었습니다.",
              type: "success",
              ms: 2000,
            })
          }
        >
          토스트 메시지 띄우기
        </button>
      </section>
      <section>
        <h2>Modal</h2>
        <button
          onClick={() =>
            openModal(ModalTest1, {
              handleClose: closeModal,
            })
          }
        >
          모달 띄우기1
        </button>
        <button
          onClick={() =>
            openModal(ModalTest2, {
              handleClose: closeModal,
            })
          }
        >
          모달 띄우기2
        </button>
      </section>
    </main>
  );
};

const ModalTest1 = ({ handleClose }) => {
  return (
    <Modal
      title="댓글 삭제"
      content="정말 삭제하시겠습니까?"
      handleClose={handleClose}
      onCancel={handleClose}
      onConfirm={handleClose}
    />
  );
};

const ModalTest2 = ({ handleClose }) => {
  return (
    <Modal
      title="닉네임 수정"
      handleClose={handleClose}
      onCancel={handleClose}
      onSubmit={handleClose}
    >
      <Input value="기존 닉네임" />
    </Modal>
  );
};

export default HomePage;

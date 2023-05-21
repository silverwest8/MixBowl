import Modal from "../common/Modal";
import styled from "styled-components";
import { AiFillCamera } from "react-icons/ai";

const Button = styled.button`
  background-color: ${({ theme }) => theme.color.primaryGold};
  color: black;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  font-size: 0.9rem;
  min-width: 10vw;
  margin-top: 0.5rem;
  &:hover {
    background-color: ${({ theme }) => theme.color.secondGold};
  }
  > span {
    margin-left: 0.2rem;
    font-size: 0.9rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.8rem;
  .secondGold {
    color: ${({ theme }) => theme.color.secondGold};
  }
  .lightGray {
    color: ${({ theme }) => theme.color.lightGray};
  }
  .red {
    color: ${({ theme }) => theme.color.red};
  }
  .green {
    color: ${({ theme }) => theme.color.green};
  }
  > div:first-child {
    font-size: 1.5rem;
    margin-bottom: 0.45rem;
  }
  > div:last-child {
    font-size: 1.1rem;
  }
`;

const LevelInfoModal = ({ handleClose }) => {
  return (
    <Modal title="등급 안내" handleClose={handleClose} onCancel={handleClose}>
      <Wrapper>
        <Section>
          <div className="lightGray">1단계</div>
          <div>Cocktell에 가입한 회원</div>
        </Section>
        <Section>
          <div className="green">2단계</div>
          <div>
            일주일에 3회 이상 방문하거나 커뮤니티 게시글을 10개 이상 작성한 회원
          </div>
        </Section>
        <Section>
          <div className="secondGold">3단계</div>
          <div>커뮤니티 게시글을 30개 이상 작성한 회원</div>
        </Section>
        <Section>
          <div className="red">전문가</div>
          <div>
            <p>조주기능사 자격증 소지자 혹은 칵테일 관련 사업자인 회원</p>
            <p>(인증 이후 등업이 가능합니다)</p>
            <Button>
              <AiFillCamera />
              <span>전문가 인증하기</span>
            </Button>
          </div>
        </Section>
      </Wrapper>
    </Modal>
  );
};

export default LevelInfoModal;

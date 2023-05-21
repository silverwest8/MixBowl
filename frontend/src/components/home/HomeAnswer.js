import styled from "styled-components";
import { FaComments } from "react-icons/fa";
import MemberBadge from "../common/MemberBadge";

const HomeAnswer = ({ num }) => {
  return (
    <Section>
      <HomeTitleBox num={num}>
        <FaComments className="logo"></FaComments>
        <p>지금 당신의 답변을 기다리고 있어요</p>
      </HomeTitleBox>
      <ItemBox>
        <h4>
          질문이 들어갑니다 질문이 들어갑니다 질문이 들어갑니다 질문이
          들어갑니다 질문이 들어갑니다 질문이 들어갑니다 질문이 들어갑니다
          질문이 들어갑니...
        </h4>
        <div className="nickname">
          닉네임 <MemberBadge></MemberBadge>
        </div>
        <p className="time">14시간 전</p>
      </ItemBox>
    </Section>
  );
};

const Section = styled.div`
  padding: 0 1rem;
  margin: 2rem auto 0;
  max-width: 1144px;
`;

const HomeTitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  .logo {
    color: ${({ theme, num }) =>
      num === 1
        ? theme.color.lightGray
        : num === 2
        ? theme.color.primaryGold
        : num === 3
        ? theme.color.red
        : null};
    margin-right: 0.75rem;
  }
  p {
    font-weight: bold;
  }
`;

const ItemBox = styled.div`
  width: 18.75rem;
  height: 11.25rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.darkGray};
  border-radius: 0.75rem;
  h4 {
    font-size: 1.125rem;
    font-weight: bold;
    margin-bottom: 1.25rem;
  }
  .nickname {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.875rem;
    margin-bottom: 0.375rem;
  }
  .time {
    color: ${({ theme }) => theme.color.lightGray};
  }
`;

export default HomeAnswer;

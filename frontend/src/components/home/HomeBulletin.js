import styled from "styled-components";
import { FaHotjar, FaThumbsUp, FaCommentDots } from "react-icons/fa";
import MemberBadge from "../common/MemberBadge";

const HomeBulletin = ({ num }) => {
  return (
    <Section>
      <HomeTitleBox num={num}>
        <FaHotjar className="logo"></FaHotjar>
        <p>이번주 커뮤니티 인기글</p>
      </HomeTitleBox>
      <GridBox>
        {[1, 2, 3, 4].map((item) => (
          <ItemBox key={item}>
            <div className="title">
              <h4>제목이 들어갑니다 최대 한줄</h4>
              <p>자유게시판</p>
            </div>
            <div className="content">
              <p>
                내용이 들어갑니다 최대 몇자? 내용이 들어갑니다 최대 몇자? 내용이
                들어갑니다 최대 몇자? 내용이 들어갑니다 최대 몇자? 내용이
                들어갑니다 최대 몇자? 내용이 들어갑니다 최대 몇자?...
              </p>
            </div>
            <div className="info">
              <div>
                <div className="thumbs">
                  <FaThumbsUp /> 10
                </div>
                <div className="comment">
                  <FaCommentDots /> 10
                </div>
              </div>
              <div>
                <p className="day"> 1일전</p>
                닉네임<MemberBadge></MemberBadge>
              </div>
            </div>
          </ItemBox>
        ))}
      </GridBox>
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
    text-size: 1.5rem;
    font-weight: bold;
  }
`;
const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  @media screen and (max-width: 720px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ItemBox = styled.div`
  padding: 0.875rem 1.4rem;
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 0.75rem;
  div {
    display: flex;
  }
  .title {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    h4 {
      font-size: 1.125rem;
      font-weight: bold;
    }
    p {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.primaryGold};
    }
  }
  .content {
    margin-bottom: 1.75rem;
    p {
      font-size: 0.875rem;
    }
  }
  .info {
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    .thumbs {
      color: ${({ theme }) => theme.color.primaryGold};
      margin-right: 0.5rem;
    }
    .comment {
      color: ${({ theme }) => theme.color.lightGray};
    }
    .day {
      color: ${({ theme }) => theme.color.lightGray};
      margin-right: 0.5rem;
    }
    div {
      align-items: center;
      gap: 0.25rem;
    }
  }
`;

export default HomeBulletin;

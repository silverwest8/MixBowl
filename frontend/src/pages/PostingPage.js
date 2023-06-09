import Textarea from "../components/common/Textarea";
import styled from "styled-components";
import Title from "../components/common/Title";
import { useState } from "react";
import Input from "../components/common/Input";
import { AiOutlinePlusCircle, AiFillHeart } from "react-icons/ai";
import { ImSad } from "react-icons/im";
import { Link } from "react-router-dom";

const Background = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 10rem;
  height: 100%;
  .icon {
    margin-right: 0.6rem;
  }
  @media screen and (max-width: 400px) {
    padding: 1rem 0.5rem;
  }
`;

const Menu = styled.button`
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  color: white;
  border-radius: 10px;
  padding: 0.7rem 0;
  width: 10vw;
  background-color: none;
  &:hover {
    background-color: ${({ theme }) => theme.color.secondGold};
  }
  @media screen and (max-width: 800px) {
    width: 22vw;
  }
  @media screen and (max-width: 500px) {
    width: 32vw;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 45vw;
  justify-content: center;
  margin-bottom: 2rem;
  > span {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  @media screen and (max-width: 500px) {
    width: 70vw;
  }
`;

const MiniTitle = styled.div`
  text-align: left;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .selected {
    background-color: ${({ theme }) => theme.color.primaryGold};
  }
  @media screen and (max-width: 800px) {
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: auto auto;
    gap: 1rem;
    margin-top: 1rem;
  }
`;
const MainSection = styled.div`
  width: 45vw;
  > div:last-child {
    margin-top: 1.2rem;
  }
  @media screen and (max-width: 500px) {
    width: 70vw;
  }
`;
const ImageSection = styled.div`
  width: 45vw;
  margin-top: 2rem;
  > div {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.color.gray};
    > span {
      font-size: 1rem;
      margin-right: 0.5rem;
      color: white;
    }
  }
  > div:last-child {
    font-size: 1.8rem;
    height: 5rem;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.color.primaryGold};
  }
  @media screen and (max-width: 500px) {
    width: 70vw;
  }
`;
const BottomSection = styled.div`
  width: 45vw;
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  .cancel {
    background-color: ${({ theme }) => theme.color.darkGray};
  }
  .ok {
    background-color: ${({ theme }) => theme.color.primaryGold};
  }
  @media screen and (max-width: 500px) {
    width: 70vw;
  }
`;
const RecommendationSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 45vw;
  @media screen and (max-width: 500px) {
    width: 70vw;
    flex-direction: column;
  }
  > div:first-child {
    margin-bottom: 0.5rem;
  }
  > div:last-child {
    display: flex;
    @media screen and (max-width: 800px) {
      flex-direction: column;
    }

    > span:first-child {
      color: ${({ theme }) => theme.color.primaryGold};
      cursor: pointer;
    }
    > span {
      display: flex;
      margin-left: 1rem;
      .icon {
        margin-left: 0.5rem;
      }
      @media screen and (max-width: 500px) {
        margin-left: 0;
        margin-top: 0.2rem;
      }
      &:hover {
        color: ${({ theme }) => theme.color.secondGold};
      }
    }
  }
`;
const Button = styled(Link)`
  font-size: 1rem;
  border-radius: 10px;
  padding: 1rem 4rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.secondGold};
  }
  @media screen and (max-width: 800px) {
    padding: 1rem 3.2rem;
  }
`;

const PostingPage = () => {
  const [tab, setTab] = useState("글 내용");
  const recommendationTab = () => setTab("추천 이유");
  const qnaTab = () => setTab("질문 내용");
  const reviewTab = () => setTab("후기 내용");
  const freeTab = () => setTab("글 내용");
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Title title="커뮤니티" />
      <Background>
        <MiniTitle>글 작성</MiniTitle>
        <TopSection>
          <span>카테고리</span>
          <SelectContainer>
            <Menu
              onClick={recommendationTab}
              className={tab === "추천 이유" ? "selected" : ""}
            >
              칵테일 추천
            </Menu>
            <Menu
              onClick={qnaTab}
              className={tab === "질문 내용" ? "selected" : ""}
            >
              질문과 답변
            </Menu>
            <Menu
              onClick={reviewTab}
              className={tab === "후기 내용" ? "selected" : ""}
            >
              칵테일 리뷰
            </Menu>
            <Menu
              onClick={freeTab}
              className={tab === "글 내용" ? "selected" : ""}
            >
              자유
            </Menu>
          </SelectContainer>
        </TopSection>
        <MainSection>
          {tab === "질문 내용" ? (
            ""
          ) : (
            <Input
              placeholder={tab === "후기 내용" ? "칵테일 이름" : "제목"}
              className="input-title"
            />
          )}
          <Textarea rows={15} placeholder={tab} />
        </MainSection>
        <ImageSection>
          <div>
            <span>이미지 첨부</span>
            0/5
          </div>
          <div>
            <AiOutlinePlusCircle />
          </div>
        </ImageSection>
        {tab === "후기 내용" ? (
          <RecommendationSection>
            <div>이 칵테일을 추천하시나요?</div>
            <div>
              <span>
                추천합니다!
                <AiFillHeart className="icon" />
              </span>
              <span>
                아니요
                <ImSad className="icon" />
              </span>
            </div>
          </RecommendationSection>
        ) : (
          ""
        )}
        <BottomSection>
          <Button className="cancel" to="/community">
            취소
          </Button>
          <Button className="ok" to="/community">
            확인
          </Button>
        </BottomSection>
      </Background>
    </main>
  );
};

export default PostingPage;

import DropdownMenu from "../components/common/DropdownMenu";
import Input from "../components/common/Input";
import MemberBadge from "../components/common/MemberBadge";
import SearchBar from "../components/common/SearchBar";
import Title from "../components/common/Title";
import { ModalShowButton } from "../components/common/Modal";
import { ToastMessageShowButton } from "../components/common/ToastMessage";
import { ImageSliderModalShowButton } from "../components/common/ImageSliderModal";
import Slider from "../components/common/Slider";
import { Button } from "@mui/material";
import styled from "styled-components";
import { Link, useHref } from "react-router-dom";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";
import { useState } from "react";

const RecipePage = () => {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Title title="칵테일 레시피" />
      <section>
        <SearchBox>
          <SearchBar
            placholder="로그인 이후 검색이 가능합니다!"
            showSearchButton={true}
          />
        </SearchBox>
      </section>
      <section>
        <Card></Card>
      </section>
      <section>
        <LoginBox>
          <p>더 많은 콘텐츠를 보고 싶다면?</p>
          <LoginButton>
            <Link to="../login">로그인하기</Link>
          </LoginButton>
        </LoginBox>
      </section>
    </main>
  );
};

const Card = () => {
  const [Recommendation, setRecommendation] = useState(10);
  const [CommentNum, setCommentNum] = useState(10);
  return (
    <CardBox>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
        <RecipeBox key={index}>
          <img src={images}></img>
          <h1>Old Fashioned</h1>
          <TextBox>
            <p>@닉네임 뱃지 </p>
            <p className="ThumbsUp">
              <FaThumbsUp></FaThumbsUp>
              {Recommendation}
            </p>
            <p className="Comment">
              <FaCommentDots></FaCommentDots>
              {CommentNum}
            </p>
          </TextBox>
        </RecipeBox>
      ))}
    </CardBox>
  );
};

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

const SearchBox = styled.div`
  margin: auto;
  margin-top: 40px;
  width: 40.25rem;
  heighgt: 2.875rem;
`;

const LoginBox = styled.div`
  text-align: center;
`;

const TextBox = styled.div`
  display: flex;
`;

const CardBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  margin: 2rem;
  justify-items: center;
  @media screen and (max-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 720px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const RecipeBox = styled.div`
  img {
    height: 12.5rem;
    width: 16.25rem;
    border: 2px solid ${({ theme }) => theme.color.primaryGold};
    border-radius: 0.75rem;
  }
  h1 {
    font-size: 1.5rem;
    margin-top: 0.5rem;
  }
  p {
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
  .ThumbsUp {
    display: flex;
    color: ${({ theme }) => theme.color.primaryGold};
    margin-left: 3rem;
  }
  .Comment {
    display: flex;
    color: ${({ theme }) => theme.color.lightGray};
    margin-left: 0.75rem;
  }
`;

const LoginButton = styled.button`
  background-color: #e9aa33;
  border-radius: 0.75rem;
  width: 6.3rem;
  height: 2.125rem;
  margin-top: 1rem;
`;

export default RecipePage;

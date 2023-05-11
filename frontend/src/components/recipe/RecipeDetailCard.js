import { useState, useEffect } from "react";
import styled from "styled-components";
import MemberBadge from "../common/MemberBadge";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import RecipeEditDelete from "./RecipeEditDelete";
import ReportModal from "../common/ReportModal";
import { useModal } from "../../hooks/useModal";

const ReportRecipeModal = ({ handleClose }) => {
  const onSubmit = () => {
    console.log("제출");
    handleClose();
  };

  return <ReportModal handleClose={handleClose} onSubmit={onSubmit} />;
};

const alcoholFilter = (recipe) => {
  if (recipe.alcoholic === 0) {
    return "낮음";
  }
  if (recipe.alcoholic === 1) {
    return "중간";
  }
  if (recipe.alcoholic === 2) {
    return "높음";
  }
};

const RecipeDetailCard = () => {
  const [recipe, setRecipe] = useState([]);
  const [Like, setLike] = useState(recipe.rec);
  const [LikeCheck, setLikeCheck] = useState(false);
  const alcohol = alcoholFilter(recipe);
  const params = useParams();
  const id = params.id;
  const { openModal, closeModal } = useModal();

  const GetRecipe = async () => {
    try {
      const { data } = await axios.get(`/api/recipes/detail/${id}`);
      setRecipe(data.data);
      console.log(data.data);
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    GetRecipe();
  }, []);

  useEffect(() => {
    if (recipe.rec) {
      setLike(recipe.rec);
    }
  }, [recipe]);

  if (!recipe || !recipe.USER) {
    return null;
  }

  return (
    <>
      <TopBox>
        <RecipeBox>
          <img src={recipe.image_path}></img>
          <TextBox>
            <div>
              <h1>
                {recipe.name}
                {recipe.iswriter ? (
                  <RecipeEditDelete />
                ) : (
                  <CallButton
                    onClick={() => {
                      openModal(ReportRecipeModal, {
                        handleClose: closeModal,
                      });
                    }}
                  >
                    신고
                  </CallButton>
                )}
              </h1>
              <User>
                @{recipe.USER.nickname}
                <MemberBadge level={recipe.USER.level} />
              </User>
              <p>{recipe.date.slice(0, 10)}</p>
            </div>
            <div className="color">
              <p>
                <span>도수</span> {alcohol}
              </p>
              {recipe.color && (
                <p>
                  <span>색상</span>
                  {recipe.color.includes(1) ? (
                    <Circle bgColor="#FF0000"></Circle>
                  ) : null}
                  {recipe.color.includes(2) ? (
                    <Circle bgColor="#FF9900"></Circle>
                  ) : null}
                  {recipe.color.includes(3) ? (
                    <Circle bgColor="#FFC700"></Circle>
                  ) : null}
                  {recipe.color.includes(4) ? (
                    <Circle bgColor="#04D100"></Circle>
                  ) : null}
                  {recipe.color.includes(5) ? (
                    <Circle bgColor="#0066FF"></Circle>
                  ) : null}
                  {recipe.color.includes(6) ? (
                    <Circle bgColor="#AD00FF"></Circle>
                  ) : null}
                  {recipe.color.includes(7) ? (
                    <Circle bgColor="#FF41D5"></Circle>
                  ) : null}
                  {recipe.color.includes(8) ? (
                    <Circle bgColor="#000000"></Circle>
                  ) : null}
                  {recipe.color.includes(9) ? (
                    <Circle bgColor="#532503"></Circle>
                  ) : null}
                  {recipe.color.includes(10) ? (
                    <Circle bgColor="#787878"></Circle>
                  ) : null}
                  {recipe.color.includes(11) ? (
                    <Circle bgColor="#FFFFFF"></Circle>
                  ) : null}
                  {recipe.color.includes(12) ? (
                    <Circle bgColor="#3E3E3E"></Circle>
                  ) : null}
                </p>
              )}
            </div>
          </TextBox>
        </RecipeBox>
        <Material>
          <div>
            <span>재료 목록</span>
            <div>
              {recipe.ingred &&
                recipe.ingred.map((item, index) => {
                  return (
                    <p key={index}>
                      {item.name} {item.amount} {item.unit}
                    </p>
                  );
                })}
            </div>
          </div>
          <div>
            <span>레시피</span>
            <Explain>{recipe.instruction}</Explain>
          </div>
        </Material>
      </TopBox>
      <MidBox>
        <RecBox>
          <button>
            <FaThumbsUp
              onClick={() => {
                LikeCheck === false ? setLike(Like + 1) : setLike(Like - 1);
                setLikeCheck(!LikeCheck);
              }}
              style={{
                color: LikeCheck === true ? "#E9AA33" : "white",
                fontSize: "2rem",
              }}
            ></FaThumbsUp>
          </button>
          <p
            style={{
              color: LikeCheck === true ? "#E9AA33" : "white",
              marginTop: "0.5rem",
            }}
          >
            {Like}
          </p>
        </RecBox>
        <HorizonLine></HorizonLine>
      </MidBox>
    </>
  );
};

const User = styled.p`
  p {
    display: flex;
    span {
      margin-right: 0.75rem;
      color: ${({ theme }) => theme.color.primaryGold};
    }
  }
  div {
    margin-left: 0.5rem;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    display: flex;
    justify-content: space-between;
    div {
      margin-left: 1rem;
      display: flex;
    }
    button {
      font-size: 0.8rem;
    }
  }
  p {
    display: flex;
    span {
      margin-right: 0.75rem;
      color: ${({ theme }) => theme.color.primaryGold};
    }
    div {
      margin-right: 0.5rem;
    }
  }
  @media screen and (min-width: 429px) {
    margin-left: 2rem;
  }
  @media screen and (max-width: 428px) {
    margin-top: 0.5rem;
    .color {
      margin-top: 1rem;
    }
  }
`;

const RecipeBox = styled.div`
  display: flex;
  margin-top: 3rem;
  img {
    height: 12.5rem;
    width: 12.25rem;
    border: 1px solid ${({ theme }) => theme.color.primaryGold};
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
  @media screen and (max-width: 428px) {
    flex-direction: column;
    img {
      height: 50vw;
      width: 100vw;
      margin: auto;
      object-fit: cover;
    }
  }
`;

const Material = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    flex-direction: column;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    span {
      margin-right: 0.75rem;
      color: ${({ theme }) => theme.color.primaryGold};
    }
  }
`;

const TopBox = styled.div`
  width: 50vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-left:1rem;
  }
  @media screen and (max-width: 840px) {
    width: 70vw;
  }
`;

const MidBox = styled.div`
  width: 50vw;
  margin: auto;
  margin-top: 2rem;
  div {
    display: flex;
    justify-content: flex-end;
  }
  @media screen and (max-width: 840px) {
    width: 70vw;
  }
`;

const RecBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  p {
    margin-left: 0.5rem;
  }
`;

const HorizonLine = styled.div`
  border: 0.1rem solid #e9aa33;
  line-height: 0.1em;
  margin: auto;
  margin-top: 0.5rem;
`;

const Circle = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
`;

const Explain = styled.div`
  white-space: pre-wrap;
`;

const CallButton = styled.button`
  width: 3rem;
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.color.primaryGold};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export default RecipeDetailCard;

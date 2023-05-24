import { useState, useEffect } from "react";
import styled from "styled-components";
import MemberBadge from "../common/MemberBadge";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import RecipeEditDelete from "./RecipeEditDelete";
import RecipeReportModal from "./RecipeReportModal";
import { useModal } from "../../hooks/useModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { RecipeRoportState } from "../../store/recipe";
import { reportRecipe, likteRecipe } from "../../api/recipeapi";
import { toastState } from "../../store/toast";

const ReportRecipeModal = ({ handleClose, id }) => {
  const reportNum = useRecoilValue(RecipeRoportState);
  const setToastState = useSetRecoilState(toastState);
  const onSubmit = () => {
    reportRecipe(id, reportNum)
      .then((response) => {
        console.log(response);
        setToastState({
          show: true,
          message: "이미 신고한 게시물입니다.",
          type: "error",
          ms: 2000,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    handleClose();
  };
  return <RecipeReportModal handleClose={handleClose} onSubmit={onSubmit} />;
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
  const alcohol = alcoholFilter(recipe);
  const params = useParams();
  const id = params.id;
  const { openModal, closeModal } = useModal();
  const token = localStorage.getItem("access_token");

  const GetRecipe = async () => {
    try {
      axios.defaults.headers.common.Authorization = token;
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

  if (!recipe || !recipe.USER) {
    return null;
  }

  return (
    <>
      <TopBox>
        <RecipeBox>
          <img src={`/api/recipes/image/${id}`}></img>
          <TextBox>
            <div>
              <h1>
                {recipe.name}
                {recipe.USER.iswriter ? (
                  <RecipeEditDelete />
                ) : (
                  <CallButton
                    onClick={() => {
                      openModal(ReportRecipeModal, {
                        handleClose: closeModal,
                        id: id,
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
              <ColorBox>
                <span>도수</span> <span className="alcohol">{alcohol}</span>
              </ColorBox>
              {recipe.color && (
                <ColorBox>
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
                </ColorBox>
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
            {recipe.USER.liked === true ? (
              <FaThumbsUp
                onClick={() => {
                  likteRecipe(id, true, recipe.like - 1)
                    .then((response) => {
                      console.log(response);
                      setRecipe((prevRecipe) => ({
                        ...prevRecipe,
                        USER: {
                          ...prevRecipe.USER,
                          liked: false,
                        },
                        like: prevRecipe.like - 1,
                      }));
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
                style={{
                  color: "#E9AA33",
                  fontSize: "2rem",
                }}
              ></FaThumbsUp>
            ) : (
              <FaRegThumbsUp
                onClick={() => {
                  likteRecipe(id, false, recipe.like + 1)
                    .then((response) => {
                      console.log(response);
                      setRecipe((prevRecipe) => ({
                        ...prevRecipe,
                        USER: {
                          ...prevRecipe.USER,
                          liked: true,
                        },
                        like: prevRecipe.like + 1,
                      }));
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
                style={{
                  color: "#E9AA33",
                  fontSize: "2rem",
                }}
              ></FaRegThumbsUp>
            )}
          </button>
          <p
            style={{
              color: "#E9AA33",
              marginTop: "0.5rem",
            }}
          >
            {recipe.like}
          </p>
        </RecBox>
        <HorizonLine></HorizonLine>
      </MidBox>
    </>
  );
};

const User = styled.div`
  display: flex;
  margin-top: 0.3rem;
  gap: 0.4rem;
  align-items: center;
`;
const ColorBox = styled.div`
  display: flex;
  margin-top: 0.3rem;
  gap: 0.6rem;
  align-items: center;
  color: ${({ theme }) => theme.color.primaryGold};
  .alcohol {
    color: white;
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
    object-fit: cover;
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

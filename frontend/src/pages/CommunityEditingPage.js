import Textarea from "../components/common/Textarea";
import styled from "styled-components";
import Title from "../components/common/Title";
import { useState, useEffect } from "react";
import Input from "../components/common/Input";
import ImageUpload from "../components/common/ImageUpload";
import { AiFillHeart } from "react-icons/ai";
import { ImSad } from "react-icons/im";
import { Link, useNavigate, useParams } from "react-router-dom";
// import AutoCompleteCocktail from "../components/community/AutoCompleteCocktail";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { imageFileListState } from "../store/imageFile";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { getAccessToken } from "../utils/token";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { AddPostingState } from "../store/community";
import { toastState } from "../store/toast";
import { editCommunity } from "../api/community";
import LoadingPage from "./Loading";
import { convertURLtoFile } from "../utils/image";

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
  .warning {
    color: ${({ theme }) => theme.color.red};
    font-size: 0.9rem;
    margin-top: 2rem;
  }
`;

const Section = styled.div`
  width: 45vw;
  @media screen and (max-width: 500px) {
    width: 60vw;
  }
  @media screen and (max-width: 800px) {
    width: 83vw;
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
    width: 18vw;
  }
  @media screen and (max-width: 500px) {
    width: 40vw;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  margin-bottom: 2rem;
  > span {
    font-size: 1rem;
    margin-bottom: 0.5rem;
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
  @media screen and (max-width: 500px) {
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: auto auto;
    gap: 1rem;
    margin-top: 1rem;
  }
`;
const MainSection = styled.div`
  width: 100%;
  > div:last-child {
    margin-top: 1.2rem;
  }
  #autocompleteCocktail {
    color: white;
    width: 100%;
  }
  .selection {
    border: 2px solid ${({ theme }) => theme.color.primaryGold};
    outline: "none";
    border-radius: 8px;
    color: white;
    &:focus {
      outline: "none";
    }
    width: 45vw;
    @media screen and (max-width: 500px) {
      width: 60vw;
    }
    @media screen and (max-width: 800px) {
      width: 83vw;
    }
  }
  .MuiAutocomplete-noOptions {
    color: ${({ theme }) => theme.color.primaryGold}!important;
  }
`;
const StyledTextField = styled(TextField)({
  "& label": {
    color: "lightgray",
  },
  "& label.Mui-focused": {
    outline: "none",
  },
  outline: "none",
});

const StyledOptionBox = styled(Box)({
  color: "white",
  backgroundColor: `${({ theme }) => theme.color.darkGray}`,
});

const ImageSection = styled.div`
  width: 100%;
  margin-top: 2rem;
`;
const BottomSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  .cancel {
    background-color: ${({ theme }) => theme.color.darkGray};
  }
  .ok {
    background-color: ${({ theme }) => theme.color.primaryGold};
  }
`;
const RecommendationSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  > div:first-child {
    margin-bottom: 0.5rem;
  }
  > div:last-child {
    display: flex;
    @media screen and (max-width: 800px) {
      flex-direction: column;
    }

    > .selected {
      color: ${({ theme }) => theme.color.primaryGold};
    }
    > span {
      display: flex;
      margin-left: 1rem;
      cursor: pointer;
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

const CommunityEditingPage = () => {
  const params = useParams();
  const id = params.id;
  const [tab, setTab] = useState("글 내용");
  const [list, setList] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [warning, setWarning] = useState("");
  const [selectLike, setSelectLike] = useState(true);
  // const [posting, setPosting] = useState({});
  const [{ addTitle }, setAddTitle] = useRecoilState(AddPostingState);
  const [{ addContent }, setAddContent] = useRecoilState(AddPostingState);
  const [{ addLike }, setAddLike] = useRecoilState(AddPostingState);
  const [{ addCategory }, setAddCategory] = useRecoilState(AddPostingState);
  const [{ addCNO }, setAddCNO] = useRecoilState(AddPostingState);
  const [isLoading, setIsLoading] = useState(true);
  const files = useRecoilValue(imageFileListState);
  const navigate = useNavigate();
  const defaultFiles = [];

  // add Image?
  const recommendationTab = () => {
    setTab("추천 이유");
    setAddCategory(() => ({
      addCategory: 1,
    }));
  };
  const qnaTab = () => {
    setTab("질문 내용");
    setAddCategory(() => ({
      addCategory: 2,
    }));
  };
  const reviewTab = () => {
    setTab("후기 내용");
    setAddCategory(() => ({
      addCategory: 3,
    }));
  };
  const freeTab = () => {
    setTab("글 내용");
    setAddCategory(() => ({
      addCategory: 4,
    }));
  };
  const handleTitle = (e) => {
    setWarning("");
    setAddTitle((prev) => ({
      ...prev,
      addTitle: e.target.value,
    }));
  };
  const handleContent = (e) => {
    setWarning("");
    setAddContent((prev) => ({
      ...prev,
      addContent: e.target.value,
    }));
  };
  const handleLike = (e) => {
    setAddLike((prev) => ({
      ...prev,
      addLike: e,
    }));
    setSelectLike(!selectLike);
  };
  const onChangeAutoComplete = (event, value) => {
    setWarning("");
    setAddCNO((prev) => ({
      ...prev,
      addCNO: value.num,
    }));
    setAddTitle((prev) => ({
      ...prev,
      addTitle: value.name,
    }));
  };

  const token = localStorage.getItem("access_token");
  const GetRecipe = async () => {
    try {
      axios.defaults.headers.common.Authorization = token;
      const { data } = await axios.get(`/api/communities/list/cocktails`);
      if (data.success) {
        setList(data.data);
        // console.log("list is ", list);
        SetRecipe(list);
        // console.log("final is ", recipes);
      }
      const postingResponse = await axios.get(`/api/communities/${id}`);
      console.log("postingReponse is ", postingResponse.data);
      if (postingResponse.data.success) {
        setAddContent((prev) => ({
          ...prev,
          addContent: postingResponse.data.content,
        }));
        setAddTitle((prev) => ({
          ...prev,
          addTitle: postingResponse.data.title,
        }));
        setAddCategory((prev) => ({
          ...prev,
          addCategory: postingResponse.data.category,
        }));
        if (postingResponse.data.category === 1) {
          setTab("추천 이유");
          setAddCNO((prev) => ({
            ...prev,
            addCNO: null,
          }));
          setAddLike((prev) => ({
            ...prev,
            addLike: 0,
          }));
        } else if (postingResponse.data.category === 2) {
          setTab("질문 내용");
          setTab("추천 이유");
          setAddCNO((prev) => ({
            ...prev,
            addCNO: null,
          }));
          setAddLike((prev) => ({
            ...prev,
            addLike: 0,
          }));
        } else if (postingResponse.data.category === 3) {
          setTab("후기 내용");
          setTab("추천 이유");
          setAddCNO((prev) => ({
            ...prev,
            addCNO: null,
          }));
          setAddLike((prev) => ({
            ...prev,
            addLike: 0,
          }));
        } else if (postingResponse.data.category === 4) {
          setTab("글 내용");
          setTab("추천 이유");
          setAddCNO((prev) => ({
            ...prev,
            addCNO: null,
          }));
          setAddLike((prev) => ({
            ...prev,
            addLike: 0,
          }));
        }
        if (postingResponse.data.cno) {
          setAddCNO((prev) => ({
            ...prev,
            addCNO: postingResponse.data.cno,
          }));
          setAddLike((prev) => ({
            ...prev,
            addLike: postingResponse.data.cocktailLike,
          }));
        }
        for (let i = 0; i < postingResponse.data.images.length; i++) {
          const file = await convertURLtoFile(
            `${process.env.REACT_APP_BACKEND_BASE_URL}communities/one/image?imageId=${postingResponse.data.images[i]}`
          );
          console.log("file is ", file, "files is ", defaultFiles);
          defaultFiles.push(file);
        }
        //   setUserInfo(userInfoResponse.data.data);
        console.log("data here ", data);
      }
    } catch (error) {
      console.log("err is ", error);
    }
  };
  const SetRecipe = (data) => {
    const newList = data.map((item) => {
      const [name, num] = item.split("/");
      return { name, num };
    });
    // console.log("what's wrong");
    return setRecipes(newList);
  };

  useEffect(() => {
    GetRecipe();
    setIsLoading(false);
  }, []);
  useEffect(() => {
    SetRecipe(list);
    setIsLoading(false);
  }, [list]);
  const setToastState = useSetRecoilState(toastState);

  const handleSubmit = () => {
    if (addTitle === "" || addContent === "") {
      setWarning("* 제목과 내용은 필수 입력 항목입니다.");
    } else {
      // console.log("file handed to postCommunity is ", files);
      editCommunity({
        like: addLike,
        content: addContent,
        title: addTitle,
        cno: addCNO,
        category: addCategory,
        files,
      })
        .then((response) => {
          console.log("edit response is ", response);

          if (response.success) {
            setToastState({
              show: true,
              message: "수정이 완료되었습니다.",
              type: "success",
              ms: 3000,
            });
            // setCommunityImg("");
            navigate(-1);
          } else {
            setToastState({
              show: true,
              message: "수정에 실패했습니다.",
              type: "error",
              ms: 3000,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Title title="커뮤니티" />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Background>
          <MiniTitle>글 작성</MiniTitle>
          <Section>
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
              ) : tab === "후기 내용" ? (
                <Autocomplete
                  disablePortal
                  id="autocompleteCocktail"
                  options={recipes}
                  defaultValue={{ name: addTitle, num: addCNO }}
                  getOptionLabel={(option) => option.name || ""}
                  onChange={(event, value) => {
                    onChangeAutoComplete(event, value);
                    // console.log("event value is ", value);
                  }}
                  sx={{
                    width: 300,
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        border: "none",
                      },
                    "& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover":
                      {
                        // 👇 Customize the hover bg color here
                        backgroundColor: "#e9aa33",
                        color: "black",
                      },
                    // 👇 Optional: keep this one to customize the selected item when hovered
                    "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']:hover":
                      {
                        backgroundColor: "#e9aa33",
                        color: "black",
                      },
                  }}
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      label=""
                      className="selection"
                      fullWidth
                    />
                  )}
                  PaperComponent={(props) => (
                    <Paper
                      sx={{
                        background: "#3e3e3e",
                        color: "white",
                        fontSize: "0.9rem",
                      }}
                      {...props}
                    />
                  )}
                />
              ) : (
                <>
                  <Input
                    placeholder={tab === "후기 내용" ? "칵테일 이름" : "제목"}
                    className="input-title"
                    onChange={(e) => {
                      handleTitle(e);
                    }}
                    value={addTitle}
                  />
                </>
              )}
              <Textarea
                rows={15}
                onChange={(e) => {
                  handleContent(e);
                }}
                value={addContent}
                placeholder={
                  tab === "질문 내용"
                    ? "질문글은 수정, 삭제가 불가하니 신중히 작성해주세요."
                    : tab
                }
              />
            </MainSection>
            <span className="warning">{warning}</span>

            <ImageSection>
              <ImageUpload defaultFiles={defaultFiles} />
            </ImageSection>
            {tab === "후기 내용" ? (
              <RecommendationSection>
                <div>이 칵테일을 추천하시나요?</div>
                <div>
                  <span
                    onClick={() => handleLike(1)}
                    className={selectLike === true ? "selected" : ""}
                  >
                    추천합니다!
                    <AiFillHeart className="icon" />
                  </span>
                  <span
                    onClick={() => handleLike(0)}
                    className={selectLike === false ? "selected" : ""}
                  >
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
              <Button className="ok" onClick={() => handleSubmit()}>
                확인
              </Button>
            </BottomSection>
          </Section>
        </Background>
      )}
    </main>
  );
};

export default CommunityEditingPage;

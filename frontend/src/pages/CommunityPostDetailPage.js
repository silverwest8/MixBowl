// import Textarea from "../components/common/Textarea";
import styled from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Title from "../components/common/Title";
import { FaThumbsUp } from "react-icons/fa";
import MemberBadge from "../components/common/MemberBadge";
import DropdownMenu from "../components/common/DropdownMenu";
import { MdArrowBackIosNew } from "react-icons/md";
import Textarea from "../components/common/Textarea";
import CommentItem from "../components/community/CommentItem";
import AnswerItem from "../components/community/AnswerItem";
import ReportModal from "../components/common/ReportModal";
import { useModal } from "../hooks/useModal";
import { toastState } from "../store/toast";
import { useSetRecoilState } from "recoil";
import { getAccessToken } from "../utils/token";
import axios from "axios";
import ImageSliderModal from "../components/common/ImageSliderModal";
import { getCommunityImageUrl } from "../utils/image";

const Background = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 10rem;
  height: 100%;
  .icon {
    margin-right: 0.6rem;
    font-size: 1.5rem;
    &:hover {
      color: ${({ theme }) => theme.color.primaryGold};
      cursor: pointer;
    }
  }
  @media screen and (max-width: 400px) {
    padding: 1rem 0.5rem;
  }
`;

const EntireSection = styled.div`
  width: 45vw;
  @media screen and (max-width: 500px) {
    width: 60vw;
  }
  @media screen and (max-width: 800px) {
    width: 83vw;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
  .none {
    display: none;
  }
`;
const ReportButton = styled.div`
  flex: 1 0 auto;
  margin-left: 1rem;
  padding: 0.2rem 1rem;
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 5px;
  font-size: 0.75rem;
  max-height: 1.5rem;
  max-width: 3.5rem;
  color: ${({ theme }) => theme.color.primaryGold};
  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.color.primaryGold};
  }
`;

const ImageSection = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  & > div {
    position: relative;
    width: 10rem;
    height: 10rem;
    border-radius: 10px;
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.color.primaryGold};
    border-radius: 20px;
    overflow: hidden;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    & > .box {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      border-radius: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1rem;
      color: ${({ theme }) => theme.color.primaryGold};
    }
  }
`;

const TopMost = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: color-interpolation-filters;
  > span {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.color.primaryGold};
  }
`;

const Username = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  > span {
    margin-right: 0.5rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  > div:first-child {
    font-size: 1rem;
    margin-bottom: 3rem;
  }
  > hr {
    color: ${({ theme }) => theme.color.primaryGold};
    margin-top: 1rem;
  }
`;
const BottomInfo = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: end;
    .liked {
      color: ${({ theme }) => theme.color.primaryGold};
      &:hover {
        color: ${({ theme }) => theme.color.secondGold};
      }
    }
  }
`;
const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  > ul {
    margin-top: 2rem;
  }
  > div:first-child {
    > div {
      display: flex;
      align-items: end;
    }
  }
`;
const CommentButton = styled.div`
  border-radius: 10px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  background-color: ${({ theme }) => theme.color.primaryGold};
  cursor: pointer;
`;
const CommunityPostDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;
  const [post, setPost] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { openModal, closeModal } = useModal();
  const token = localStorage.getItem("access_token");
  const GetPost = async () => {
    try {
      // setLiked(postData[id].liked);
      axios.defaults.headers.common.Authorization = token;
      const { data } = await axios.get(`/api/communities/${id}`);
      console.log("data here ", data);
      setPost(data);
      setLikeCount(data.like);
      setLiked(data.isUserLike);
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    if (token) {
      GetPost();
    } else {
      navigate(`/login?return_url=/community/${post.postId}`);
    }
  }, []);

  const [comment, setComment] = useState("");
  const onChangeComment = (e) => {
    setComment(e.target.value);
  };
  const registerComment = async () => {
    const { data } = await axios.post(`/api/communities/reply/${post.postId}`, {
      content: comment,
    });
    console.log("registered comment is ", data);
    if (data.success) {
      setToastState({
        show: true,
        message: "댓글이 작성되었습니다.",
        type: "success",
      });
      setComment("");
      window.location.reload();
    } else {
      setToastState({
        show: true,
        message: "댓글 작성에 실패하였습니다.",
        type: "error",
      });
    }
  };
  const changeLike = async () => {
    try {
      axios.defaults.headers.common.Authorization = token;
      const { data } = await axios.post(`/api/communities/like/${post.postId}`);
      // console.log("liked is ", data);
      if (data.success) {
        if (liked) {
          setLikeCount(likeCount - 1);
        } else {
          setLikeCount(likeCount + 1);
        }
      }
    } catch (error) {
      return error.message;
    }

    setLiked(!liked);
  };
  const setToastState = useSetRecoilState(toastState);

  const submitReport = async () => {
    try {
      axios.defaults.headers.common.Authorization = token;
      const { data } = await axios.post(
        `/api/communities/report/${post.postId}`
      );
      console.log("report data is ", data);
      if (data.success) {
        setTimeout(() => {
          setToastState({
            show: true,
            message: "신고가 완료되었습니다.",
            type: "success",
            ms: 1000,
          });
        }, 300);
        closeModal();
      } else {
        setTimeout(() => {
          setToastState({
            show: true,
            message: "이미 신고 완료된 게시물입니다.",
            type: "error",
            ms: 1000,
          });
        }, 300);
        closeModal();
      }
    } catch (error) {
      console.log("report error is ", error);
    }
  };
  const onClickImage = ({ images, initialImageIndex }) => {
    openModal(ImageSliderModal, {
      handleClose: closeModal,
      images,
      initialImageIndex,
    });
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
      <Background>
        <EntireSection>
          <TopSection>
            <TopMost>
              <Link to={"/community/board"}>
                <MdArrowBackIosNew className="icon" />
              </Link>
              <span>
                {post.category === 2
                  ? "질문과 답변"
                  : post.category === 4
                  ? "자유 게시글"
                  : post.category === 3
                  ? "칵테일 리뷰"
                  : post.category === 1
                  ? "칵테일 추천"
                  : ""}
              </span>
            </TopMost>
            <Username>
              <span>{post.username}</span>
              <MemberBadge level={post.userlevel} />
            </Username>
            <TitleContainer className={post.category === 2 ? "none" : ""}>
              <span>{post.title}</span>
              {/* TODO: 로그인 시 달라지게, 지금은 임시로 넣어둠 */}
              {post.isWriter ? (
                <DropdownMenu />
              ) : (
                <ReportButton
                  onClick={() =>
                    openModal(ReportModal, {
                      handleClose: closeModal,
                      onSubmit: submitReport,
                    })
                  }
                >
                  신고
                </ReportButton>
              )}
            </TitleContainer>
          </TopSection>
          <MainSection>
            <div>{post.content}</div>
            <ImageSection>
              {post.images &&
                post.images.slice(0, 3).map((imageId, index) => (
                  <div
                    key={imageId}
                    onClick={() =>
                      onClickImage({
                        images: post.images.map((imageId) =>
                          getCommunityImageUrl(imageId)
                        ),
                        initialImageIndex: index,
                      })
                    }
                  >
                    <img src={getCommunityImageUrl(imageId)} />
                    {index === 2 && post.images.length - index - 1 > 0 && (
                      <div className="box">
                        + {post.images.length - index - 1}
                      </div>
                    )}
                  </div>
                ))}
            </ImageSection>
            <BottomInfo>
              <span>{post.createdAt && post.createdAt.slice(0, 10)}</span>
              <div>
                <FaThumbsUp
                  className={liked ? "icon liked" : "icon"}
                  onClick={changeLike}
                />
                {likeCount}
              </div>
            </BottomInfo>
            <hr />
          </MainSection>
          <CommentSection>
            <Textarea
              placeholder="당신의 의견을 댓글로 남겨 주세요!"
              rows={3}
              onChange={onChangeComment}
              value={comment}
              Button={
                <CommentButton type="button" onClick={registerComment}>
                  댓글 등록
                </CommentButton>
              }
            />
            {post.category === 2 ? (
              <ul>
                {post.replies &&
                  post.replies.map((el) => (
                    <AnswerItem data={el} key={el.replyId} />
                  ))}
              </ul>
            ) : (
              <ul>
                {post.replies &&
                  post.replies.map((el) => (
                    <CommentItem
                      data={el}
                      key={el.replyId}
                      comment={comment}
                      setComment={setComment}
                    />
                  ))}
              </ul>
            )}
          </CommentSection>
        </EntireSection>
      </Background>
    </main>
  );
};

export default CommunityPostDetailPage;
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import MemberBadge from "../common/MemberBadge";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getTimeForToday } from "../../utils/date";

const RecipeComment = () => {
  const [comment, setComment] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const GetComment = async () => {
    try {
      const { data } = await axios.get(`/api/recipes/detail/review/${id}`);
      setComment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetComment();
  }, []);

  return (
    <Comment>
      <TopBox>
        <p>
          리뷰<span>{comment && `(${comment.count})`}</span>
        </p>
        <PostButton
          onClick={() =>
            navigate("/community/posting", { state: { category: 3 } })
          }
        >
          <FaPen className="pen" /> 작성하기
        </PostButton>
      </TopBox>
      {comment &&
        (comment.list.length !== 0 ? (
          comment.list.map((item) => (
            <CommentBox key={item}>
              <div className="user">
                @{item.UNO_USER.nickname}
                <MemberBadge level={item.UNO_USER.level} />
              </div>
              <div className="text">{item.content}</div>
              <div className="day">{getTimeForToday(item.date)}</div>
              <HorizonLine></HorizonLine>
            </CommentBox>
          ))
        ) : (
          <p className="empty-message">리뷰가 없습니다.</p>
        ))}
    </Comment>
  );
};

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  p {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    span {
      font-size: 1rem;
      margin-left: 0.25rem;
    }
  }
`;

const CommentBox = styled.div`
  > div {
    margin-top: 1rem;
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
  }
  .day {
    display: flex;
    justify-content: flex-end;
    color: ${({ theme }) => theme.color.gray};
  }
  .text {
    font-size: 1rem;
  }
  .user {
    display: flex;
    div {
      margin-left: 0.25rem;
    }
  }
`;

const HorizonLine = styled.p`
  border: 0.1rem solid #e9aa33;
  line-height: 0.1em;
  margin: auto;
  transform: scaleY(0.5);
`;

const Comment = styled.div`
  width: 50vw;
  margin: 0 auto 4rem;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 840px) {
    width: 70vw;
  }
  .empty-message {
    color: ${({ theme }) => theme.color.gray};
    margin-top: 1rem;
    text-align: center;
  }
`;

const PostButton = styled.button`
  background-color: #e9aa33;
  border-radius: 0.75rem;
  width: 4.5rem;
  height: 1.5rem;
  color: #383835;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;
export default RecipeComment;

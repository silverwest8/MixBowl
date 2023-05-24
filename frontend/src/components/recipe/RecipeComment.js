import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import MemberBadge from "../common/MemberBadge";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const RecipeComment = () => {
  const [comment, setComment] = useState(null);
  const params = useParams();
  const id = params.id;

  const GetComment = async () => {
    try {
      const { data } = await axios.get(`/api/recipes/detail/review/${id}`);
      setComment(data.data);
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    GetComment();
  }, []);

  return (
    <Comment>
      <TopBox>
        <p>
          리뷰<span>({comment && comment.count})</span>
        </p>
        <Link to="/community">
          <PostButton>
            <FaPen className="pen"></FaPen>작성하기
          </PostButton>
        </Link>
      </TopBox>
      {comment &&
        comment.list.map((item) => (
          <CommentBox key={item}>
            <div className="user">
              @{item.UNO_USER.nickname}
              <MemberBadge level={item.UNO_USER.level} />
            </div>
            <div className="text">{item.content}</div>
            <div className="day">{item.date.slice(0, 10)}</div>
            <HorizonLine></HorizonLine>
          </CommentBox>
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
  margin: auto;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 840px) {
    width: 70vw;
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
  .pen {
    margin-right: 0.1rem;
  }
`;
export default RecipeComment;

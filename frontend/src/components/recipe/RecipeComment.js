import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import MemberBadge from "../common/MemberBadge";

const RecipeComment = () => {
  return (
    <Comment>
      <TopBox>
        <p>
          리뷰<span>(10)</span>
        </p>
        <PostButton>
          <FaPen className="pen"></FaPen>작성하기
        </PostButton>
      </TopBox>
      {[1, 2, 3].map((index) => (
        <CommentBox key={index}>
          <p className="user">
            @닉네임
            <MemberBadge level={2} />
          </p>
          <p className="text">
            후기 텍스트입니다. 후기 텍스트입니다. 후기 텍스트입니다. 후기
            텍스트입니다. 후기 텍스트입니다. 후기 텍스트입니다. 후기
            텍스트입니다. 후기 텍스트입니다. 후기 텍스트입니다. 후기
            텍스트입니다. 후기 텍스트입니다. 후기 텍스트입니다. 후기
            텍스트입니다. 후기 텍스트입니다. 후기 텍스트입니다. 후기
            텍스트입니다. 후기 텍스트입니다. 후기 텍스트입니다. 후기
            텍스트입니다. 후기 텍스트
          </p>
          <p className="day">12시간전</p>
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
    font-size: 1.25rem;
    span {
      font-size: 1rem;
      margin-left: 0.25rem;
    }
  }
`;

const CommentBox = styled.div`
  p {
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

const HorizonLine = styled.div`
  border: 0.1rem solid #e9aa33;
  line-height: 0.1em;
  margin: auto;
  transform: scaleY(0.5);
`;

const Comment = styled.div`
  width: 65%;
  margin: auto;
  display: flex;
  flex-direction: column;
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

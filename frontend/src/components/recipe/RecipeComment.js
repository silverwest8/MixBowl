import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import MemberBadge from "../common/MemberBadge";
import Textarea from "../common/Textarea";
import Modal from "../common/Modal";
import { useModal } from "../../hooks/useModal";
import { useSetRecoilState } from "recoil";
import { toastState } from "../../store/toast";
import axios from "axios";
import { useParams } from "react-router-dom";

const CommentModal = ({ handleClose }) => {
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const setToastState = useSetRecoilState(toastState);
  const handleMsg = (e) => {
    setMsg(e.target.value);
  };

  const onSubmit = () => {
    if (msg === "") {
      setErrorMsg("* 댓글을 입력해주세요");
    } else {
      ToastMessageEnter();
      console.log("댓글작성완료");
      handleClose();
    }
  };

  const ToastMessageEnter = () => {
    setToastState({
      show: true,
      message: "작성이 완료되었습니다.",
      type: "success",
      ms: 2000,
    });
  };

  return (
    <Modal
      handleClose={handleClose}
      onCancel={handleClose}
      title="댓글 작성"
      onSubmit={onSubmit}
    >
      <Msg>{errorMsg && <p className="errmessage">{errorMsg}</p>}</Msg>
      <Textarea
        onChange={handleMsg}
        rows={3}
        cols={40}
        name="detail"
        messageType="error"
        placeholder="레시피에 대한 댓글을 남겨주세요."
      />
    </Modal>
  );
};

const RecipeComment = () => {
  const [comment, setComment] = useState([]);
  const { openModal, closeModal } = useModal();
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
          리뷰<span>({comment.list && comment.list.count})</span>
        </p>
        <PostButton
          onClick={() => {
            openModal(CommentModal, {
              handleClose: closeModal,
            });
          }}
        >
          <FaPen className="pen"></FaPen>작성하기
        </PostButton>
      </TopBox>
      {[1, 2, 3, 4].map((index) => (
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
  width: 50vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 840px) {
    width: 70vw;
  }
`;

const Msg = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.red};
  margin-bottom: 0.25rem;
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

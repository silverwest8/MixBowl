import styled from "styled-components";
import MemberBadge from "../common/MemberBadge";
import DropdownMenu from "../common/DropdownMenu";
import ReportModal from "../common/ReportModal";
import { useModal } from "../../hooks/useModal";
import { toastState } from "../../store/toast";
import { useSetRecoilState, useRecoilState } from "recoil";
import ReplyDeleteModal from "./ReplyDeleteModal";
import {
  commentState,
  checkEditState,
  replyState,
} from "../../store/community";
import { editComment } from "../../api/community";

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

const CommentItem = ({ data }) => {
  console.log("comment item is ", data.CONTENT);
  const [comment, setComment] = useRecoilState(commentState);
  const [checkEdit, setCheckEdit] = useRecoilState(checkEditState);
  const [replyId, setReplyId] = useRecoilState(replyState);
  const { openModal, closeModal } = useModal();
  const onClickEditMenu = async (id, comment) => {
    setComment(comment);
    setCheckEdit(true);
    setReplyId(id);
    window.scrollTo({
      top: 10,
      behavior: "smooth",
    });
    console.log("content is ", comment);
  };
  const onClickDeleteMenu = (id) => {
    openModal(ReplyDeleteModal, {
      handleClose: closeModal,
      id,
    });
  };
  return (
    <ItemContainer>
      <TopSection>
        <div>
          <span>{data.NICKNAME}</span>
          <MemberBadge level={data.LEVEL} />
        </div>
        {data.isReplyWriter ? (
          <DropdownMenu
            handlers={[
              () => onClickEditMenu(data.replyId, data.CONTENT),
              () => onClickDeleteMenu(data.replyId),
            ]}
          />
        ) : (
          ""
        )}
      </TopSection>
      <p>{data.CONTENT}</p>
      <DateContainer>{data.createdAt.slice(0, 10)}</DateContainer>
    </ItemContainer>
  );
};

const ItemContainer = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0 1rem 0;
  font-size: 1rem;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.darkGray};
  > p {
    width: 100%;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  > div:first-child {
    display: flex;
    align-items: center;
    > span {
      margin-right: 0.5rem;
    }
  }
`;
const DateContainer = styled.div`
  text-align: right;
  width: 100%;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.color.gray};
`;
export default CommentItem;

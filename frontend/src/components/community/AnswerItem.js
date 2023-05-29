import styled from "styled-components";
import MemberBadge from "../common/MemberBadge";
import DropdownMenu from "../common/DropdownMenu";
import ReportModal from "../common/ReportModal";
import { useModal } from "../../hooks/useModal";
import ReplyDeleteModal from "./ReplyDeleteModal";
import { toastState } from "../../store/toast";
import { useSetRecoilState } from "recoil";

const AnswerItem = ({ data }) => {
  const { openModal, closeModal } = useModal();
  const setToastState = useSetRecoilState(toastState);

  const submitReport = () => {
    // TODO
    // report 수 증가?
    setTimeout(() => {
      setToastState({
        show: true,
        message: "신고가 완료되었습니다.",
        type: "success",
        ms: 1000,
      });
    }, 300);
    closeModal();
  };
  const onClickEditMenu = async (replyId, comment) => {
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
      <FirstSection>
        <div>
          <span>{data.NICKNAME}</span>
          <MemberBadge level={data.LEVEL} />
        </div>
        <div>{data.createdAt.slice(0, 10)}</div>
      </FirstSection>
      <div className="answer-container">
        <div className="answer-box">
          <p>{data.CONTENT}</p>
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
        </div>
      </div>
    </ItemContainer>
  );
};
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

const ItemContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0 1.5rem 0;
  font-size: 1rem;
  width: 100%;
  > p {
    width: 100%;
  }
  .answer-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 5%;
  }

  .answer-container::before {
    content: "";
    top: 50%;
    left: 1em;
    border: 1rem solid transparent;
    border-right: 1em solid ${({ theme }) => theme.color.darkGray};
    z-index: 0;
  }
  .answer-box {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: start;
    background: ${({ theme }) => theme.color.darkGray};
    border-radius: 15px;
    padding: 1.5rem;
    font-size: 1rem;
    > p {
      margin-right: 0.3rem;
    }
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const FirstSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 8rem;
  text-align: center;
  align-items: center;
  margin-bottom: 1rem;
  > div:first-child {
    display: flex;
    align-items: center;
    > span {
      margin-right: 0.5rem;
    }
    > div {
      flex: 1 0 auto;
      @media screen and (max-width: 700px) {
        flex: 0 0 auto;
      }
    }
    @media screen and (max-width: 700px) {
      justify-content: start;
      width: 100%;
    }
  }
  > div:last-child {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.color.gray};
    margin-top: 0.2rem;
    @media screen and (max-width: 700px) {
      text-align: left;
      width: 100%;
    }
  }
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
// const DateContainer = styled.div`
//   text-align: right;
//   width: 100%;
//   margin-bottom: 0.5rem;
// `;
export default AnswerItem;

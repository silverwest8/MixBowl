import styled from "styled-components";
import MemberBadge from "../common/MemberBadge";
import DropdownMenu from "../common/DropdownMenu";
import ReportModal from "../common/ReportModal";
import { useModal } from "../../hooks/useModal";
import { toastState } from "../../store/toast";
import { useSetRecoilState } from "recoil";

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
  return (
    <ItemContainer>
      <TopSection>
        <div>
          <span>{data.NICKNAME}</span>
          <MemberBadge level={data.level} />
        </div>
        {data.isReplyWriter ? (
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

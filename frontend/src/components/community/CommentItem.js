import styled from "styled-components";
import MemberBadge from "../common/MemberBadge";
import DropdownMenu from "../common/DropdownMenu";

const CommentItem = ({ data }) => {
  return (
    <ItemContainer>
      <TopSection>
        <div>
          <span>{data.username}</span>
          <MemberBadge level={data.userlevel} />
        </div>
        <DropdownMenu />
      </TopSection>
      <p>{data.content}</p>
      <DateContainer>{data.date}</DateContainer>
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
`;
export default CommentItem;

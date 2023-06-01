import styled from "styled-components";
import { Link } from "react-router-dom";
import { getKeyword } from "../../utils/keyword";

const ReviewItem = ({ data }) => {
  console.log("reviewItems is ", data);
  return (
    <ItemContainer>
      <ItemWrapper to={`/cocktailbar/${data.placeId}`}>
        <p>{data.text}</p>
        <div>
          <div className="hidden">
            {data.keyword &&
              data.keyword.map(
                (id) =>
                  id && (
                    <Button className="hidden" key={id}>
                      {getKeyword(id).value}
                    </Button>
                  )
              )}
          </div>
          <DateContainer>{data.placeName}</DateContainer>
        </div>
      </ItemWrapper>
    </ItemContainer>
  );
};

const ItemContainer = styled.li`
  width: 100%;
  list-style: none;
`;
const ItemWrapper = styled(Link)`
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
  > div:last-child {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: end;
    > div {
      display: flex;
    }
  }
  @media screen and (max-width: 800px) {
    .hidden {
      display: none;
    }
    .hidden:last-child {
      display: inline;
    }
  }
`;
const Button = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 15px;
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 0.7rem;
`;

const DateContainer = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.gray};
`;
export default ReviewItem;

import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ReviewList from "./ReviewList";

const CocktailBarItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Section>
      <Header onClick={() => navigate(`/cocktailbar/${item.kakao_data.id}`)}>
        <h1 className="place">{item.kakao_data.place_name}</h1>
        {item.total_rate && (
          <div>
            <FaStar />
            <span>{Number(item.total_rate).toFixed(2)}</span>
          </div>
        )}
      </Header>
      <p className="address">{item.kakao_data.address_name}</p>
      {item.keyword.filter((word) => word !== null).length !== 0 && (
        <ul className="keyword-list">
          {item.keyword.map((word) => word && <li key={word}>{word}</li>)}
        </ul>
      )}
      <ReviewList
        cnt={item.review.review_cnt}
        reviewList={item.review.review_list}
        name={item.kakao_data.place_name}
        id={item.kakao_data.id}
      />
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  .place {
    font-weight: bold;
    font-size: 1.125rem;
    color: ${({ theme }) => theme.color.primaryGold};
  }
  .address {
    font-size: 0.8rem;
  }
  .keyword-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1.125rem;
    li {
      flex-shrink: 0;
      padding: 0.375rem;
      border-radius: 12px;
      font-size: 0.8rem;
      color: black;
      background-color: ${({ theme }) => theme.color.primaryGold};
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.8rem;
    span {
      margin-top: 1px;
    }
  }
  svg {
    color: ${({ theme }) => theme.color.red};
  }
`;

export default CocktailBarItem;

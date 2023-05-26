import styled from "styled-components";
import { FaChevronLeft, FaStar } from "react-icons/fa";
import { useQueries } from "@tanstack/react-query";
import ReviewList from "./ReviewList";
import { useSetRecoilState } from "recoil";
import { mapState } from "../../store/map";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCocktailBar, getReview } from "../../api/cocktailbar";

const CocktailbarDetail = ({ id }) => {
  const navigate = useNavigate();
  const setMapState = useSetRecoilState(mapState);
  const [{ data: detailData }, { data: reviewData }] = useQueries({
    queries: [
      {
        queryKey: ["cocktail bar detail", id],
        queryFn: getCocktailBar,
        onError: (error) => {
          if (error.response.status === 401)
            navigate(`/login?return_url=${window.location.pathname}`);
        },
      },
      {
        queryKey: ["cocktail bar review", id],
        queryFn: getReview,
        onError: (error) => {
          if (error.response.status === 401)
            navigate(`/login?return_url=${window.location.pathname}`);
        },
      },
    ],
  });
  useEffect(() => {
    if (detailData) {
      setMapState((state) => ({
        ...state,
        data: [
          {
            x: detailData.data.X,
            y: detailData.data.Y,
            name: detailData.data.NAME,
            id: detailData.data.PLACE_ID,
          },
        ],
      }));
    }
  }, [detailData]);

  return (
    detailData !== undefined &&
    reviewData !== undefined && (
      <Section>
        <Header>
          <button onClick={() => navigate("/cocktailbar")}>
            <FaChevronLeft />
          </button>
          <h1 className="place">{detailData.data.NAME}</h1>
          {detailData.data.AVG_RATING && (
            <div className="rating">
              <FaStar />
              <span>{Number(detailData.data.AVG_RATING).toFixed(2)}</span>
            </div>
          )}
        </Header>
        <p className="address">{detailData.data.ROAD_ADDRESS}</p>
        {reviewData.data.keyword.filter((word) => word !== null).length !==
          0 && (
          <ul className="keyword-list">
            {reviewData.data.keyword.map(
              (word) => word && <li key={word}>{word}</li>
            )}
          </ul>
        )}
        <ReviewList
          cnt={reviewData.data.total_cnt}
          reviewList={reviewData.data.list}
          name={detailData.data.NAME}
          placeId={detailData.data.PLACE_ID}
        />
      </Section>
    )
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  .rating > svg {
    color: ${({ theme }) => theme.color.red};
  }
  .place {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.color.primaryGold};
  }
`;

export default CocktailbarDetail;

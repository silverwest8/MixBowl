import styled from "styled-components";
import { FaHotjar, FaThumbsUp, FaCommentDots } from "react-icons/fa";
import MemberBadge from "../common/MemberBadge";
import { getCommunity } from "../../api/homeapi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { theme } from "../../styles/theme";
import { getCategoryById } from "../../utils/category";
import { getTimeForToday } from "../../utils/date";

const HomeCommunity = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const communityData = await getCommunity();
      setData(communityData);
    };
    fetchData();
  }, []);

  return (
    <Section>
      <HomeTitleBox>
        <FaHotjar className="logo"></FaHotjar>
        <p>이번주 커뮤니티 인기글</p>
      </HomeTitleBox>
      <GridBox>
        {data
          ? data.list.slice(0, 4).map((item) => (
              <Link to={`/community/${item.postId}`} key={item.postId}>
                <ItemBox>
                  <div className="title">
                    <h4>{item.title}</h4>
                    <p>{getCategoryById(item.category).value}</p>
                  </div>
                  <p className="content">{item.content}</p>
                  <div className="info">
                    <div>
                      <div className="thumbs">
                        <FaThumbsUp /> {item.like}
                      </div>
                      <div className="comment">
                        <FaCommentDots /> {item.reply}
                      </div>
                    </div>
                    <div>
                      <p className="day"> {getTimeForToday(item.date)}</p>
                      {item.USER.nickname}
                      <MemberBadge level={item.USER.level}></MemberBadge>
                    </div>
                  </div>
                </ItemBox>
              </Link>
            ))
          : Array(3)
              .fill(1)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  width="100%"
                  height="10rem"
                  sx={{
                    backgroundColor: theme.color.darkGray,
                  }}
                />
              ))}
      </GridBox>
    </Section>
  );
};

const Section = styled.div`
  padding: 0 1rem;
  margin: 2rem auto 2rem;
  max-width: 1144px;
`;

const HomeTitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  .logo {
    color: ${({ theme }) => theme.color.red};
    margin-right: 0.75rem;
  }
  p {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  @media screen and (max-width: 920px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0.875rem 1.4rem;
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 0.75rem;
  div {
    display: flex;
  }
  .title {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    gap: 0.5rem;
    h4 {
      font-size: 1.125rem;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.primaryGold};
      flex-shrink: 0;
    }
  }
  .content {
    margin-bottom: 1.75rem;
    font-size: 0.875rem;
    line-height: 150%;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow-y: hidden;
    text-overflow: ellipsis;
  }
  .info {
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    .thumbs {
      color: ${({ theme }) => theme.color.primaryGold};
      margin-right: 0.5rem;
    }
    .comment {
      color: ${({ theme }) => theme.color.lightGray};
    }
    .day {
      color: ${({ theme }) => theme.color.lightGray};
      margin-right: 0.5rem;
    }
    div {
      align-items: center;
      gap: 0.25rem;
    }
  }
`;

export default HomeCommunity;

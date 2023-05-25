import styled from "styled-components";
import { FaHotjar, FaThumbsUp, FaCommentDots } from "react-icons/fa";
import MemberBadge from "../common/MemberBadge";
import { getCommunity } from "../../api/homeapi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { theme } from "../../styles/theme";

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
              <ItemBox key={item.postId}>
                <div className="title">
                  <Link to={`/community/${item.postId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <p>자유게시판</p>
                </div>
                <div className="content">
                  <Link to={`/community/${item.postId}`}>
                    <p>{item.content}</p>
                  </Link>
                </div>
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
                    <p className="day"> {item.date.slice(0, 10)}</p>
                    {item.USER.nickname}
                    <MemberBadge level={item.USER.level}></MemberBadge>
                  </div>
                </div>
              </ItemBox>
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
  margin: 2rem auto 0;
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
  @media screen and (max-width: 720px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ItemBox = styled.div`
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
    h4 {
      font-size: 1.125rem;
      font-weight: bold;
    }
    p {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.primaryGold};
    }
  }
  .content {
    margin-bottom: 1.75rem;
    p {
      font-size: 0.875rem;
    }
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

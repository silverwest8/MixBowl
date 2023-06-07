import CocktailBarItem from "./CocktailbarItem";
import SearchBar from "../common/SearchBar";
import Skeleton from "@mui/material/Skeleton";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { mapState } from "../../store/map";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCocktailBarList } from "../../api/cocktailbar";
import { theme } from "../../styles/theme";
import { getAccessToken } from "../../utils/token";

const CocktailbarList = () => {
  const token = getAccessToken();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const query = params.get("query") || "";
  const [input, setInput] = useState(query);
  const [{ center, location, radius }, setMapState] = useRecoilState(mapState);
  const { data } = useQuery(
    ["cocktail bar list", center, query, radius],
    getCocktailBarList,
    {
      onSuccess: (data) => {
        console.log("success");
        setMapState((state) => ({
          ...state,
          loading: false,
          data: data.data.place_list.map((item) => ({
            id: item.kakao_data.id,
            x: item.kakao_data.x,
            y: item.kakao_data.y,
            name: item.kakao_data.place_name,
          })),
        }));
      },
      onError: (error) => {
        setMapState((state) => ({
          ...state,
          loading: false,
        }));
        if (error.response.status === 401)
          navigate(`/login?return_url=${window.location.href}`);
      },
    }
  );
  const onChange = (e) => setInput(e.target.value);
  const onSearch = () => {
    navigate(`/cocktailbar?query=${input}`);
  };
  const onClear = () => {
    params.delete("query");
    setInput("");
    navigate(`/cocktailbar${params.toString()}`, { replace: true });
  };
  return (
    <>
      {token && (
        <SearchBar
          placeholder="칵테일 바를 검색해보세요!"
          value={input}
          onChange={onChange}
          onSearch={onSearch}
          onClear={onClear}
          showCloseButton={query}
        />
      )}
      {!query && location && <Location>{location}</Location>}
      <List>
        {data ? (
          data.data.place_list.length !== 0 ? (
            data.data.place_list.map((item) => (
              <CocktailBarItem item={item} key={item.kakao_data.id} />
            ))
          ) : (
            <p className="message">검색 결과가 없습니다.</p>
          )
        ) : (
          Array(10)
            .fill(1)
            .map((_, index) => (
              <Skeleton
                variant="rounded"
                width="100%"
                height="8rem"
                key={index}
                sx={{
                  backgroundColor: theme.color.darkGray,
                }}
              />
            ))
        )}
      </List>
    </>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
  margin-top: 1.5rem;
  .message {
    text-align: center;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.lightGray};
  }
`;

const Location = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 1rem;
`;

export default CocktailbarList;

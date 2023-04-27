import axios from "axios";
import CocktailBarItem from "./CocktailbarItem";
import SearchBar from "../common/SearchBar";
import Skeleton from "@mui/material/Skeleton";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { mapState } from "../../store/map";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../utils/token";
import { theme } from "../../styles/theme";

const getBarList = async ({ queryKey }) => {
  const accessToken = getAccessToken();
  if (accessToken)
    axios.defaults.headers.common.Authorization = getAccessToken();
  if (queryKey[1] !== null) {
    const { data } = await axios.get(
      `/api/review/getList?query=${queryKey[2] || "칵테일 바"}&x=${
        queryKey[1].lng
      }&y=${queryKey[1].lat}&radius=${queryKey[3]}&sort=accuracy`
    );
    return data;
  } else return null;
};

const CocktailbarList = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const query = params.get("query") || "";
  const [input, setInput] = useState(query);
  const [{ center, location, radius }, setMapState] = useRecoilState(mapState);
  const { data } = useQuery(
    ["cocktail bar list", center, query, radius],
    getBarList,
    {
      onError: (error) => {
        if (error.response.status === 401)
          navigate("/login?return_url=/cocktailbar");
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
  useEffect(() => {
    if (data) {
      setMapState((state) => ({
        ...state,
        data: data.data.place_list.map((item) => ({
          id: item.kakao_data.id,
          x: item.kakao_data.x,
          y: item.kakao_data.y,
          name: item.kakao_data.place_name,
        })),
      }));
    }
  }, [data]);
  return (
    <>
      <SearchBar
        placeholder="칵테일 바를 검색해보세요!"
        value={input}
        onChange={onChange}
        onSearch={onSearch}
        onClear={onClear}
        showCloseButton={query}
      />

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

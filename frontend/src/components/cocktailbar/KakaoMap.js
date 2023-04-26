import React, { useEffect, useState } from "react";
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";
import { mapState } from "../../store/map";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiCurrentLocation } from "react-icons/bi";
import { FaSearchLocation } from "react-icons/fa";

function getDistance(lat1, lon1, lat2, lon2) {
  if (lat1 === lat2 && lon1 === lon2) return 0;
  console.log(lat1, lon1, lat2, lon2);
  const radLat1 = (Math.PI * lat1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radTheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344 * 1000;
  if (dist < 100) dist = Math.round(dist / 10) * 10;
  else dist = Math.round(dist / 100) * 100;
  console.log(dist < 0 ? 0 : dist > 20000 ? 20000 : dist);
  return dist < 0 ? 0 : dist > 20000 ? 20000 : dist;
}

function KakaoMap() {
  const navigate = useNavigate();
  const [center, setCenter] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [{ data }, setMapState] = useRecoilState(mapState);
  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCenter({
        lat: coords.latitude,
        lng: coords.longitude,
      });
      setMapState((state) => ({
        ...state,
        radius: 1000,
        center: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
      }));
    });
  };
  const getLocation = () => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const lng = map.getCenter().getLng();
    const lat = map.getCenter().getLat();
    geocoder.coord2RegionCode(lng, lat, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].region_type === "H") {
            setMapState((state) => ({
              ...state,
              location: `${result[i].region_1depth_name} ${result[i].region_2depth_name}`,
            }));
            break;
          }
        }
      }
    });
  };
  const searchCocktailbar = () => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const lng = map.getCenter().getLng();
    const lat = map.getCenter().getLat();
    const bounds = map.getBounds();
    geocoder.coord2RegionCode(lng, lat, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].region_type === "H") {
            setMapState((state) => ({
              ...state,
              center: {
                lng,
                lat,
              },
              radius: getDistance(lat, lng, bounds.qa, lng),
              location: `${result[i].region_1depth_name} ${result[i].region_2depth_name}`,
            }));
            break;
          }
        }
      }
    });
  };
  const renderMarkers = () => {
    if (data.length === 0) return;
    const bounds = new window.kakao.maps.LatLngBounds();
    const markers = [];
    for (let i = 0; i < data.length; i++) {
      markers.push({
        position: {
          lat: data[i].y,
          lng: data[i].x,
        },
        content: data[i].name,
        id: data[i].id,
      });
      bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
    }
    setMarkers(markers);
    map.setBounds(bounds); // 지도 범위 재설정
    getLocation();
  };

  // 현위치 가져오기
  useEffect(() => {
    getCurrentPosition();
  }, []);

  // 내 위치 (center) 기준 칵테일 바 가져오기
  useEffect(() => {
    if (!map || !data) return;
    renderMarkers();
  }, [map, data]);
  return center ? (
    <MapWrapper>
      <Map
        center={center}
        onCreate={setMap}
        onZoomChanged={() => {
          const lng = map.getCenter().getLng();
          const lat = map.getCenter().getLat();
          const bounds = map.getBounds();
          getDistance(lat, lng, bounds.qa, lng);
        }}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        {markers.map((marker) => (
          <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
            // 커스텀 오버레이가 표시될 위치입니다
            position={marker.position}
            clickable={true}
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          >
            {/* 커스텀 오버레이에 표시할 내용입니다 */}
            <Label onClick={() => navigate(`/cocktailbar/${marker.id}`)}>
              <span>{marker.content}</span>
            </Label>
          </CustomOverlayMap>
        ))}
      </Map>
      <ButtonWrapper>
        <button onClick={() => getCurrentPosition()}>
          <BiCurrentLocation />
        </button>
        <button onClick={() => searchCocktailbar()}>
          <FaSearchLocation />
        </button>
      </ButtonWrapper>
    </MapWrapper>
  ) : null;
}

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Label = styled.div`
  position: relative;
  border-radius: 6px;
  box-shadow: 0px 1px 2px #888;
  color: black;
  background-color: ${({ theme }) => theme.color.primaryGold};
  padding: 0.5rem 1rem;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: ${({ theme }) => theme.color.primaryGold};
    border-bottom: 0;
    margin-left: -10px;
    margin-bottom: -10px;
  }
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-top-color: #888;
    opacity: 0.4;
    border-bottom: 0;
    margin-left: -15px;
    margin-bottom: -11px;
    z-index: -1;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  button {
    background-color: white;
    color: black;
    border-radius: 8px;
    font-size: 1.5rem;
    z-index: 2;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 0.1rem;
  }
`;

export default React.memo(KakaoMap);

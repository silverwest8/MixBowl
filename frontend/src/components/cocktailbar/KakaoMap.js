import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";

function KakaoMap() {
  const [center, setCenter] = useState(null);
  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCenter({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    });
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return center ? (
    <Map center={center} style={{ width: "100%", height: "100%" }}>
      {/* <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
        <div style={{ color: "#000" }}>Hello World!</div>
      </MapMarker> */}
    </Map>
  ) : null;
}

export default React.memo(KakaoMap);

import { cloneElement, isValidElement, useEffect, useRef } from "react";

// 컴포넌트 바깥 클릭할 때 trigger 함수를 실행하는 컴포넌트
const OnClickOutside = ({ trigger, children }) => {
  const ref = useRef(null);
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      trigger();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return isValidElement(children)
    ? cloneElement(children, {
        ref,
      })
    : null;
};

export default OnClickOutside;

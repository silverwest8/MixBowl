import { cloneElement, isValidElement, useEffect, useRef } from "react";

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

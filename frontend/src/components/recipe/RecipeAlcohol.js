import Modal from "../common/Modal";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { alcoholState } from "../../store/recipe";
import { useRecoilState } from "recoil";

const RecipeAlcohol = ({ handleClose }) => {
  const [{ min, max }, setAlcohol] = useRecoilState(alcoholState);
  const marks = [
    {
      value: 0,
      label: "0°C",
    },
    {
      value: 100,
      label: "100°C",
    },
  ];
  const [value, setValue] = useState([min, max]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setAlcohol({
      min: value[0],
      max: value[1],
    });
  }, [value]);

  return (
    <Modal content="원하는 도수를 선택하세요" handleClose={handleClose}>
      <Box
        sx={{
          width: 200,
          marginTop: "3rem",
        }}
      >
        <Slider
          sx={{
            color: "#E9AA33",
            "& .MuiSlider-markLabel": {
              color: "white",
            },
            "& .MuiSlider-valueLabel": {
              bgcolor: "#E9AA33",
            },
          }}
          getAriaLabel={() => "Minimum distance"}
          value={value}
          defaultValue={(min, max)}
          onChange={handleChange}
          valueLabelDisplay="on"
          marks={marks}
          disableSwap
        />
      </Box>
    </Modal>
  );
};

export default RecipeAlcohol;

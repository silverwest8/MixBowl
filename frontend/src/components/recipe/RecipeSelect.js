import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { theme } from "../../styles/theme";
import RecipeInputBox from "./RecipeInputBox";
const OPTIONS = [
  "ml",
  "oz",
  "drops",
  "gram",
  "slice",
  "peel",
  "leaves",
  "dash",
  "개",
];

const RecipeSelect = ({ options }) => {
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setValue(event.target.innerText);
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <RecipeInputBox
          disabled={true}
          placeholder={"도수"}
          value={value}
        ></RecipeInputBox>
      </div>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            color: "white",
            width: "6rem",
            borderRadius: "12px",
            backgroundColor: theme.color.darkGray,
          },
        }}
      >
        {(options || OPTIONS).map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
            sx={{
              justifyContent: "center",
              fontSize: "0.875rem",
              ":hover": {
                color: theme.color.primaryGold,
              },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default RecipeSelect;

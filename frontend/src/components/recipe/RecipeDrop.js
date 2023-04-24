import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaSortAmountDown } from "react-icons/fa";
import { theme } from "../../styles/theme";

const OPTIONS = ["추천순", "최신순"];

const RecipeDrop = ({ options }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          color: theme.color.primaryGold,
          padding: 0,
        }}
      >
        <FaSortAmountDown />
      </IconButton>
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
            width: "6.875rem",
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

export default RecipeDrop;

import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaEllipsisV } from "react-icons/fa";
import { theme } from "../../styles/theme";

const OPTIONS = ["수정", "삭제"];

const DropdownMenu = ({ options, handlers }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    console.log(e);
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
          color: theme.color.lightGray,
          padding: 0,
        }}
      >
        <FaEllipsisV
          style={{
            fontSize: "1rem",
          }}
        />
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
            width: "6rem",
            borderRadius: "12px",

            backgroundColor: theme.color.darkGray,
          },
        }}
      >
        {(options || OPTIONS).map((option, index) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => {
              if (handlers && handlers[index]) handlers[index]();
              handleClose();
            }}
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

export default DropdownMenu;

import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { sortState } from "../../store/recipe";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaSortAmountDown } from "react-icons/fa";
import { theme } from "../../styles/theme";

const OPTIONS = ["최신순", "추천순"];

const RecipeDrop = ({ options }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const setArr = useSetRecoilState(sortState);
  const token = localStorage.getItem("access_token");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => () => {
    setAnchorEl(null);
    if (option === "최신순") {
      setArr((prevState) => ({
        ...prevState,
        latest: true,
        recommendation: false,
      }));
    } else if (option === "추천순") {
      setArr((prevState) => ({
        ...prevState,
        latest: false,
        recommendation: true,
      }));
    }
  };

  useEffect(() => {
    setArr({
      latest: false,
      recommendation: true,
    });
  }, []);

  return (
    <DropBox>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        disabled={!token}
        sx={{
          color: theme.color.lightGray,
          padding: 0,
        }}
      >
        <FaSortAmountDown
          style={{
            fontSize: "1.5rem",
            color: theme.color.primaryGold,
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
        {(options || OPTIONS).map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleOptionClick(option)}
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
    </DropBox>
  );
};

const DropBox = styled.div``;

export default RecipeDrop;

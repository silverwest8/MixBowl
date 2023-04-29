import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaEllipsisV } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { useModal } from "../../hooks/useModal";
import Modal from "../common/Modal";

const OPTIONS = ["수정", "삭제"];

const DropdownMenu = ({ options }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [Edit, setEdit] = useState(false);
  const [Delete, setDelete] = useState(false);
  const { openModal, closeModal } = useModal();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => {
    if (option === "수정") {
      setEdit(!Edit);
    }
    if (option === "삭제") {
      setDelete(true);
    }
    handleClose();
  };

  const DeleteModal = ({ handleClose }) => {
    setDelete(false);
    return (
      <Modal
        handleClose={handleClose}
        onCancel={handleClose}
        onConfirm={handleClose}
        title="레시피 삭제"
      >
        <p>레시피를 삭제하시겠습니까?</p>
      </Modal>
    );
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
        {(options || OPTIONS).map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => {
              handleOptionClick(option);
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
      {Delete === true
        ? openModal(DeleteModal, { handleClose: closeModal })
        : null}
    </div>
  );
};

export default DropdownMenu;

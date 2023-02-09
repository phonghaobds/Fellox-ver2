import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { deleteBoard } from "../../services/board/boardAction";

export default function PositionedMenu({ boardId, updateBoard }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (boardId) => {
    if (window.confirm("Bạn đồng ý xóa bảng này ?")) {
      let dataBoard = await deleteBoard(boardId);
      if (dataBoard) {
        updateBoard(dataBoard);
        setAnchorEl(null);
      }
    }
  };

  return (
    <div>
      <Button
        style={{ width: 20, height: 25 }}
        className="z-20 hover:z-50"
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon style={{ color: "white", width: 240 }} />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleDelete(boardId)}>Xóa bảng</MenuItem>
        <MenuItem onClick={handleClose}>Tạo bảng</MenuItem>
        <MenuItem onClick={handleClose}>Mở bảng</MenuItem>
      </Menu>
    </div>
  );
}

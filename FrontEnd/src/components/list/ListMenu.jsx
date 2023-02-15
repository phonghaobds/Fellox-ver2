import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

import { Button, Menu, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { archiveList } from "../../services/board/boardAction";

const ListMenu = ({ listId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const archive = async () => {
    dispatch(archiveList({ listId, archive: true }));
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <MoreHorizIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} className="float-right">
          <CloseIcon />
        </MenuItem>
        <MenuItem
          className="w-full"
          onClick={() => {
            archive();
            handleClose();
          }}
        >
          Lưu trữ danh sách này
        </MenuItem>
      </Menu>
    </div>
  );
};

ListMenu.propTypes = {
  listId: PropTypes.string.isRequired,
};

export default ListMenu;

import { Board } from "../models/Board";
import { User } from "../models/User";
import ListService from "../services/list.service";

class ListController {
  async getlist(req, res) {
    try {
      const list = await ListService.getDataList(req, res);
      res.status(200).json(list);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async addList(req, res) {
    try {
      const list = await ListService.addDataList(req);
      res.status(200).json(list);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async archiveList(req, res) {
    try {
      let list = await ListService.getDataList(req, res);

      if (!list) {
        res.status(404).json("Danh sách không tồn tại");
      } else {
        list.archived = req.params.archive === "true";
        await list.save();
        const user = await User.findById(req.user.id);
        const board = await Board.findById(req.header("boardId"));
        board.activity.unshift({
          text: list.archived
            ? `${user.name} lưu trữ danh sách '${list.title}'`
            : `${user.name} trả danh sách '${list.title}' về bảng`,
        });
        await board.save();
        res.status(200).json(list);
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async updateList(req, res) {
    try {
      let listUpdate = await ListService.editList(req, res);
      res.status(200).json(listUpdate);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async moveList(req, res) {
    try {
      const toIndex = Object.keys(req.body)[0] || 0;
      const boardId = req.header("boardId");
      const board = await Board.findById(boardId);
      const listId = req.params.idList;
      if (!listId) {
        return res.status(404).json("List không tồn tại");
      }

      const listIndex = board.lists.indexOf(listId);
      if (listIndex === -1) {
        return res.status(400).json("List không có trong bảng");
      }

      board.lists.splice(listIndex, 1);
      board.lists.splice(toIndex, 0, listId);
      await board.save();
      const newBoard = await Board.findById(boardId).populate({
        path: "lists",
        populate: {
          path: "cards",
          populate: {
            path: "members.user",
          },
        },
      });
      res.status(200).json(newBoard.lists);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async renameList(req, res) {
    try {
      let listUpdate = await ListService.renameList(req, res);
      res.status(200).json(listUpdate);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new ListController();

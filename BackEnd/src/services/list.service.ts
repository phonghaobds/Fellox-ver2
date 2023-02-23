import { List } from "../models/List";
import { Board } from "../models/Board";
import { User } from "../models/User";

class ListService {
  async getDataList(req, res) {
    const list = await List.findById(req.params.id).populate({
      path: "cards",
      populate: {
        path: "members.user",
      },
    });
    if (!list) {
      return res.status(404).json("Danh sách không tìm thấy");
    }
    return list;
  }

  async addDataList(req) {
    const title = req.body.title;
    const boardId = req.header("boardId");
    const user = await User.findById(req.user.id);

    const newList = new List({ title });
    const list = await newList.save();
    const board = await Board.findByIdAndUpdate(
      boardId,
      {
        $push: {
          lists: list,
          activity: { text: `${user.name} đã thêm '${title}' vào bảng này` },
        },
      },
      { new: true }
    ).populate({
      path: "lists",
      populate: {
        path: "cards",
        populate: {
          path: "members.user",
        },
      },
    });
    return board.lists;
  }

  async editList(req, res) {
    let { listId } = req.body;
    let listEdit = await List.findOneAndUpdate(
      { _id: listId },
      { title: req.body.title },
      { new: true }
    );
    return listEdit;
  }
  async renameList(req, res) {
    const list = await List.findById(req.params.id).populate({
      path: "cards",
      populate: {
        path: "members.user",
      },
    });
    if (!list) {
      return res.status(404).json("Danh sách không tồn tại");
    }
    list.title = Object.keys(req.body)[0];
    await list.save();
    return list
  }
}

export default new ListService();

import { Board } from "../models/Board";
import { User } from "../models/User";
import BoardService from "../services/board.service";
import NotificationService from "../services/notification.service";
class BoardController {
  // Thêm bảng
  async createBoard(req, res, next) {
    try {
      const board = await BoardService.createBoard(req, res);
      res.status(200).json({ board: board });
    } catch (err) {
      next(err);
    }
  }
  // lấy bảng theo id user
  async getUserBoard(req, res, next) {
    try {
      const boards = await BoardService.getUserBoard(req);
      res.status(200).json(boards);
    } catch (err) {
      next(err);
    }
  }
  // lấy bảng theo id bảng
  async getBoardId(req, res, next) {
    try {
      const board = await BoardService.getBoardById(req.params.id);
      if (!board) {
        return res.status(404).json(" Không tìm thấy bảng");
      }
      res.json(board);
    } catch (err) {
      next(err);
    }
  }
  // lấy bảng theo trạng thái
  async getBoardActivity(req, res, next) {
    try {
      const board = await BoardService.getBoardById(req.params.boardId);
      if (!board) {
        return res.status(404).json("Không tìm thấy bảng");
      }
      res.json(board.activity);
    } catch (err) {
      next(err);
    }
  }
  // Thay đổi tiêu đề bảng
  async renameBoard(req, res, next) {
    try {
      const board = await BoardService.getBoardById(req.params.id);
      if (!board) {
        return res.status(404).json("Không tìm thấy bảng");
      }
      await BoardService.renameBoard(req, res, board);
      res.json(board);
    } catch (err) {
      next(err);
    }
  }
  // Thêm thành viên vào bảng
  async addMember(req, res, next) {
    try {
      const board = await BoardService.getBoardById(req.header("boardId"));

      if (!board) return res.status(404).json("Không tìm thấy bảng");
      const users = await User.find({ _id: { $in: req.body } });
      if (!users) return res.status(404).json("Không tìm thấy người dùng");

      const duplicate = board.members.some(({ user: { _id } }) =>
        users.some((user) => _id.equals(user._id))
      );

      if (duplicate) return res.status(409).json("Người dùng đã có trong bảng");

      users.map((user) => {
        user.boards.unshift(board.id);
        board.members.push({ user: user, role: "observer" });
        board.activity.unshift({
          text: `${user.name} đã tham gia bảng này`,
        });
      });
      await Promise.all(users.map((user) => user.save()));
      await board.save();
      res.json(board.members);
    } catch (err) {
      next(err);
    }
  }

  async removeMember(req, res, next) {
    try {
      const board = await BoardService.getBoardById(req.header("boardId"));

      if (!board) return res.status(404).json("Bảng không tồn tại");

      await BoardService.removeMember(req, res, board);
    } catch (err) {
      next(err);
    }
  }

  async changeRole(req, res, next) {
    try {
      const board = await BoardService.getBoardById(req.header("boardId"));
      if (!board) return res.status(404).json("Board not found");

      await BoardService.changeRole(req, res, board);
    } catch (err) {
      next(err);
    }
  }

  async newBoard(req, res, next) {
    try {
      let data = await BoardService.newBoard(req);
      res.status(200).json({
        board: data,
      });
    } catch (err) {
      next(err);
    }
  }

  async boardDelete(req, res, next) {
    try {
      let board = await BoardService.getBoardById(req.params.boardId);
      if (board) {
        await BoardService.deleteBoard(req);
        let boards = await BoardService.getUserBoard(req);
        res.status(200).json({
          success: true,
          boards: boards,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "bảng không tồn tại",
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
export default new BoardController();

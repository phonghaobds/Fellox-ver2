import bcrypt from "bcrypt";
import AuthService from "../services/auth.service";

export class AuthController {
  async register(req, res) {
    try {
      const user = await AuthService.getUser(req, res);
      if (!user) {
        await AuthService.addUser(req, res);
        res.status(201).json({ message: "Đăng ký thành công" });
      } else {
        res.status(409).json({ message: "Email đã tồn tại" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const user = await AuthService.getUser(req, res);
      if (user) {
        const comparePass = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!comparePass) {
          return res.status(401).json({ message: "Mật khẩu không chính xác!" });
        }
        const accessToken = await AuthService.setToken(user);
        res.status(200).json({
          userToken: accessToken,
          user,
        });
      } else {
        res.status(401).json({ message: "Người dùng không tồn tại" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new AuthController();

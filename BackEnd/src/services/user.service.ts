import { User } from "../models/User";
import { Project } from "../models/Project";
import bcrypt from "bcrypt";

class UserService {
  async getDataUser(req) {
    const id = req.user.id;
    const user = await User.findOne({ _id: id }).populate("boards");
    return user;
  }

  async updatePassword(req, res) {
    let newPassword = await bcrypt.hash(req.body.newPassword, 10);
    let update = await User.findOneAndUpdate(
      { _id: req.user.id },
      { password: newPassword },
      { new: true }
    );
    if (update) {
      return update;
    }
  }

  async updateProfile(req) {
    let newUpdate = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        gender: req.body.gender,
      },
      { new: true }
    );
    if (newUpdate) {
      return newUpdate;
    }
  }

  async getEmail(req, res) {
    const regex = new RegExp(req.params.input, "i");
    const users = await User.find({
      email: regex,
    }).select("-password");
    return users;
  }
  async getEmailInProject(req, res) {
    const regex = new RegExp(req.params.input, "i");
    const project = await Project.find().select("-password");
    console.log("🚀 ~ file: user.service.ts:50 ~ projectervice ~ getEmailInProject ~ project:", project)
    return project;
  }
}

export default new UserService();

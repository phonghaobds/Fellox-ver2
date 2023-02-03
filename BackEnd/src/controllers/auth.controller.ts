import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AuthService from "../services/auth.service";

export class AuthController {
    static async register(req, res) {
        try {
            const user = await AuthService.getUser(req, res);
            if (!user) {
                await AuthService.addUser(req, res);
                res.status(201).json({ message: "add user complete" });
            } else {
                res.status(409).json({ message: "email did exist" })
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    static async login(req, res) {
        try {
            const user = await AuthService.getUser(req, res);

            if (user) {
                const comparePass = await bcrypt.compare(req.body.password, user.password);
                if (!comparePass) {
                    return res.status(401).json({ message: "password wrongs" })
                }
                let payload = {
                    email: user.email,
                    name: user.name,
                    avatar: user.avatar,
                    role: user.role,
                }
                const token = jwt.sign(payload, '123456789', {
                    expiresIn: 30 * 60 * 1000,
                });

                // let options = {
                //     maxAge: 1000 * 60 * 30, 
                //     httpOnly: true, 
                // }

                // res.cookie('token', token, options);

                res.status(200).json(token);

            } else {
                res.status(401).json({ message: "user dosen't exist" })
            }

        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }








}
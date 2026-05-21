const { UserPostQuestions } = require("../models");
const { Op } = require("sequelize");
const axios = require("axios");
const { encryptPwd, decryptPwd } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jwt");

class UserPostQuestionsController {
    static async getUsers(req, res) {
        try {
            const users = await UserPostQuestions.findAll({
                attributes: { exclude: ["password"] },
            });

            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params;

            const user = await UserPostQuestions.findByPk(id, {
                attributes: { exclude: ["password"] },
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async add(req, res) {
        try {
          // console.log("req.body:", req.body);
    
          let { email, password, username, image } = req.body;
          password = encryptPwd(password);
    
          // console.log("Encrypted Password:", password);
          const user = await UserPostQuestions.create({
            email,
            password,
            username,
            image,
          });
    
          res.status(201).json({
            status: 201,
            message: "User created successfully",
            user: {
              id: user.id,
              email: user.email,
              username: user.username,
              image: user.image,
            },
          });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }

    static async register(req, res) {
        try {
            const { email, password, username } = req.body;

            const user = await UserPostQuestions.create({
                email,
                password,
                username
            });

            res.status(201).json({
                status: 201,
                message: "Register success",
                user: {
                    id: user.id,
                    email: user.email,
                },
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await UserPostQuestions.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ message: "Wrong email" });
            }

            let decrtyptPass = decryptPwd(password, user.password);

            if (!decrtyptPass) {
                return res.status(401).json({ message: "Wrong password" });
            } else {
                let token = tokenGenerator(user);
                console.log('user ', user)
                res.json({
                    status: 200,
                    message: "Login success",
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        token: token
                    },
                });
            }

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async edit(req, res) {
        try {
            const { id } = req.params;
            const { username, image } = req.body;

            const user = await UserPostQuestions.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            await user.update({ username, image });

            res.json({ message: "User updated successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const user = await UserPostQuestions.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            await user.destroy();

            res.json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async search(req, res) {
        try {
            const { q } = req.query;

            const users = await UserPostQuestions.findAll({
                where: {
                    [Op.or]: [
                        { email: { [Op.iLike]: `%${q}%` } },
                        { username: { [Op.iLike]: `%${q}%` } },
                    ],
                },
                attributes: { exclude: ["password"] },
            });

            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserPostQuestionsController
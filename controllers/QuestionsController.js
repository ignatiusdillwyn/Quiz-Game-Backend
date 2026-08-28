const { Questions, Options, sequelize } = require("../models");
const { Sequelize } = require("sequelize");
const axios = require("axios");
const { generateCode } = require("../utils");
// const { encryptPwd, decryptPwd } = require("../helpers/bcrypt");
// const { tokenGenerator } = require("../helpers/jwt");

class QuestionsController {
    //Ini untuk nampilin seluruh question untuk participant based on code paket soal
    static async getAllQuestionbyCode(req, res) {
        try {
            console.log('get all product')
            // let userId = req.userData.id;
            let code = req.query.code;

            // const data = await sequelize.query(`
            //     SELECT * FROM "Questions" q 
            //     JOIN "Options" o ON q.id = o.question_id 
            //     WHERE q.user_id = :userId and q.code = :code
            //     order by q.code asc
            // `, {
            //     replacements: { userId: userId, code: code },
            //     type: Sequelize.QueryTypes.SELECT
            // });

            const data = await sequelize.query(`
                SELECT * FROM "Questions" q 
                JOIN "Options" o ON q.id = o.question_id 
                WHERE q.code = :code
                order by q.code asc
            `, {
                replacements: { code: code },
                type: Sequelize.QueryTypes.SELECT
            });
            res.status(201).json({
                message: "Get Questions by code successfully",
                status: 201,
                data: data
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createQuestion(req, res) {
        try {
            console.log('create question ', req.body)
            let userId = req.userData.id;

            const dataQuestion = await Questions.create({
                question_text: req.body.question_text,
                score: 100,
                user_id: userId,
                code: req.body.code
            });

            // console.log('data question ', dataQuestion.id)

            const dataOptions = await Options.create({
                option_1: req.body.options[0],
                option_2: req.body.options[1],
                option_3: req.body.options[2],
                option_4: req.body.options[3],
                correct_answer: req.body.correct_answer,
                question_id: dataQuestion.id
            })

            res.status(201).json({
                message: "Question created successfully",
                status: 201,
                data: req.body
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllQuestionByUserId(req, res) {
        try {
            let userId = req.userData.id;

            const data = await sequelize.query(`
                SELECT * FROM "Questions" q 
                JOIN "Options" o ON q.id = o.question_id 
                WHERE q.user_id = :userId
                order by q.code asc
            `, {
                replacements: { userId: userId },
                type: Sequelize.QueryTypes.SELECT
            });

            if (!data || data.length === 0) {
                return res.status(404).json({ message: "Questions not found for this user" });
            }

            res.status(200).json({
                message: "Questions retrieved successfully",
                status: 200,
                data: data
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateQuestion(req, res) {
        try {
            let userId = req.userData.id;
            const data = await Questions.findByPk(req.params.id);
            if (!data) return res.status(404).json({ message: "Question not found" });
            await data.update(req.body);
            res.status(200).json({
                message: "Questions updated successfully",
                status: 200,
                data: data
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteQuestionById(req, res) {
        try {
            let userId = req.userData.id;
            const data = await Questions.findByPk(req.params.id);
            if (!data) return res.status(404).json({ message: "Question not found" });
            await data.destroy();
            res.status(200).json({
                status: 200,
                message: "Question deleted successfully",
            })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteBatchQuestion(req, res) {
        try {
            // let userId = req.userData.id;
            let code = req.query.code;

            const data1 = await sequelize.query(`
                SELECT * FROM "Questions" q 
                WHERE code = :code
            `, {
                replacements: { code: code },
                type: Sequelize.QueryTypes.SELECT
            });

            if (data1.length == 0) return res.status(404).json({ message: "Question not found" });

            const data2 = await sequelize.query(`
                DELETE FROM "Questions" 
                WHERE code = :code
            `, {
                replacements: { code: code },
                type: Sequelize.QueryTypes.SELECT
            });

            res.status(200).json({
                status: 200,
                message: "Question deleted successfully",
            })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //Ini untuk checking apakah code paket soal yang dibuat sudah ada atau belum, karena code itu harus unique dipakai pas buat soal di frontend
    static async getAllCodefromDB(req, res) {
        try {
            const code = await sequelize.query(`
                select distinct code from "Questions" q 
            `, {
                type: Sequelize.QueryTypes.SELECT
            });

            res.status(200).json({
                status: 200,
                message: "Get All Code Successfully",
                data: code
            })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //Ini untuk tampilin paket-paket soal di front end by User ID
    static async getAllQuestionPackagebyUserId(req, res) {
        try {
            let userId = req.userData.id;

            const data = await sequelize.query(`
                select code, count(code) as total_question from "Questions" q 
                where q.user_id = :userId
                group by code
            `, {
                replacements: { userId: userId },
                type: Sequelize.QueryTypes.SELECT
            });

            res.status(200).json({
                status: 200,
                message: "Get All Questions Package Successfully",
                data: data
            })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //Ini untuk tampilin paket-paket soal di front end untuk participant
    static async getAllQuestionPackageForParticipant(req, res) {
        try {
            const data = await sequelize.query(`
                select q.user_id, code, count(code) as total_question from "Questions" q 
                join "UserPostQuestions" upq ON upq.id = q.user_id 
                group by code, q.user_id 
            `, {
                type: Sequelize.QueryTypes.SELECT
            });

            res.status(200).json({
                status: 200,
                message: "Get All Questions Package Successfully",
                data: data
            })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getAllQuestionPackagebyUserIdForParticipant(req, res) {
        try {
            let userId = req.query.authorId;

            const data = await sequelize.query(`
                select code, count(code) as total_question from "Questions" q 
                where q.user_id = :userId
                group by code
            `, {
                replacements: { userId: userId },
                type: Sequelize.QueryTypes.SELECT
            });

            res.status(200).json({
                status: 200,
                message: "Get All Questions Package Successfully",
                data: data
            })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = QuestionsController
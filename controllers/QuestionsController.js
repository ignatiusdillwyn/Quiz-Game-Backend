const { Questions, Options, sequelize } = require("../models");
const { Sequelize } = require("sequelize");
const axios = require("axios");
// const { encryptPwd, decryptPwd } = require("../helpers/bcrypt");
// const { tokenGenerator } = require("../helpers/jwt");

class QuestionsController {
    // static async getAllProduct(req, res) {
    //     try {
    //         console.log('get all product')
    //         let userId = req.userData.id;
    //         const data = await Product.findAll({
    //             where: { UserId: userId }
    //         });
    //         res.status(201).json({
    //             message: "Product created successfully",
    //             data: data
    //         });
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }

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

            // const fullQuestion = await Questions.findByPk(dataQuestion.id, {
            //     include: [{
            //         model: Options,
            //         attributes: ['option_1', 'option_2', 'option_3', 'option_4', 'correct_answer']
            //         // atau kalau mau semua field: include: [Options]
            //     }]
            // });
            // console.log('Full question with options:', fullQuestion.option.id);

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

    // static async deleteProduct(req, res) {
    //     try {
    //         let userId = req.userData.id;
    //         const data = await Product.findByPk(req.params.id);
    //         if (!data) return res.status(404).json({ message: "Product not found" });
    //         await data.destroy();
    //         res.json({ message: "Product deleted" });
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }

    // static async searchProduct(req, res) {
    //     try {
    //         let userId = req.userData.id;
    //         const { name } = req.params;
    //         console.log('search product ', name)
    //         console.log('userId ', userId)
    //         const data = await Product.findAll({
    //             where: {
    //                 UserId: userId,
    //                 [Op.or]: [
    //                     { name: { [Op.iLike]: `%${name}%` } },
    //                     // { email: { [Op.iLike]: `%${name}%` } },
    //                 ],
    //             },
    //         });
    //         res.json(data);
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }
}

module.exports = QuestionsController
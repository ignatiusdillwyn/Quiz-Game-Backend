const { Questions, Options, sequelize, Leaderbord } = require("../models");
const { Sequelize } = require("sequelize");
const axios = require("axios");
// const { encryptPwd, decryptPwd } = require("../helpers/bcrypt");
// const { tokenGenerator } = require("../helpers/jwt");

class LeaderbordController {
    static async inserParticipantScore(req, res) {
        try {
            console.log('insert score ', req.body)
            let userId = req.userData.id;

            const scoreParticipant = await Leaderbord.create({
                score: req.body.score,
                userParticipant_id: userId,
                code: req.body.code
            });

            res.status(201).json({
                message: "Insert score successfully",
                status: 201,
                data: req.body
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getLeaderbordScoreByQuestionCode(req, res) {
        try {
            // let userId = req.userData.id;
            let code = req.query.code;

            const data = await sequelize.query(`
                select * from "Leaderbords" l 
                where code = :code
            `, {
                replacements: { code: code },
                type: Sequelize.QueryTypes.SELECT
            });

            if (!data || data.length === 0) {
                return res.status(404).json({ message: "Leaderbord not found" });
            }

            res.status(200).json({
                message: "Leaderbord retrieved successfully",
                status: 200,
                data: data
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // static async updateQuestion(req, res) {
    //     try {
    //         let userId = req.userData.id;
    //         const data = await Questions.findByPk(req.params.id);
    //         if (!data) return res.status(404).json({ message: "Question not found" });
    //         await data.update(req.body);
    //         res.status(200).json({
    //             message: "Questions updated successfully",
    //             status: 200,
    //             data: data
    //         });
    //     } catch (error) {
    //         res.status(400).json({ message: error.message });
    //     }
    // }

    // static async deleteQuestionById(req, res) {
    //     try {
    //         let userId = req.userData.id;
    //         const data = await Questions.findByPk(req.params.id);
    //         if (!data) return res.status(404).json({ message: "Question not found" });
    //         await data.destroy();
    //         res.status(200).json({
    //             status: 200,
    //             message: "Question deleted successfully",
    //         })
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }

    // static async deleteBatchQuestion(req, res) {
    //     try {
    //         let userId = req.userData.id;
    //         let code = req.query.code;

    //         const data1 = await sequelize.query(`
    //             SELECT * FROM "Questions" q 
    //             WHERE code = :code
    //         `, {
    //             replacements: { code: code },
    //             type: Sequelize.QueryTypes.SELECT
    //         });

    //         if (data1.length == 0) return res.status(404).json({ message: "Question not found" });

    //         const data2 = await sequelize.query(`
    //             DELETE FROM "Questions" 
    //             WHERE code = :code
    //         `, {
    //             replacements: { code: code },
    //             type: Sequelize.QueryTypes.SELECT
    //         });

    //         res.status(200).json({
    //             status: 200,
    //             message: "Question deleted successfully",
    //         })
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }
}

module.exports = LeaderbordController
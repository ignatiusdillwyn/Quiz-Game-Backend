const { QuestionsController } = require("../controllers");
const { authentication, authorization } = require("../middlewares/auth");
const questionRouter = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Question
 *   description: Question and question package management
 */

// ==================== CREATE ====================

/**
 * @swagger
 * /api/question/create:
 *   post:
 *     summary: Create a new question with options
 *     tags: [Question]
 *     security:
 *       - accessToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question_text
 *               - options
 *               - correct_answer
 *               - code
 *             properties:
 *               question_text:
 *                 type: string
 *                 example: "Hewan yang hidup di air?"
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 minItems: 4
 *                 maxItems: 4
 *                 example: ["Ikan", "Sapi", "Burung", "Unta"]
 *               correct_answer:
 *                 type: string
 *                 example: "Ikan"
 *               code:
 *                 type: string
 *                 example: "WNSA"
 *     responses:
 *       201:
 *         description: Question created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Question created successfully"
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *       400:
 *         description: Validation error
 */
questionRouter.post(
  "/create",
  authentication,
  QuestionsController.createQuestion
);

// ==================== READ ====================

/**
 * @swagger
 * /api/question/getListQuestionByUserId:
 *   get:
 *     summary: Get all questions by logged-in user ID
 *     tags: [Question]
 *     security:
 *       - accessToken: []
 *     responses:
 *       200:
 *         description: Questions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Questions retrieved successfully"
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Questions not found for this user
 *       500:
 *         description: Internal server error
 */
questionRouter.get(
  "/getListQuestionByUserId",
  authentication,
  QuestionsController.getAllQuestionByUserId
);

/**
 * @swagger
 * /api/question/getListQuestionByCode:
 *   get:
 *     summary: Get all questions by package code (for participants)
 *     tags: [Question]
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Package code
 *         example: "WNSA"
 *     responses:
 *       201:
 *         description: Questions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Get Questions by code successfully"
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 4
 *                       question_text:
 *                         type: string
 *                         example: "Hewan yang hidup di air?"
 *                       score:
 *                         type: integer
 *                         example: 100
 *                       code:
 *                         type: string
 *                         example: "WNSA"
 *                       option_1:
 *                         type: string
 *                         example: "Ikan"
 *                       option_2:
 *                         type: string
 *                         example: "Sapi"
 *                       option_3:
 *                         type: string
 *                         example: "Burung"
 *                       option_4:
 *                         type: string
 *                         example: "Unta"
 *                       correct_answer:
 *                         type: string
 *                         example: "Ikan"
 *       500:
 *         description: Internal server error
 */
questionRouter.get(
  "/getListQuestionByCode",
  authentication,
  QuestionsController.getAllQuestionbyCode
);

/**
 * @swagger
 * /api/question/getAllCode:
 *   get:
 *     summary: Get all unique package codes from database
 *     tags: [Question]
 *     responses:
 *       200:
 *         description: Get all codes successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Get All Code Successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: "WNSA"
 *       500:
 *         description: Internal server error
 */
questionRouter.get(
  "/getAllCode",
  QuestionsController.getAllCodefromDB
);

/**
 * @swagger
 * /api/question/getAllQuestionPackagebyUserId:
 *   get:
 *     summary: Get all question packages by logged-in user ID
 *     tags: [Question]
 *     security:
 *       - accessToken: []
 *     responses:
 *       200:
 *         description: Get all questions package successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Get All Questions Package Successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: "WNSA"
 *                       total_question:
 *                         type: string
 *                         example: "7"
 *       500:
 *         description: Internal server error
 */
questionRouter.get(
  "/getAllQuestionPackagebyUserId",
  authentication,
  QuestionsController.getAllQuestionPackagebyUserId
);

/**
 * @swagger
 * /api/question/getAllQuestionPackageForParticipant:
 *   get:
 *     summary: Get all question packages for participants (without author filter)
 *     tags: [Question]
 *     security:
 *       - accessToken: []
 *     responses:
 *       200:
 *         description: Get all questions package successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Get All Questions Package Successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: integer
 *                         example: 2
 *                       code:
 *                         type: string
 *                         example: "WNSB"
 *                       total_question:
 *                         type: string
 *                         example: "4"
 *       500:
 *         description: Internal server error
 */
questionRouter.get(
  "/getAllQuestionPackageForParticipant",
  authentication,
  QuestionsController.getAllQuestionPackageForParticipant
);

/**
 * @swagger
 * /api/question/getAllQuestionPackagebyUserIdForParticipant:
 *   get:
 *     summary: Get all question packages by specific author ID (for participants)
 *     tags: [Question]
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: query
 *         name: authorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Author/User ID
 *         example: 2
 *     responses:
 *       200:
 *         description: Get all questions package successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Get All Questions Package Successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: "WNSB"
 *                       total_question:
 *                         type: string
 *                         example: "4"
 *       500:
 *         description: Internal server error
 */
questionRouter.get(
  "/getAllQuestionPackagebyUserIdForParticipant",
  authentication,
  QuestionsController.getAllQuestionPackagebyUserIdForParticipant
);

// ==================== UPDATE ====================

/**
 * @swagger
 * /api/question/editQuestion/{id}:
 *   put:
 *     summary: Update question by ID
 *     tags: [Question]
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Question ID
 *         example: 4
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question_text:
 *                 type: string
 *                 example: "Updated question text"
 *               score:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       200:
 *         description: Questions updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Questions updated successfully"
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *       404:
 *         description: Question not found
 *       400:
 *         description: Validation error
 */
questionRouter.put(
  "/editQuestion/:id",
  authentication,
  authorization,
  QuestionsController.updateQuestion
);

// ==================== DELETE ====================

/**
 * @swagger
 * /api/question/deleteQuestion/{id}:
 *   delete:
 *     summary: Delete question by ID
 *     tags: [Question]
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Question ID
 *         example: 4
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Question deleted successfully"
 *       404:
 *         description: Question not found
 *       500:
 *         description: Internal server error
 */
questionRouter.delete(
  "/deleteQuestion/:id",
  authentication,
  authorization,
  QuestionsController.deleteQuestionById
);

/**
 * @swagger
 * /api/question/deleteBatchQuestion:
 *   delete:
 *     summary: Delete all questions in a package by code
 *     tags: [Question]
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Package code
 *         example: "WNSA"
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Question deleted successfully"
 *       404:
 *         description: Question not found
 *       500:
 *         description: Internal server error
 */
questionRouter.delete(
  "/deleteBatchQuestion",
  authentication,
  QuestionsController.deleteBatchQuestion
);

module.exports = questionRouter;
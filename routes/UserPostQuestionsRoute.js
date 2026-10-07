const { UserPostQuestionsController } = require("../controllers");
const userPostQuestionRouter = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: UserPostQuestion
 *   description: User Question authentication and management
 */

// ==================== AUTHENTICATION ====================

/**
 * @swagger
 * /api/users/question/login:
 *   post:
 *     summary: Login user question
 *     tags: [UserPostQuestion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "userquestion@mail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login success
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
 *                   example: "Login success"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "userquestion1"
 *                     email:
 *                       type: string
 *                       example: "userquestion@mail.com"
 *                     type:
 *                       type: string
 *                       example: "userPostQuestion"
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Wrong email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Wrong email"
 *       500:
 *         description: Internal server error
 */
userPostQuestionRouter.post("/login", UserPostQuestionsController.login);

/**
 * @swagger
 * /api/users/question/register:
 *   post:
 *     summary: Register new user question
 *     tags: [UserPostQuestion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "newuserquestion@mail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *                 description: "Min 8 characters, must contain letter and number"
 *               username:
 *                 type: string
 *                 example: "newuserquestion"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "newuserquestion@mail.com"
 *                     username:
 *                       type: string
 *                       example: "newuserquestion"
 *                     image:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     passwordLength:
 *                       value: "Password must be at least 8 characters"
 *                     passwordLetter:
 *                       value: "Password must contain at least one letter"
 *                     passwordNumber:
 *                       value: "Password must contain at least one number"
 *                     emailUnique:
 *                       value: "email must be unique"
 */
userPostQuestionRouter.post("/register", UserPostQuestionsController.add);

module.exports = userPostQuestionRouter;
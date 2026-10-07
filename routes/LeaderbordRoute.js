const { LeaderbordController } = require("../controllers");
const { authentication, authorization } = require("../middlewares/auth");
const leaderbordRouter = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Leaderbord
 *   description: Leaderboard and score management
 */

// ==================== INSERT SCORE ====================

/**
 * @swagger
 * /api/leaderbord/insertScore:
 *   post:
 *     summary: Insert participant score after completing a quiz
 *     tags: [Leaderbord]
 *     security:
 *       - accessToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - score
 *               - code
 *             properties:
 *               score:
 *                 type: integer
 *                 example: 500
 *               code:
 *                 type: string
 *                 example: "WNSA"
 *     responses:
 *       201:
 *         description: Insert score successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Insert score successfully"
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     score:
 *                       type: integer
 *                       example: 500
 *                     code:
 *                       type: string
 *                       example: "WNSA"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (no token / invalid token)
 *       500:
 *         description: Internal server error
 */
leaderbordRouter.post(
  "/insertScore",
  authentication,
  LeaderbordController.inserParticipantScore
);

// ==================== GET LEADERBORD ====================

/**
 * @swagger
 * /api/leaderbord/getLeaderbordScoreByQuestionCode:
 *   get:
 *     summary: Get leaderboard scores by question package code
 *     tags: [Leaderbord]
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
 *         description: Leaderbord retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Leaderbord retrieved successfully"
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       score:
 *                         type: integer
 *                         example: 500
 *                       userParticipant_id:
 *                         type: integer
 *                         example: 2
 *                       code:
 *                         type: string
 *                         example: "WNSA"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-06-02T03:15:02.226Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-06-02T03:15:02.226Z"
 *       404:
 *         description: Leaderbord not found
 *       500:
 *         description: Internal server error
 */
leaderbordRouter.get(
  "/getLeaderbordScoreByQuestionCode",
  LeaderbordController.getLeaderbordScoreByQuestionCode
);

module.exports = leaderbordRouter;
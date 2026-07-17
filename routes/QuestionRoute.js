const { QuestionsController } = require("../controllers");
const { authentication, authorization } = require("../middlewares/auth");
const questionRouter = require("express").Router();

questionRouter.post(
  "/create",
  authentication,
  QuestionsController.createQuestion
);
questionRouter.delete(
  "/deleteQuestion/:id",
  authentication,
  authorization,
  QuestionsController.deleteQuestionById
);
questionRouter.put(
  "/editQuestion/:id",
  authentication,
  authorization,
  QuestionsController.updateQuestion
);
questionRouter.get(
  "/getListQuestionByUserId",
  authentication,
  QuestionsController.getAllQuestionByUserId
);
questionRouter.get(
  "/getListQuestionByCode",
  authentication,
  QuestionsController.getAllQuestionbyCode
);
questionRouter.delete(
  "/deleteBatchQuestion",
  authentication,
  // authorization,
  QuestionsController.deleteBatchQuestion
);
questionRouter.get(
  "/getAllCode",
  // authentication,
  QuestionsController.getAllCodefromDB
);
questionRouter.get(
  "/getAllQuestionPackagebyUserId",
  authentication,
  QuestionsController.getAllQuestionPackagebyUserId
);
questionRouter.get(
  "/getAllQuestionPackage",
  authentication,
  QuestionsController.getAllQuestionPackage
);

module.exports = questionRouter;
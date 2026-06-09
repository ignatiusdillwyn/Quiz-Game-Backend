const { LeaderbordController } = require("../controllers");
const { authentication, authorization } = require("../middlewares/auth");
const leaderbordRouter = require("express").Router();


// questionRouter.get("/getAll", authentication, QuestionsController.getAllProduct);
leaderbordRouter.post(
  "/insertScore",
  authentication,
  LeaderbordController.inserParticipantScore
);
// leaderbordRouter.delete(
//   "/deleteQuestion/:id",
//   authentication,
//   authorization,
//   QuestionsController.deleteQuestionById
// );
// leaderbordRouter.put(
//   "/editQuestion/:id",
//   authentication,
//   authorization,
//   QuestionsController.updateQuestion
// );
leaderbordRouter.get(
  "/getLeaderbordScoreByQuestionCode/:code",
  // authentication,
  LeaderbordController.getLeaderbordScoreByQuestionCode
);
// leaderbordRouter.delete(
//   "/deleteBatchQuestion",
//   authentication,
//   // authorization,
//   QuestionsController.deleteBatchQuestion
// );
module.exports = leaderbordRouter;
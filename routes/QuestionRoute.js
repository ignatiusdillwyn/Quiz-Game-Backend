const { QuestionsController } = require("../controllers");
const { authentication, authorization } = require("../middlewares/auth");
const questionRouter = require("express").Router();


// questionRouter.get("/getAll", authentication, QuestionsController.getAllProduct);
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
questionRouter.delete(
  "/deleteBatchQuestion",
  authentication,
  // authorization,
  QuestionsController.deleteBatchQuestion
);

// questionRouter.put(
//   '/updateProductImage/:id',
//   authentication, 
//   upload.single('image'),
//   QuestionsController.updateProductImage
// );

module.exports = questionRouter;
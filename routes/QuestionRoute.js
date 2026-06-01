const { QuestionsController } = require("../controllers");
const { authentication, authorization } = require("../middlewares/auth");
const questionRouter = require("express").Router();


// questionRouter.get("/getAll", authentication, QuestionsController.getAllProduct);
questionRouter.post(
  "/create",
  authentication,
  QuestionsController.createQuestion
);
// questionRouter.delete(
//   "/delete/:id",
//   authentication,
//   authorization,
//   QuestionsController.deleteProduct
// );
// questionRouter.put(
//   "/edit/:id",
//   authentication,
//   authorization,
//   QuestionsController.updateProduct
// );
// questionRouter.get(
//   "/details/:id",
//   // authentication,

//   QuestionsController.getProductById
// );
// questionRouter.get(
//   "/search/:name",
//   authentication,
//   // authorization,
//   QuestionsController.searchProduct
// );

// questionRouter.put(
//   '/updateProductImage/:id',
//   authentication, 
//   upload.single('image'),
//   QuestionsController.updateProductImage
// );

module.exports = questionRouter;
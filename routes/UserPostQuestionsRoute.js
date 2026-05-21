const { UserPostQuestionsController } = require("../controllers");
const userPostQuestionRouter = require("express").Router();

// CRUD Basic
userPostQuestionRouter.get("/", UserPostQuestionsController.getUsers);
userPostQuestionRouter.post("/create", UserPostQuestionsController.add);
userPostQuestionRouter.delete("/delete/:id", UserPostQuestionsController.delete);
userPostQuestionRouter.put("/edit/:id", UserPostQuestionsController.edit);

// More Routes
userPostQuestionRouter.get("/search", UserPostQuestionsController.search);
userPostQuestionRouter.get("/details/:id", UserPostQuestionsController.getUserById);

// Login (Authentication) dan Register
userPostQuestionRouter.post("/login", UserPostQuestionsController.login);
// userPostQuestionRouter.post("/register", UserPostQuestionsController.register);
module.exports = userPostQuestionRouter;

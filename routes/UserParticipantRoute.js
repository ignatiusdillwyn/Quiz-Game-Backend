const { UserParticipantController } = require("../controllers");
const UserParticipantRoute = require("express").Router();

// CRUD Basic
UserParticipantRoute.get("/", UserParticipantController.getUsers);
UserParticipantRoute.post("/create", UserParticipantController.add);
UserParticipantRoute.delete("/delete/:id", UserParticipantController.delete);
UserParticipantRoute.put("/edit/:id", UserParticipantController.edit);

// More Routes
UserParticipantRoute.get("/search", UserParticipantController.search);
UserParticipantRoute.get("/details/:id", UserParticipantController.getUserById);

// Login (Authentication) dan Register
UserParticipantRoute.post("/login", UserParticipantController.login);
// userPostQuestionRouter.post("/register", UserPostQuestionsController.register);
module.exports = UserParticipantRoute;

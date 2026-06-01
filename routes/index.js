const router = require("express").Router();
const base = "api";

router.get(`/${base}`, (req, res) => {
  res.json({ message: "WEB API" });
});

// const productRouters = require("./ProductRoute");
// const userRouters = require("./UserRoute");

const userPostQuestionRouters = require("./UserPostQuestionsRoute");
const userParticipantRouters = require("./UserParticipantRoute");

const questionRouters = require("./QuestionRoute");

// router.use(`/${base}/products`, productRouters);
// router.use(`/${base}/users`, userRouters);

router.use(`/${base}/users/question`, userPostQuestionRouters);
router.use(`/${base}/users/participant`, userParticipantRouters);

router.use(`/${base}/question`, questionRouters);

module.exports = router;

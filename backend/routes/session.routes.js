module.exports = app => {
    const session = require("../controllers/session.controller.js");
    const router = require("express").Router();
    router.get("/:pin/getbypin", session.getSessionByPin);
    router.get("/:pin/getcurrentqa", session.getCurrentQuestionAndAnswers);
    router.get("/:pin/getpastqa", session.getPastEnigmasQuestionsAndAnswers);
    router.get("/:pin/nextstep", session.setNextStep);
    router.get("/getdefaultmessage/:id", session.getDefaultMessage);
    app.use("/session", router);
}
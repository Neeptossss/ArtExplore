module.exports = app => {
    const session = require("../controllers/session.controller.js");
    const router = require("express").Router();
    router.get("/", session.findAll);
    router.get("/:id", session.findById);
    router.get("/search/:query", session.searchFilms);
    app.use("/films", router);
}
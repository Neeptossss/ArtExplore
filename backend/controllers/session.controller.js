const Session = require('../models/session.model');

exports.getPinById = (req, res) => {
    Session.getPinById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No session found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving session with id " + req.params.id
                });
            }
        } else res.send(data);
    });
}

exports.getSessionByPin = (req, res) => {
    Session.getSessionByPin(req.params.pin, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No session found with pin ${req.params.pin}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving session with id " + req.params.pin
                });
            }
        } else res.send(data);
    });
}

exports.getAll = (req, res) => {
    Session.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sessions."
            });
        else res.send(data);
    });
}

exports.getCurrentQuestionAndAnswers = (req, res) => {
    Session.getSessionByPin(req.params.pin, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No session found with pin ${req.params.pin}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving session with id " + req.params.pin
                });
            }
        } else {
            Session.getEnigmaId(data.step, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `No enigma found with order ${data.step}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error retrieving enigma with order " + data.step
                        });
                    }
                } else {
                    Session.getCurrentQuestionAndAnswers(data.id, (err, data) => {
                        if (err)
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while retrieving questions and answers."
                            });
                        else res.send(data);
                    });
                }
            });
        }
    });
}

exports.getPastEnigmasQuestionsAndAnswers = (req, res) => {
    Session.getSessionByPin(req.params.pin, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No session found with pin ${req.params.pin}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving session with id " + req.params.pin
                });
            }
        } else {
            Session.getPastEnigmasQuestionsAndAnswers(data.step, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving sessions."
                    });
                else res.send(data);
            });
        }
    });
}

exports.validateQuestion = (req, res) => {
    Session.getQuestionAnswer(req.params.question_id, (err, question_data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No question found with id ${req.params.question_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving question with id " + req.params.question_id
                });
            }
        } else {
            if (question_data.id == req.params.answer_id) {
                Session.nextStep(req.params.session_id, (err, data) => {
                    if (err) {
                        if (err.kind == "not_found") {
                            res.status(404).send({
                                message: `No session found with id ${req.params.session_id}.`
                            });
                        }
                        else {
                            res.status(500).send({
                                message: "Error updating session with id " + req.params.session_id
                            });
                        }
                    } else {
                        res.send(data);
                    }
                });
            } else {
                res.status(418).send({
                    message: `Wrong answer.`
                });
            }
        }
    });
}
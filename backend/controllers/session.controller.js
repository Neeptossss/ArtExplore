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
    Session.getSessionByPin(req.params.pin, (err, session_data) => {
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
            Session.getEnigmaId(session_data.step, (err, enigma_id) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `No enigma found with order ${session_data.step}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error retrieving enigma with order " + session_data.step
                        });
                    }
                } else {
                    Session.getCurrentEnigmaQuestions(enigma_id, (err, question_data) => {
                        if (err)
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while retrieving questions."
                            });
                        else {
                            qa_data = [];
                            question_data.forEach((question, index) => {
                                Session.getQuestionAnswers(question.id, (err, answer_data) => {
                                    if (err)
                                        res.status(500).send({
                                            message:
                                                err.message || "Some error occurred while retrieving answers."
                                        });
                                    else {
                                        qa_data.push({
                                            question: question,
                                            answers: answer_data
                                        });
                                        if (index === question_data.length - 1) {
                                            res.send(qa_data);
                                        }
                                    }
                                }
                                );
                            });
                        }
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

exports.setNextStep = (req, res) => {
    Session.setNextStep(req.params.pin, (err, data) => {
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

exports.getDefaultMessage = (req, res) => {
    Session.getDefaultMessage(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sessions."
            });
        else res.send(data);
    });
}
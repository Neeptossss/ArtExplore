const Session = require('../models/session.model');

exports.findPinById = (req, res) => {
    Session.getPinById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found film with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving film with id " + req.params.id
                });
            }
        } else res.send(data);
    });
}

exports.findAll = (req, res) => {
    Session.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving films."
            });
        else res.send(data);
    });
}

exports.searchFilms = (req, res) => {
    Session.searchFilms(req.params.search, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving films."
            });
        else res.send(data);
    }).then(r => console.log(r));
}
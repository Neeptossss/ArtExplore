const sql = require("./db.js");
const debug = require('debug')('app:session.model')

const Session = function (session) {
  this.id = session.id;
  this.pin = session.pin;
};

Session.getPinById = (id, result) => {
  sql.query(`SELECT * FROM session WHERE id = ${id}`, (err, res) => {
    if (err) {
      debug("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      debug(res[0])
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Session.getSessionByPin = (pin, result) => {
  sql.query(`SELECT * FROM session WHERE pin = ${pin}`, (err, res) => {
    if (err) {
      debug("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      debug(res[0])
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Session.getAll = result => {
  sql.query("SELECT * FROM session", (err, res) => {
    if (err) {
      debug("error: ", err);
      result(null, err);
      return;
    }
    debug(res);
    result(null, res);
  });
};

Session.getEnigmaId = (step, result) => {
  sql.query(`SELECT id FROM enigma WHERE order = ${step}`, (err, res) => {
    if (err) {
      debug("error: ", err);
      result(null, err);
      return;
    }
    debug(res);
    result(null, res);
  });
};

Session.getCurrentQuestionAndAnswers = (enigma, result) => {
  sql.query(`SELECT * FROM question WHERE id_enigma = ${enigma} AS QUESTION
  INNER JOIN reply AS REPLY ON QUESTION.id = REPLY.id_question`,
    (err, res) => {
      if (err) {
        debug("error: ", err);
        result(null, err);
        return;
      }
      debug(res);
      result(null, res);
    });
};

Session.getPastEnigmasQuestionsAndAnswers = (step, result) => {
  sql.query(`SELECT * FROM enigma WHERE order < ${step} AS ENIGMA
  INNER JOIN question AS QUESTION ON ENIGMA.id = QUESTION.id_enigma
  INNER JOIN reply AS REPLY ON QUESTION.id = REPLY.id_question`,
    (err, res) => {
      if (err) {
        debug("error: ", err);
        result(null, err);
        return;
      }
      debug(res);
      result(null, res);
    });
}

Session.nextStep = (id, result) => {
  sql.query(`UPDATE session SET step = step + 1 WHERE id = ${id}`, (err, res) => {
    if (err) {
      debug("error: ", err);
      result(null, err);
      return;
    }
    debug(res);
    result(null, res);
  });
}

/* It's getting the answer of the question with the id passed in parameter. */
Session.getQuestionAnswer = (id, result) => {
  sql.query(`SELECT * FROM reply WHERE id_question = ${id} AND valid = 1`, (err, res) => {
    if (err) {
      debug("error: ", err);
      result(null, err);
      return;
    }
    debug(res);
    result(null, res);
  });
}
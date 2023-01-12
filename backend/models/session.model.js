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
  sql.query(`SELECT id FROM enigma WHERE enigma.order = ${step}`, (err, res) => {
    if (err) {
      debug("error: ", err);
      result(null, err);
      return;
    }
    debug(res);
    result(null, res[0].id);
  });
};

Session.getCurrentEnigmaQuestions = (enigma, result) => {
  sql.query(`SELECT * FROM question WHERE question.id_enigma = ${enigma}`,
    (err, res) => {
      if (err) {
        debug("error: ", err);
        result(null, err);
        return;
      }
      console.log(res);
      debug(res);
      result(null, res);
    });
};

Session.getQuestionAnswers = (question_id, result) => {
  sql.query(`SELECT * FROM reply WHERE reply.id_question = ${question_id}`,
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
  sql.query(`SELECT * FROM enigma WHERE order < ${step} AS ENIGMA INNER JOIN question AS QUESTION ON ENIGMA.id = QUESTION.id_enigma INNER JOIN reply AS REPLY ON QUESTION.id = REPLY.id_question`,
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

Session.setNextStep = (pin, result) => {
  sql.query(`UPDATE session SET step = step + 1 WHERE pin = ${pin}`, (err, res) => {
    if (err) {
      debug("error: ", err);
      result(null, err);
      return;
    }
    debug(res);
    result(null, res);
  });
}

Session.getDefaultMessage = (id, result) => {
  sql.query(`SELECT * FROM default_answer WHERE id = ${id}`, (err, res) => {
    if (err) {
      debug("error: ", err);
      result(null, err);
      return;
    }
    debug(res);
    result(null, res);
  });
}


module.exports = Session;
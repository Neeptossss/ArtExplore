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
module.exports = Film;
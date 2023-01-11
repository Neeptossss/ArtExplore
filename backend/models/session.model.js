const sql = require("./db.js");

const Film = function (film) {
  this.title = film.title;
  this.release_date = film.release_date;
  this.vote = film.vote;
  this.overview = film.overview;
  this.poster = film.poster;
  this.genre_id = film.genre_id;
  this.genre_name = film.genre_name;
  this.backdrop = film.backdrop;
  this.popularity = film.popularity;
  this.videos = film.videos;
  this.subtitles = film.subtitles;
};
Film.findById = (id, result) => {
  sql.query(`SELECT * FROM films WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found film: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};
Film.searchFilms = async (req, res) => {
  const { title, genre, year } = req.query;
  let query = `SELECT * FROM films WHERE 1=1`;
  if (title) {
    query += ` AND title LIKE '%${title}%'`;
  }
  if (genre) {
    query += ` AND genre_id = ${genre}`;
  }
  if (year) {
    query += ` AND release_date LIKE '%${year}%'`;
  }
  const result = await sql.query(query);
  res.send(result);
};
Film.getAll = result => {
  sql.query("SELECT * FROM films", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("users: ", res);
    result(null, res);
  });
};
module.exports = Film;
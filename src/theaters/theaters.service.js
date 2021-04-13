const knex = require("../db/connection");

async function list() {
  let array = [];
  const theatersData = await knex("theaters as t").join("movies_theaters as mt", "t.theater_id", "mt.theater_id").distinct("t.*");
  for (const theater of theatersData) {
    let newObj = {};
    let moviesData = await knex("movies as m").join("movies_theaters as mt", "m.movie_id", "mt.movie_id").distinct("*").where({theater_id: theater.theater_id});
    newObj = {
      ...theater,
      movies: moviesData
    }
    array.push(newObj)
  }
  return array;
}

module.exports = {
  list
}
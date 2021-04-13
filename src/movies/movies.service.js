const knex = require("../db/connection");

function list() {
  const data = knex("movies").select("*");
  return data;
}

async function listShowing() {
  const data = await knex("movies as m").join("movies_theaters as mt", "m.movie_id", "mt.movie_id").distinct("m.movie_id").where({ is_showing: true });
  return data;
}

async function read(movieId) {
  const data = await knex("movies").select("*").where({ movie_id: movieId }).first()
  return data;
}

async function readTheaters(movieId) {
  const data = await knex("movies_theaters as mt").join("theaters as t", "mt.theater_id", "t.theater_id").select("t.*").where({movie_id: movieId})
  return data;
}

async function readReviews(movieId) {
  let array = [];
  const reviewData = await knex("reviews").select("*").where({movie_id: movieId});
  for (const review of reviewData) {
    let newObj = {}
    let criticData = await knex("critics").select("*").where({critic_id: review.critic_id}).first();
    newObj = {
      ...review,
      critic: criticData
    }
    array.push(newObj)
  }
  return array;
}


module.exports = {
  list,
  listShowing,
  read,
  readTheaters,
  readReviews
}
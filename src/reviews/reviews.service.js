const knex = require("../db/connection");

async function read(reviewId) {
  return await knex("reviews").select("*").where({review_id: reviewId}).first()
}

async function update(reviewId, data) {
  const updateObj = await knex("reviews").where({review_id: reviewId}).update({content: data.content})
  const reviewsData = await knex("reviews").select("*").where({review_id: reviewId}).first()
  const criticsData = await knex("critics").select("*").where({critic_id: reviewsData.critic_id}).first()
  const returnObj = {
    ...reviewsData,
    critic: criticsData
  }
  return returnObj;
}

async function destroy(reviewId) {
  await knex("reviews").where({review_id: reviewId}).del()
}

module.exports = {
  read,
  update,
  destroy
}
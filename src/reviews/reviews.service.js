const knex = require("../db/connection");

function read(reviewId) {
  return knex("reviews").select().where({ review_id: reviewId }).first()
}


function destroy(reviewId) {
    return knex("reviews").where({ review_id: reviewId }).del();
  }


function update(reviewId, updatedReview){
   return knex("reviews")
     .select("*")
     .where({ review_id: reviewId})
     .update(updatedReview, "*")
}

function showUpdatedReview(reviewId){
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({review_id: reviewId})
    .first()
    .then(
    data => {
      data.critic = {}
      data.critic.critic_id = data.critic_id
      data.critic.preferred_name = data.preferred_name
      data.critic.organization_name = data.organization_name
      data.critic.surname = data.surname
      delete data.organization_name 
      delete data.preferred_name
      delete data.surname
    return data
  }
  )
}

module.exports = {
    read,
    update,
    showUpdatedReview,
    delete: destroy
}
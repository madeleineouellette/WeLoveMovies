const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
})

function list(){
  return knex("movies").select()
}

function listMoviesShowing(){
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*", "mt.*")
    .where({"mt.is_showing": true})
    .groupBy("m.movie_id")
}

function read(movie_id) {
    return knex("movies").select().where({ movie_id }).first()
}


function readMovieTheaters(movie_id) {
   return knex("movies_theaters as mt")
     .join("theaters as t", "mt.theater_id", "t.theater_id")
     .select("*")
     .where({ movie_id: movie_id})
}


function readMovieReviews(movie_id){
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({movie_id: movie_id})
    .then((result) => {
    const list = []
    result.forEach((data) => {
      const newObj = addCritic(data)
      list.push(newObj)
    })
    return list
  })
}

module.exports = {
    list,
    listMoviesShowing,
    read,
    readMovieReviews,
    readMovieTheaters,
};













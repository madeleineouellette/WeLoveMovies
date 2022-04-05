const moviesService = require("./movies.service");

async function movieIdExists(req, res, next){
  const movie = await moviesService.read(req.params.movieId)
  if(movie){
    res.locals.movie = movie
    return next()
  } else {
    next({
      status: 404,
      message: "Movie cannot be found."
    })
  }
}


async function list(req, res){
  const isShowing = req.query.is_showing
  if(isShowing){
    const data = await moviesService.listMoviesShowing()
    res.json({data})
  } else {
    const data = await moviesService.list()
    res.json({data})
  }
}


async function read(req, res) {
    res.json({data: res.locals.movie})
  }

async function readMovieReviews(req, res){
  const {movieId} = req.params
  const reviews = await moviesService.readMovieReviews(movieId)
  res.json({data: reviews})
}



async function readMovieTheaters(req, res){
  const { movieId } = req.params
  const theaters = await moviesService.readMovieTheaters(movieId)
  res.json({ data: theaters })
}

module.exports = {
    list,
    read: [movieIdExists, read],
    readMovieReviews,
    readMovieTheaters,
};




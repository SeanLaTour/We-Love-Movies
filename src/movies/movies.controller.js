const service = require("./movies.service");

async function validateMovieExists(req, res, next) {
  const data = await service.read(req.params.movieId)
  if (data) {
    res.locals.movieId = req.params.movieId;
    next();
  } else {
    next({status: 404, message: "Movie not found"})
  }
}

async function list(req, res, next) {
  if (req.query.is_showing === 'true') {
    const data = await service.listShowing()
    res.json({ data })
  } else {
    const data = await service.list()
    res.json({ data })
  }
}

async function read(req, res, next) {
  const data = await service.read(res.locals.movieId);
  res.json({ data })
}

async function readTheaters(req, res, next) {
  const data = await service.readTheaters(res.locals.movieId)
  res.json({ data })
}

async function readReviews(req, res, next) {
  const data = await service.readReviews(res.locals.movieId)
  res.json({ data })
}

module.exports = {
  list,
  readTheaters: [validateMovieExists, readTheaters],
  readReviews: [validateMovieExists, readReviews],
  read: [validateMovieExists, read]
}
const service = require("./reviews.service");

async function validateReviewExists(req, res, next) {
  const id = req.params.reviewId;
  const data = await service.read(id);
  if (data) {
    res.locals.reviewId = req.params.reviewId;
    next();
  } else {
    next({status: 404, message: "cannot be found"})
  }
}

async function update(req, res, next) {
  const data = await service.update(res.locals.reviewId, req.body.data)
  res.status(201).json({ data })
}

async function destroy(req, res, next) {
  const data = await service.destroy(res.locals.reviewId);
  res.sendStatus(204)
}

module.exports = {
  update: [validateReviewExists, update],
  destroy: [validateReviewExists, destroy]
}
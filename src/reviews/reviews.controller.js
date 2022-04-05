const reviewsService = require("./reviews.service.js");

async function reviewIdExists(req, res, next){
  const review = await reviewsService.read(req.params.reviewId)
  if(review){
    res.locals.review = review
    return next()
  } else {
    next({
      status: 404,
      message: "Review cannot be found."
    })
  }
}


async function destroy(req, res) {
    await reviewsService.delete(res.locals.review.review_id);
    res.sendStatus(204);
  }




async function update(req, res){
  const { reviewId } = req.params
  await reviewsService.update(reviewId, req.body.data)
  res.json({data: await reviewsService.showUpdatedReview(reviewId)})
}

module.exports = {
    update: [reviewIdExists, update],
    delete: [reviewIdExists, destroy]
}
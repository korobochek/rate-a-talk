import { listTalks, listRatingsForTalk } from '../db/talks'
import q from 'q'
import _ from 'lodash'

function calculateAveRating(talk) {
  const ratings = talk.ratings
  const avgRating = Math.round(_.mean(_.map(ratings, rating => rating.rating)) || [0])
  talk.dataValues.averageRating = avgRating
  return talk
}

function talksWithAverageRating() {
  const deferred = q.defer()
  listTalks().then((talks) => {
    deferred.resolve(_.map(talks, calculateAveRating))
  })
  return deferred.promise
}

function specificTalkWithAverageRating(talkId) {
  const deferred = q.defer()
  listRatingsForTalk(talkId).then(talk => {
    deferred.resolve(calculateAveRating(talk))
  })
  return deferred.promise
}

export { talksWithAverageRating, specificTalkWithAverageRating }

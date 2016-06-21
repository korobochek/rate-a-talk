import _ from 'lodash'

export function recalculateAverage(talk, newValue) {
  if (newValue.rating == 0 || newValue.talkId != talk.id) return talk.averageRating

  const coll = _.map(_.filter(talk.ratings, rating => rating.rating && rating.rating != 0), 'rating')
  coll.push(newValue.rating)
  return Math.round(_.sum(coll)/coll.length)
}

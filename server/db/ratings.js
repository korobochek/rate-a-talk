import Sequelize from 'sequelize'
import connection from './connection'

const Rating = connection.define('ratings', {
  rating: Sequelize.INTEGER,
  comment: Sequelize.TEXT,
  talkId: { type: Sequelize.INTEGER, field: 'talkid'}
},
{ timestamps: false })

function saveRating(rating, comment, talkId) {
  if (!talkId) {
    throw 'have to provide talkId'
  }
  return Rating.create({ rating, comment, talkId })
}

export { saveRating }

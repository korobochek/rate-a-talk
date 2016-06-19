import Sequelize from 'sequelize'
import connection from './connection'

const Talk = connection.define('talks', {
  day: Sequelize.STRING,
  time: Sequelize.STRING,
  room: Sequelize.STRING,
  name: Sequelize.STRING,
  speakers: Sequelize.STRING
},
{ timestamps: false })

const Rating = connection.define('ratings', {
  rating: Sequelize.INTEGER,
  comment: Sequelize.TEXT,
  talkId: { type: Sequelize.INTEGER, field: 'talkid'}
},
{ timestamps: false })

Talk.hasMany(Rating)

function listTalks() {
  return Talk.findAll()
}

function listRatingsForTalk(talkId) {
  return Talk.find({ where: { id: talkId }, include: [{ model: Rating }] })
}

export { listTalks, listRatingsForTalk }

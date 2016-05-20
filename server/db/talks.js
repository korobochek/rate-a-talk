import Sequelize from 'sequelize'
import connection from './connection'

const Talks = connection.define('talks', {
  day: Sequelize.STRING,
  time: Sequelize.STRING,
  room: Sequelize.STRING,
  name: Sequelize.STRING,
  speakers: Sequelize.STRING
},
{ timestamps: false })

function listTalks() {
  return Talks.findAll()
}

export default listTalks

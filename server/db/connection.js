import Sequelize from 'sequelize'

const connection = new Sequelize(process.env.DATABASE_URL)
connection
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.')
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err)
  })

export default connection

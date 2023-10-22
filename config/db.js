const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('database', null, null, {
    dialect: 'sqlite',
    storage: 'db.sqlite3',
    logging: false,
})

sequelize
    .authenticate()
    .then(() => console.log('Connection to DB successful!'))
    .catch((err) => {
        console.error('Error connecting to DB: ', err)
        process.exit(1)
    })

module.exports = sequelize

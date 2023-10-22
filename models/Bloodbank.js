const db = require('../config/db')
const { Model, DataTypes } = require('sequelize')

// NOTE: Sequelize automatically adds the fields
// `createdAt` and `updatedAt` to every model
class BloodBank extends Model {}
class BloodGroup extends Model {}

BloodBank.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
    },
    { db, modelName: 'bloodbank' }
)

BloodGroup.init(
    {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']],
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { db, modelName: 'bloodgroup' }
)

BloodGroup.belongsToMany(BloodBank, { through: 'bloodbankgroup' })
BloodBank.belongsToMany(BloodGroup, { through: 'bloodbankgroup' })

module.exports = { BloodBank, BloodGroup }

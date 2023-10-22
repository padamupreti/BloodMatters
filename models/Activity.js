const db = require('../config/db')
const { User, Post } = require('./User')
const { Model, DataTypes } = require('sequelize')

// NOTE: Sequelize automatically adds the fields
// `createdAt` and `updatedAt` to every model
class Activity extends Model {}

Activity.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['request', 'donate']],
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [
                    [
                        'pending',
                        'accepted',
                        'declined',
                        'completed',
                        'cancelled',
                    ],
                ],
            },
            defaultValue: 'pending',
        },
    },
    { db, modelName: 'activity' }
)

User.hasMany(Activity)
Activity.belongsTo(User, { foreignKey: 'senderId', onDelete: 'CASCADE' })
Activity.belongsTo(User, { foreignKey: 'receiverId', onDelete: 'CASCADE' })

Post.hasMany(Activity)
Activity.belongsTo(Post, { onDelete: 'CASCADE' })

module.exports = Activity

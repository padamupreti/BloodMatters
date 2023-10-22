const db = require('../config/db')
const { Model, DataTypes } = require('sequelize')

// NOTE: Sequelize automatically adds the fields
// `createdAt` and `updatedAt` to every model
class User extends Model {}
class Post extends Model {}

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Male', 'Female', 'Other']],
            },
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
        bloodGroup: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']],
            },
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        status: {
            type: DataTypes.STRING,
            default: 'Idle',
        },
    },
    { db, modelName: 'user' }
)

Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['request', 'donate', 'finished', 'info']],
            },
            defaultValue: 'info',
        },
        imageUrl: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            },
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { db, modelName: 'post' }
)

User.hasMany(Post)
Post.belongsTo(User, { onDelete: 'SET NULL' })

module.exports = { User, Post }

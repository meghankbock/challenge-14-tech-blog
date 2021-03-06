const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create post model
class Post extends Model {}

// create fields/columns for post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 50,
                min: 1
            }
        },
        post_content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                max: 1000,
                min: 1
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;
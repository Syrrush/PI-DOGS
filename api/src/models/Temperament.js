const {DataTypes}  = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('temperament', {
        nameTemperament: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
        },
        {
        timestamps: false,
        }
);}
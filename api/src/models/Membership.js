const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "membership",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      purchaseDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
      }

    },

    { timestamps: false }
  );
};
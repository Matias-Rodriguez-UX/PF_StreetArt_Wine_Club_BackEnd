const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "membership",
    {
      /* id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      }, */
      name: {
        type: DataTypes.ENUM('stencil', 'graffiti', ' '),
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    { timestamps: false }
  );
};
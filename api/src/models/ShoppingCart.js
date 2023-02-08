const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "shoppingCart",
    {
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

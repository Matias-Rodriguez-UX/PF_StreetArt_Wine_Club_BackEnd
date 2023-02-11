const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      // number: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      // },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('cart', 'processing payment', 'processing shipping', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'cart',
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

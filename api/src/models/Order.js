const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      orderNumber: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('processing payment', 'processing shipping', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'processing payment',
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

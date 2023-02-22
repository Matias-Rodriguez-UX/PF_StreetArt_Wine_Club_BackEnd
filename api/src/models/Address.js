const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "address",
    {
      reference: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telephone:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      state:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      region:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    { timestamps: false }
  );
};
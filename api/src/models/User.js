const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
          isEmail: {
            msg: "Email invalido"
          }
        }
      },
    },
    { timestamps: false }
  );
};

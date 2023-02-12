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
            msg: "Ingrese un mail válido"
          }
        }
      },
      role: {
        type: DataTypes.ENUM('common', 'member', 'admin', 'superAdmin'),
        defaultValue: 'common',
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile: {
        type: DataTypes.TEXT,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'suspended'),
        defaultValue: 'active'
      },
      passwordToken: {
        type: DataTypes.TEXT,
      }

    },
    { timestamps: false }
  );
};

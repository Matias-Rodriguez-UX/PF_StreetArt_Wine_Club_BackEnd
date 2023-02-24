const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("newsletter", {
    //indica el contenido/descripción
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    discount: {
        type: DataTypes.INTEGER,
      },
    userStatus: {
      type: DataTypes.ENUM("subscribed", "unsubscribed"),
      defaultValue: 'unsubscribed',
    },
    status: {
      type: DataTypes.ENUM("pending", "sent", "cancelled"),
      defaultValue: 'pending',
    },
  });
};

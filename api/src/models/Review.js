const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "review",
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: 5,
          min: 1,
        },
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

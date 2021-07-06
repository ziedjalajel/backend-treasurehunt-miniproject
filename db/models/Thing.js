module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Thing", {
    name: {
      type: DataTypes.STRING,
    },
    isTreasure: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Product;
};

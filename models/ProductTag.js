const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //product_name;

    //price
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "10",
      validation: {
        isDecimal: true,
      },
    },

    // category_id: {
    //   DataTypes: DataTypes.INTEGER,
    //   references: {
    //     model: "Product",
    //     key: "id",
    //   },
    // },
    tag_id: {
      type: DataTypes.INTEGER,
      refereces: {
        model: "Tag",
        key: "id",
      },
      // },
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;

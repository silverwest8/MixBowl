import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class API_cocktaildb extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    idDrink: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    strDrink: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    strCategory: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strAlcoholic: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strGlass: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strInstructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    strIngredient1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strIngredient2: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strIngredient3: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strIngredient4: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strIngredient5: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strIngredient6: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strIngredient7: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strIngredient8: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strIngredient9: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strIngredient10: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strIngredient11: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strIngredient12: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strIngredient13: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strIngredient14: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strIngredient15: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure2: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure3: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure4: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure5: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure6: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure7: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure8: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure9: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure10: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure11: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure12: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure13: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure14: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    strMeasure15: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'API_cocktaildb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idDrink" },
        ]
      },
    ]
  });
  }
}

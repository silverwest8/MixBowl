import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ninja_recipe extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    CNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'COCKTAIL',
        key: 'CNO'
      }
    },
    INGRED: {
      type: DataTypes.STRING(80),
      allowNull: false,
      primaryKey: true
    },
    AMOUNT: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    UNIT: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ninja_recipe',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CNO" },
          { name: "INGRED" },
        ]
      },
    ]
  });
  }
}

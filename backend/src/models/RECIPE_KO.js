import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class RECIPE_KO extends Model {
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
    NAME: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    NAME_KO: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    AMOUNT: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    UNIT: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'RECIPE_KO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CNO" },
          { name: "NAME" },
        ]
      },
    ]
  });
  }
}

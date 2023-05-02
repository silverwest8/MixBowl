import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class COCKTAIL_LIKE extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    UNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'USER',
        key: 'UNO'
      }
    },
    CNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'COCKTAIL',
        key: 'CNO'
      }
    }
  }, {
    sequelize,
    tableName: 'COCKTAIL_LIKE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UNO" },
          { name: "CNO" },
        ]
      },
      {
        name: "UNO_idx",
        using: "BTREE",
        fields: [
          { name: "UNO" },
        ]
      },
      {
        name: "RNO4",
        using: "BTREE",
        fields: [
          { name: "CNO" },
        ]
      },
      {
        name: "RNO",
        using: "BTREE",
        fields: [
          { name: "CNO" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class RECIPE extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    RNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'COCKTAIL',
        key: 'CNO'
      }
    },
    INO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'INGREDIENT',
        key: 'INO'
      }
    },
    VOLUME: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    UNIT: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'RECIPE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RNO" },
          { name: "INO" },
        ]
      },
      {
        name: "INO_idx",
        using: "BTREE",
        fields: [
          { name: "INO" },
        ]
      },
    ]
  });
  }
}

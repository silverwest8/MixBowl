import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class RECIPE_LIKE extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    RLNO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'USER',
        key: 'UNO'
      }
    },
    RNO: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'RECIPE_LIKE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RLNO" },
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
        name: "RNO",
        using: "BTREE",
        fields: [
          { name: "RNO" },
        ]
      },
      {
        name: "RNO4",
        using: "BTREE",
        fields: [
          { name: "RNO" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class POST_LIKE extends Model {
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
    PNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'POST',
        key: 'PNO'
      }
    }
  }, {
    sequelize,
    tableName: 'POST_LIKE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UNO" },
          { name: "PNO" },
        ]
      },
      {
        name: "UNO5_idx",
        using: "BTREE",
        fields: [
          { name: "UNO" },
        ]
      },
      {
        name: "PNO5_idx",
        using: "BTREE",
        fields: [
          { name: "PNO" },
        ]
      },
    ]
  });
  }
}

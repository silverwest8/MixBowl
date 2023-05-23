import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class POST_REPLY extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    PRNO: {
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
    PNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'POST',
        key: 'PNO'
      }
    },
    CONTENT: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'POST_REPLY',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PRNO" },
        ]
      },
      {
        name: "PNO_idx",
        using: "BTREE",
        fields: [
          { name: "PNO" },
        ]
      },
      {
        name: "UNO_idx",
        using: "BTREE",
        fields: [
          { name: "UNO" },
        ]
      },
    ]
  });
  }
}

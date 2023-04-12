import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class POST_REPL extends Model {
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
    },
    DATE_CREATE: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    DATE_UPDATE: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'POST_REPL',
    timestamps: false,
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

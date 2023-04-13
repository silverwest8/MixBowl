import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class POST extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    PNO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'RECIPE',
        key: 'RNO'
      }
    },
    UNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'USER',
        key: 'UNO'
      }
    },
    CATEGORY: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TITLE: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    CONTENT: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    LIKE: {
      type: DataTypes.INTEGER,
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
    tableName: 'POST',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
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
      {
        name: "UNO1_idx",
        using: "BTREE",
        fields: [
          { name: "UNO" },
        ]
      },
      {
        name: "RNO1",
        using: "BTREE",
        fields: [
          { name: "RNO" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class REVIEW extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    REVIEW_ID: {
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
    PLACE_ID: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'PLACE',
        key: 'PLACE_ID'
      }
    },
    TEXT: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    RATING: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'REVIEW',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "REVIEW_ID" },
        ]
      },
      {
        name: "PLACE_ID_idx",
        using: "BTREE",
        fields: [
          { name: "PLACE_ID" },
        ]
      },
      {
        name: "UNO7_idx",
        using: "BTREE",
        fields: [
          { name: "UNO" },
        ]
      },
    ]
  });
  }
}

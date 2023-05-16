import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class IMAGE_COMMUNITY extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IMAGE_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'POST',
        key: 'PNO'
      }
    },
    PATH: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'IMAGE_COMMUNITY',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IMAGE_ID" },
        ]
      },
      {
        name: "PNO_idx",
        using: "BTREE",
        fields: [
          { name: "PNO" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class IMAGE extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IMAGE_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    REVIEW_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'REVIEW',
        key: 'REVIEW_ID'
      }
    },
    PATH: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'IMAGE',
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
        name: "REVIEW_ID_idx",
        using: "BTREE",
        fields: [
          { name: "REVIEW_ID" },
        ]
      },
    ]
  });
  }
}

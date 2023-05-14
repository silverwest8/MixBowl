import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class ADMIN extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    UNO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    EMAIL: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "EMAIL_UNIQUE"
    },
    PASSWORD: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'ADMIN',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UNO" },
        ]
      },
    ]
  });
  }
}

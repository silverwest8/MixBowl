import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class USER extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    UNO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NICKNAME: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    EMAIL: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    PASSWORD: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    LEVEL: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TOKEN: {
      type: DataTypes.STRING(400),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'USER',
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

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class INGREDIENT extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    INO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ABV: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'INGREDIENT',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "INO" },
        ]
      },
    ]
  });
  }
}

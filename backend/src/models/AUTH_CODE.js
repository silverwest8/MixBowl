import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class AUTH_CODE extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    CNO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    EMAIL: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    AUTH_CODE: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    DATE_CREATE: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'AUTH_CODE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CNO" },
        ]
      },
    ]
  });
  }
}

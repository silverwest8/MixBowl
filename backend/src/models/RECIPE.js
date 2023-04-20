import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class RECIPE extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    RNO: {
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
    NAME: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    IMAGE_PATH: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    RECIPE_JSON: {
      type: DataTypes.JSON,
      allowNull: false
    },
    COLOR: {
      type: DataTypes.STRING(45),
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
    tableName: 'RECIPE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RNO" },
        ]
      },
      {
        name: "UNO3_idx",
        using: "BTREE",
        fields: [
          { name: "UNO" },
        ]
      },
    ]
  });
  }
}

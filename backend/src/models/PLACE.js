import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PLACE extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    PLACE_ID: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ADDRESS: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ROAD_ADDRESS: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    PHONE: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    X: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Y: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    URL: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PLACE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PLACE_ID" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class COCKTAIL_SAVE extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    CNO: {
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
      allowNull: false,
      unique: "NAME_UNIQUE"
    },
    ALCOHOLIC: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "1- 0~ 5(낮음), 2 - 6~15(보통), 3 - 그 이상(높음)"
    },
    INSTRUCTION: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    IMAGE_PATH: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    GLASS: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'COCKTAIL_SAVE',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CNO" },
        ]
      },
      {
        name: "NAME_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NAME" },
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
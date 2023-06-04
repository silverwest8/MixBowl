import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class COCKTAIL extends Model {
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
    NAME_EN: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ALCOHOLIC: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "0- 0~ 5(낮음), 1 - 6~15(보통), 2 - 그 이상(높음)"
    },
    INSTRUCTION: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    INSTRUCTION_EN: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    IMAGE_PATH: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    GLASS: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    HIDE: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'COCKTAIL',
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

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class API_ninja_en extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "NAME_UNIQUE"
    },
    INGREDIENT1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    INGREDIENT2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    INGREDIENT3: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    INGREDIENT4: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    INGREDIENT5: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    INGREDIENT6: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    INGREDIENT7: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    INGREDIENT8: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    INGREDIENT9: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    INGREDIENT10: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    INSTRUCTION: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'API_ninja_en',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
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
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cocktaildb_recipeset extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    CNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cocktaildbset',
        key: 'CNO'
      }
    },
    INGRED: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    AMOUNT: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    UNIT: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cocktaildb_recipeset',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CNO" },
          { name: "INGRED" },
        ]
      },
      {
        name: "CNO3_idx",
        using: "BTREE",
        fields: [
          { name: "CNO" },
        ]
      },
    ]
  });
  }
}

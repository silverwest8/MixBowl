import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class COLOR extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    CNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'COCKTAIL',
        key: 'CNO'
      }
    },
    COLOR: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "1 빨강\n2 주황\n3 노랑\n4 초록\n5 파랑\n6 보라\n7 분홍\n8 검정\n9 갈색\n10 회색\n11 흰색\n12 무색"
    }
  }, {
    sequelize,
    tableName: 'COLOR',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CNO" },
          { name: "COLOR" },
        ]
      },
      {
        name: "RNO_idx",
        using: "BTREE",
        fields: [
          { name: "CNO" },
        ]
      },
    ]
  });
  }
}

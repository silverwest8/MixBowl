import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class KEYWORD extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    REVIEW_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'REVIEW',
        key: 'REVIEW_ID'
      }
    },
    KEYWORD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "1 - 술이 맛있어요\\n2 - 술이 다양해요\\n3 - 혼술하기 좋아요\\n4 - 분위기가 좋아요\\n5 - 직원이 친절해요\\n6 - 대화하기 좋아요\\n7 - 가성비가 좋아요\\n8 - 메뉴가 다양해요\\n9 - 음식이 맛있어요"
    }
  }, {
    sequelize,
    tableName: 'KEYWORD',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "REVIEW_ID" },
          { name: "KEYWORD" },
        ]
      },
      {
        name: "REVIEW_ID_idx",
        using: "BTREE",
        fields: [
          { name: "REVIEW_ID" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class POST extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    PNO: {
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
    CATEGORY: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "1 - 칵테일 추천 || 2 - 질문과 답변 || 3 - 칵테일 리뷰 || 4 - 자유"
    },
    CNO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "CATEGORY 3일때만 있음",
      references: {
        model: 'COCKTAIL',
        key: 'CNO'
      }
    },
    TITLE: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "1 - 칵테일 추천 -> 제목있음 || 2 - 질문과 답변 -> 제목 없음 || 3 - 칵테일 리뷰 -> 제목으로 칵테일 이름 선택 || 4 - 자유 -> 제목있음"
    },
    LIKE: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    CONTENT: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "1 - 칵테일 추천 -> 제목있음 || 2 - 질문과 답변 -> 제목 없음 || 3 - 칵테일 리뷰 -> 제목으로 칵테일 이름 선택 || 4 - 자유 -> 제목있음"
    }
  }, {
    sequelize,
    tableName: 'POST',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PNO" },
        ]
      },
      {
        name: "UNO_idx",
        using: "BTREE",
        fields: [
          { name: "UNO" },
        ]
      },
      {
        name: "UNO1_idx",
        using: "BTREE",
        fields: [
          { name: "UNO" },
        ]
      },
      {
        name: "RNO1",
        using: "BTREE",
        fields: [
          { name: "CNO" },
        ]
      },
    ]
  });
  }
}

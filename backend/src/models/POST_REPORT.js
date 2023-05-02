import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class POST_REPORT extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    PNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'POST',
        key: 'PNO'
      }
    },
    UNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'USER',
        key: 'UNO'
      }
    },
    REPORT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "1-부적절한 표현, 욕설 또는 혐오 표현\\n2-스팸 또는 사용자를 현혹하는 콘텐츠\\n3-유해하거나 위험한 컨텐츠\\n4-증오 또는 위험한 콘텐츠"
    }
  }, {
    sequelize,
    tableName: 'POST_REPORT',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PNO" },
          { name: "UNO" },
        ]
      },
      {
        name: "UNO_idx",
        using: "BTREE",
        fields: [
          { name: "UNO" },
        ]
      },
    ]
  });
  }
}

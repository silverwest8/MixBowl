import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class USER extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    UNO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NICKNAME: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    EMAIL: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    PASSWORD: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    LEVEL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1: Level 1-> 가입만 하면 됨\n2: Level 2 -> 일주일에 3회 이상 || 게시글 10개 이상\n3: Level 3 -> 게시글 30개 이상\n* 한번 등급이 올라가면 안떨어짐\n\n4: 바 사장님\n5. 조주기능사\n"
    },
    TOKEN: {
      type: DataTypes.STRING(400),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'USER',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UNO" },
        ]
      },
    ]
  });
  }
}

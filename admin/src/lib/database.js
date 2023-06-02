import { Sequelize, Model, DataTypes } from 'sequelize';

class _ADMIN extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    UNO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    EMAIL: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "EMAIL_UNIQUE"
    },
    PASSWORD: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ADMIN',
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
      {
        name: "EMAIL_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EMAIL" },
        ]
      },
    ]
  });
  }
}


// Sequelize 인스턴스화

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: '3306',
    dialect: 'mysql',
    directory: './src/models',
    lang: 'esm',
    logging: false,
  }
);
sequelize
  .sync({ force: false }) //true면 서버 실행마다 테이블 재생성
  .then(() => {
    console.log('Mysql Connecting Success with Sequelize');
  })
  .catch((err) => {
    console.error(err);
  });
const ADMIN = _ADMIN.init(sequelize, DataTypes);

export const db = { ADMIN };
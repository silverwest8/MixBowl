import mysql from "mysql2";

// pool 을 사용한 이유 -> Connection 계속 유지하므로 부하 적어짐. (병렬 처리 가능)
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: '3.34.97.140',
    user: 'mixbowl',
    database: 'Mixbowl',
    password: 'swe302841',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);
const promisePool = pool.promise();

const sql = {

  getUser : async () => {
    const [rows] = await promisePool.query(`
      SELECT * FROM USER
    `)
    return rows
  },

  signupUser : async (req) =>{
    const {nickname, email, password} = req.body; //regitserInfo에는 Nickname, Email, Password 가 포함되어야 함.
    //-- 토큰 빠져 있음 -> 임의 추가 했어요. + ORM으로 바꾸어도 상관없어요
    console.log(nickname,email,password);
    try{
      await promisePool.query(`
        INSERT INTO Mixbowl.USER (NICKNAME, EMAIL, PASSWORD, LEVEL, TOKEN) 
        VALUES ('${nickname}', '${email}', '${password}', 1, 'tsetestestes');
      `);
    }catch(error){
      console.log(error.message);
    }
  },

  loginUser : async(req) => {
    const {nickname, password} = req.body;
    try{
      const [username]= await promisePool.query(`
        SELECT NICKNAME FROM Mixbowl.USER WHERE '${nickname}' = NICKNAME AND '${password}' = PASSWORD ;
      `);
      console.log(username);
      return username;
    }catch(error){
      console.log(error.message);
    }
  }
}

export default sql;

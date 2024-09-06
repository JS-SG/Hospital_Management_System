import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_mysql_password",
    database: "your_database_name"
});
db.connect((err)=>{
    if(err){
        console.log("Connection error");
    }
    else{
    console.log("Connected to backend");
    }
})

export default db;

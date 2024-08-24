import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Royal@2004",
    database: "hosp_manage_system"
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
import { formatLocalDate } from "./fomat_local_date.js";

export const InsertLogs = ({ connMySql, err, pool=false}) => {
  try {
    if (err["sql"]) {
      let sql = err["sql"].toString();
      sql = sql.replace(/'/g, "");
  
      let sqlMessage = err["sqlMessage"];
      sqlMessage = sqlMessage.replace(/'/g, "");
  
      let code = err["code"];

      connMySql.query(
        `INSERT INTO logs_history (sqlerr, codeerr,sqlmessage, createdat) VALUES ('${sql}', '${code}', '${sqlMessage}', '${formatLocalDate()}')`,
        (err, result) => {
          if 
          (err) console.log(err);
          else 
          console.log("insert log");
        }
      );
    }else{
      let resbody = err.toString();
      resbody = resbody.replace(/'/g, "");
      connMySql.query(
        `INSERT INTO logs_history (resbody, createdat) VALUES ('${resbody}', '${formatLocalDate()}')`,
        (err, result) => {
          if (err) 
          console.log(err);
          else 
          console.log("insert log");
        }
      );
    }
    
    if (!pool) {
      connMySql.end(() => {
        console.log("close connection with log");
      });
    }
  } catch (error) {
    console.log("error insert log");
  }
};

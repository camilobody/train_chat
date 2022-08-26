import { formatLocalDate } from "./fomat_local_date.js";

export const InsertLogs = ({ connMySql, err }) => {
  console.log(err);
  let sql = err["sql"];
  sql = sql.replace(/'/g, "");

  let sqlMessage = err["sqlMessage"];
  sqlMessage = sqlMessage.replace(/'/g, "");

  let code = err["code"];

  connMySql.query(
    `INSERT INTO logs_history (sqlerr, codeerr,sqlmessage, createdat) VALUES ('${sql}', '${code}', '${sqlMessage}', '${formatLocalDate()}')`,
    (err, result) => {
      if (err) console.log(err);
      else console.log("insert log");
    }
  );

  connMySql.end(() => {
    console.log("close connection with log");
  });
};

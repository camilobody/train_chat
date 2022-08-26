import getConnectionMySql from "../config/mysqlConnect.js";
import { formatLocalDate } from "../utils/fomat_local_date.js";
import { InsertLogs } from "../utils/insert_logs.js";

const service = {};

service.insertToken = (member) => {
  const connMySql = getConnectionMySql();
  const query = () => {
    return new Promise((res, rej) => {
      try {
        connMySql.query(
          `INSERT INTO token_notification (id_rethink, device, id_member, id_user, token, type) VALUES ('${
            member.id_rethink
          }','${member.device}','${member.id_member ?? null}','${
            member.id_user ?? null
          }','${member.token}','${member.type}')`,
          (err, result) => {
            if (err) rej(err);
            res("execute query successfully");
          }
        );
      } catch (error) {
        console.log({ error });
      }
    });
  };
  query()
    .then((result) => {
      connMySql.end(() => {
        console.log("close connection");
      });
      console.log(result);
    })
    .catch((err) => {
      InsertLogs({
        connMySql: connMySql,
        err: err,
      });
    });
};

export default service;

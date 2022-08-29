import getConnectionMySql from "../config/mysqlConnect.js";
import { InsertLogs } from "../utils/insert_logs.js";

const service = {};

service.addMeeting = (member) => {
  const connMySql = getConnectionMySql();
  const query = () => {
    return new Promise((res, rej) => {
      connMySql.query(
        `INSERT INTO meetings (id_channel, create_at, status, id_rethink) VALUES ('${member.id_channel}','${member.create_at}','${member.status}','${member.id_rethink}')`,
        (err, result) => {
          if (err) rej(err);
          console.log(result);
          res("execute query successfully");
        }
      );
    });
  };
  query()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      InsertLogs({
        connMySql: connMySql,
        err: err,
      });
    });
};

service.addStatusMeeting = (member) => {
  const connMySql = getConnectionMySql();
  const query = () => {
    return new Promise((res, rej) => {
      connMySql.query(
        `UPDATE meetings SET status = '${member.status}' WHERE id_rethink = '${member.id_meet}'`,
        (err, result) => {
          if (err) rej(err);
          res("execute query successfully");
        }
      );
    });
  };
  query()
    .then((result) => {
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

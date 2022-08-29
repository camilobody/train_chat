import getConnectionMySql from "../config/mysqlConnect.js";
import { InsertLogs } from "../utils/insert_logs.js";

const service = {};

service.addChannel = (member) => {
  const connMySql = getConnectionMySql();
  const query = () => {
    return new Promise((res, rej) => {
      connMySql.query(
        `INSERT INTO channels (id_channel, id_member, id_service_line, id_user, id_rethink) VALUES ('${member.id_channel}','${member.id_member}','${member.id_service_line}','${member.id_user}','${member.id_rethink}')`,
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

service.updateChannel = (member) => {
  const connMySql = getConnectionMySql();
  const query = () => {
    return new Promise((res, rej) => {
      connMySql.query(
        `UPDATE channels SET id_user = '${member.id_user}' WHERE id_channel = '${member.id_channel}'`,
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
      console.log(err);
    });
};

export default service;

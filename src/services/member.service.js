import getConnectionMySql from "../config/mysqlConnect.js";
import { InsertLogs } from "../utils/insert_logs.js";

const service = {};

service.addMember = (member) => {
  const connMySql = getConnectionMySql();
  const query = () => {
    return new Promise((res, rej) => {
      connMySql.query(
        `INSERT INTO members (id_member, document_number, email, first_name, last_name, mobile_phone,photo, id_rethink) VALUES ('${member.id_member}','${member.document_number}','${member.email}','${member.first_name}','${member.last_name}','${member.mobile_phone}','${member.photo}','${member.id_rethink}')`,
        (err, result) => {
          if (err) rej(err);
          // console.log(result);
          try {
            // connMySql.query(
            //   `INSERT INTO token_notification (device, id_user, token, type, id_member) VALUES ('${member.device}','','${member.token}','${member.type}','${member.id_member}')`,
            //   (err, result) => {
            //     // Insert data token user
            //     if (err) rej(err);
            //     console.log(result);
            //     res("execute query successfully");
            //   }
            // );
            res("execute query successfully");
          } catch (error) {
            console.log(error);
          }
        }
      );
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

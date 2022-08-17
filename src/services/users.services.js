import getConnectionMySql from "../config/mysqlConnect.js";

const service = {}

service.addUsers = (member) =>{ 
    const connMySql = getConnectionMySql();
    const query = () => {
      return new Promise((res, rej) => {
        // Insert data user
        connMySql.query(
          `INSERT INTO users (first_name, id_user, last_name, role_id, status, id_rethink) VALUES ('${member.first_name}','${member.id_user}','${member.last_name}','${member.role_id}','${member.status}','${member.id_rethink}')`,
          (err, result) => {
            if (err) rej(err);
            console.log(result);
            connMySql.query(
                `INSERT INTO token_notification (device, id_user, token, type, id_member) VALUES ('${member.device}','${member.id_user}','${member.token}','${member.type}','')`,
                (err, result) => {
                  // Insert data token user
                  if (err) rej(err);
                  console.log(result);
                  res(console.log("execute query successfully"));
                }
              );
          }
        );
        // connMySql.query(
        //     `INSERT INTO users (first_name, id_user, last_name, role_id, status, id_rethink) VALUES ('${member.first_name}','${member.id_user}','${member.last_name}','${member.role_id}','${member.status}','${member.id_rethink}')`,
        //     (err, result) => {
        //       if (err) rej(err);
        //       console.log(result);
        //       res(console.log("execute query successfully"));
        //     }
        //   );
      });
    };
    query()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
}

export default service;
import getConnectionMySql from "../config/mysqlConnect.js";

const service = {}

service.addMeeting = (member) =>{ 
    const connMySql = getConnectionMySql();
    const query = () => {
      return new Promise((res, rej) => {
        connMySql.query(
          `INSERT INTO meetings (id_channel, create_at, status, id_rethink) VALUES ('${member.id_channel}','${member.create_at}','${member.status}','${member.id_rethink}')`,
          (err, result) => {
            if (err) rej(err);
            console.log(result);
            res(console.log("execute query successfully"));
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
}

export default service;
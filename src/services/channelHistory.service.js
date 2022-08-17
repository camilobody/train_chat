import getConnectionMySql from "../config/mysqlConnect.js";

const service = {}

service.addReassing = (member) =>{ 
    const connMySql = getConnectionMySql();
    const query = () => {
      return new Promise((res, rej) => {
        connMySql.query(
          `INSERT INTO reassign_history (id_channel, create_at, last_id_user, new_id_user, id_rethink) VALUES ('${member.id_channel}','${member.create_at}','${member.last_id_user}','${member.new_id_user}','${member.id_rethink}')`,
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
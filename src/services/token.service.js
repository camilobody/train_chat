import getConnectionMySql from "../config/mysqlConnect.js";

const service = {}

service.insertToken = (member) =>{ 
  const connMySql = getConnectionMySql();
  const query = () => {
    return new Promise((res, rej) => {
      try {
        connMySql.query(
            `INSERT INTO token_notification (id_rethink, device, id_member, id_user, token, type) VALUES ('${member.id_rethink}','${member.device}','${member.id_member ?? null}','${member.id_user ?? null}','${member.token}','${member.type}')`,
            (err, result) => {
                if (err) rej(err);
                res("execute query successfully")
            }
        );
      } catch (error) {
        console.log({error});
      }  
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
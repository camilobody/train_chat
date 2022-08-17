import getConnectionMySql from "../config/mysqlConnect.js";

const service = {}

service.addMember = (member) =>{ 
    const connMySql = getConnectionMySql();
    const query = () => {
      return new Promise((res, rej) => {
        connMySql.query(
          `INSERT INTO members (id_member, document_number, email, first_name, last_name, mobile_phone,photo, id_rethink) VALUES ('${member.id_member}','${member.document_number}','${member.email}','${member.first_name}','${member.last_name}','${member.mobile_phone}','${member.photo}','${member.id_rethink}')`,
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
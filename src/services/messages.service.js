import getConnectionMySql from "../config/mysqlConnect.js";

const service = {}

service.addMessages = (member) =>{ 
    const connMySql = getConnectionMySql();
    const query = () => {
      return new Promise((res, rej) => {
        connMySql.query(
          `INSERT INTO messages (author, author_name, author_type, content, create_at, id_channel, id_meet, id_rethink, type) VALUES ('${member.author}','${member.author_name}','${member.author_type}','${member.content}','${member.create_at}','${member.id_channel}','${member.id_meet}','${member.id_rethink}','${member.type}')`,
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
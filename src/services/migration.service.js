import r from "rethinkdb";
import getRethinkDB from "../rethinkdb/rethinkdb.js";
import { insertbyflag } from "../utils/insertsbyflag.js";

import getConnectionMySql from "../config/mysqlConnect.js";

const service = {};

service.migration = async () => {
  const conn = await getRethinkDB();

  return new Promise((resolve, reject) => {
    r.table("token_notification")
      // .slice(11, 12)
      // .limit(1)
      .run(conn, (err, cursor) => {
        if (err) reject(err);
        else {
          cursor.toArray(async (err, result) => {
            for (var i = 0; i < result.length; i++) {
              if (result[0].token.token) {
                result[0] = {
                  id_rethink: result[0].id,
                  ...result[0].token,
                };
              }

              const token = {
                id_rethink: result[i].id,
                ...result[i],
              };

              await service.add({ flag: "insert_token", message: token });
              console.log("dta: ", i);
              await sleep(30);
              if (i % 5000 == 0 && i > 0) {
                console.log(i);
                console.log("wait");
                await sleep(30000);
                console.log("start");
              }
            }
            console.log("end tokens");
            await sleep(3000);

            r.table("users").run(conn, (err, cursor) => {
              if (err) reject(err);
              else {
                cursor.toArray(async (err, result) => {
                  if (err) reject(err);
                  else {
                    for (const val of result) {
                      const user = {
                        id_rethink: val.id,
                        ...val,
                      };

                      await service.add({ message: user, flag: "insert_user" });
                      console.log(i);
                      await sleep(30);

                      if (i % 5000 == 0 && i > 0) {
                        console.log(i);
                        console.log("wait");
                        await sleep(40000);
                        console.log("start");
                      }
                    }
                    await sleep(4000);

                    r.table("members").run(conn, (err, cursor) => {
                      if (err) reject(err);
                      else {
                        cursor.toArray(async (err, result) => {
                          if (err) reject(err);
                          else {
                            for (const val of result) {
                              const userData = {
                                id_rethink: val.id,
                                ...val,
                              };

                              await service.add({
                                message: userData,
                                flag: "insert_member",
                              });
                              // console.log(i);
                              await sleep(30);

                              // if (i % 5000 == 0 && i > 0) {
                              //   console.log(i);
                              //   console.log("wait");
                              //   await sleep(40000);
                              //   console.log("start");
                              // }
                            }
                            await sleep(5000);

                            r.table("channels").run(conn, (err, cursor) => {
                              if (err) reject(err);
                              else {
                                cursor.toArray(async (err, result) => {
                                  if (err) reject(err);
                                  else {
                                    for (const val of result) {
                                      const channel = {
                                        id_rethink: val.id,
                                        ...val,
                                      };

                                      await service.add({
                                        message: channel,
                                        flag: "insert_channel",
                                      });
                                    }
                                    await sleep(3000);

                                    r.table("meetings").run(
                                      conn,
                                      (err, cursor) => {
                                        if (err) reject(err);
                                        else {
                                          cursor.toArray(
                                            async (err, result) => {
                                              if (err) reject(err);
                                              else {
                                                for (const val of result) {
                                                  const meet = {
                                                    id_rethink: val.id,
                                                    ...val,
                                                  };

                                                  await service.add({
                                                    message: meet,
                                                    flag: "insert_meeting",
                                                  });
                                                }

                                                await sleep(3000);

                                                r.table("messages").run(
                                                  conn,
                                                  (err, cursor) => {
                                                    if (err) reject(err);
                                                    else {
                                                      cursor.toArray(
                                                        async (err, result) => {
                                                          if (err) reject(err);
                                                          else {
                                                            for (const val of result) {
                                                              const message = {
                                                                id_rethink:
                                                                  val.id,
                                                                ...val,
                                                              };

                                                              await service.add(
                                                                {
                                                                  message:
                                                                    message,
                                                                  flag: "insert_messages",
                                                                }
                                                              );
                                                              await sleep(100);
                                                            }
                                                          }
                                                        }
                                                      );
                                                    }
                                                  }
                                                );
                                              }
                                            }
                                          );
                                        }
                                      }
                                    );
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });

            console.log("migration");

            resolve("migration ok");
          });
        }
      });
  });
};

service.add = ({ flag, message }) => {
  return new Promise((resolve, reject) => {
    insertbyflag({
      flag: flag,
      message: message,
    });
    console.log(message);
    resolve("ok");
  });
};

service.fixUser = async () => {
  const connMySql = getConnectionMySql();
  const conn = await getRethinkDB();

  const query = () => {
    return new Promise((res, rej) => {
      // Insert data user
      connMySql.query(`SELECT * FROM users`, (err, result) => {
        if (err) rej(err);
        // console.log(result);c

        // r.table("users")
        //   .filter({ id: result[0].id_rethink })
        //   .update({
        //     first_name: result[0].first_name,
        //     last_name: result[0].last_name,
        //   })
        //   .run(conn, (err, res) => {
        //     if (err) console.log("err: ", err);
        //     else {
        //       console.log(result[0].id_user);
        //       console.log(res);

        //     }
        //   });

        result.forEach((element) => {
          r.table("users")
            .filter({ id: element.id_rethink })
            .update({
              first_name: element.first_name,
              last_name: element.last_name,
            })
            .run(conn, (err, res) => {
              if (err) console.log("err: ", err);
              else {
                console.log(element.id_user);
                // cursor.toArray((err, res) => {
                //   if (err) console.log("err: ", err);
                //   else {
                //     console.log(res[0]);
                //   }
                // });
              }
            });
        });
      });
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

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default service;

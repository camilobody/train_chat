import rabbitConnect from "../config/rabbitConnect.js";

import { insertbyflag } from "../utils/insertsbyflag.js";

const receiveMsg = () => {
  rabbitConnect((conn) => {
    conn.createChannel((err, channel) => {
      if (err) console.error(err);
      // const queue = "chat_msm_test2";
      const queue = process.env.QUEUE_DEV;

      channel.assertQueue(queue, {
        durable: false,
      });
      channel.prefetch(1);
      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C ",
        queue
      );
      channel.consume(
        queue,
        async (msg) => {
          const message = JSON.parse(msg.content.toString());
          insertbyflag({
            flag: message.flag,
            message: message,
          });
          console.log("[x] message recieved ", msg.content.toString());
        },
        { noAck: true }
      );
    });
  });
};

export default receiveMsg;

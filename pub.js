const mqtt = require("mqtt");
const host = "broker.emqx.io";
const PORT = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const settings = {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "emqx",
  password: "public",
  reconnectPeriod: 1000,
};
const connectUrl = `mqtt://${host}:${PORT}`;
const client = mqtt.connect(connectUrl, settings);

const topic = "/Unifor/BlocoM/M09/Nivel";
client.on("connect", () => {
  console.log("Connected");
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`);
  });

  client.publish(topic, "strNivel", { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
  });
});

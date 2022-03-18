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

let data = [];

client.on("message", (topic, payload) => {
  console.log("Received Message:", topic, payload.toString());
  console.log(payload);
  data = payload.toJSON();
  console.log(data);
  return data;
});

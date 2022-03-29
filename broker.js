// MQTT Broker
const mqtt = require("mqtt");
const host = "broker.emqx.io";
const PORT = "1883";
const crypto = require("crypto");
const clientId = crypto.randomBytes(16).toString("hex");
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

const topic = "Unifor/BlocoM/M09/Nivel";

// MQTT Subscribe
client.on("connect", () => {
  client.subscribe([topic], () => {
    console.log(`Subscribed to topic '${topic}'`);
  });
});


let volume = [];

client.on("message", (topic, payload) => {
  // console.log(`Received Message: Topic: ${topic}, Message: ${payload}`);

  volume = payload.toString();

  return volume;
});

exports.volume = volume;

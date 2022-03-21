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

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const connectUrl = `mqtt://${host}:${PORT}`;
const client = mqtt.connect(connectUrl, settings);

// Ao inscrever-se no tópico
const topic = "Unifor/BlocoM/M09/Nivel";

client.on("connect", () => {
  console.log("MQTT Connected");

  client.subscribe([topic], () => {
    console.log(`Subscribed to topic '${topic}'`);
  });

  client.publish(topic, "strNivel", { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
  });
});

let garbageLevel = [];

// Ao receber mensagem
client.on("message", (topic, payload) => {
  console.log(`Received Message: Topic: ${topic}, Message: ${payload}`);

  garbageLevel = payload.toString();

  console.log(garbageLevel);

  return garbageLevel;
});

app.get("/", cors(), (req, res) => {
  return res.json({ garbageLevel });
});

app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 3000')
});

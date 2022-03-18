const mqtt = require("mqtt");

const host = "broker.emqx.io";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const express = require("express");

const app = express();
app.use(express.json());

const connectUrl = `mqtt://${host}:${port}`;
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "emqx",
  password: "public",
  reconnectPeriod: 1000,
});

// inscrevendo-se no tópico
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

let data = [];

client.on("message", (topic, payload) => {
  console.log("Received Message:", topic, payload.toString());
  console.log(payload);
  data = payload.toJSON();
  console.log(data)
  return data;
});

app.get("/data", (req, res) => {
  console.log(res.statusCode)
  return res.data;
});

app.listen(3000);

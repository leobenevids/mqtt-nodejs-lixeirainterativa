const broker = require("./broker");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
app.use(cors());
app.use(express.json());

app.get("/", cors(), (req, res) => {
  const garbageVolume = broker.volume;

  // console.log(garbageVolume);

  return res.json({ garbageVolume });
});

app.listen(PORT, function () {
  console.log(`Server running on http://localhost:${PORT}`);
});

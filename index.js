// index.js
// where your node app starts

// init project
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/", (req, res) => {
  const objectDate = new Date();
  res.json({ unix: objectDate.valueOf(), utc: objectDate.toUTCString() });
});

app.get("/api/:date", function (req, res) {
  const date = req.params.date;
  if (/\d{5,}/.test(date)) {
    const isNumberDate = parseInt(date);
    res.json({
      unix: parseInt(date),
      utc: new Date(isNumberDate).toUTCString(),
    });
  } else {
    const objectDate = new Date(date);
    if (objectDate.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: objectDate.valueOf(), utc: objectDate.toUTCString() });
    }
  }
});

// listen for requests :)
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});

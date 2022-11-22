const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
      path += "about.html";
      break;
    default:
      path += "404.html";
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      res.end("Error: " + err.message);
    } else {
      res.end(data);
    }
  });
});

server.listen(1988, () => {
  console.log("Server is started and listening on port : 1988...");
});

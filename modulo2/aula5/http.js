import http from "http";

http
  .createServer((req, res) => {
    res.write("Hello world");
    res.statusCode(200);
    res.end();
  })
  .listen(3000);

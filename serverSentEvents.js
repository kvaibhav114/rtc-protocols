const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/events") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    const sendEvent = setInterval(() => {
      const data = `data: ${JSON.stringify({ message: "Event at " + new Date().toISOString() })}\n\n`;
      res.write(data);
    }, 3000);
    req.on("close", () => {
      clearInterval(sendEvent);
      res.end();
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

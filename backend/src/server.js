import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello Babel!");
  });
  
  app.listen(port, () => {
    console.log(`Server on "${port}" PortNum`);
});
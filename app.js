import express from "express";
const app = express();

app.get((req, res) => {
  res.status(404).json({
    success: false,
    message: "Url Not Found",
    data: null,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000);

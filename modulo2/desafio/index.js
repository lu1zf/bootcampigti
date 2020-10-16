﻿import express from "express";
import gradesRouter from "./router/grades.js";
import { promises as fs } from "fs";

global.filename = "grades.json";

const app = express();

app.use(express.json());

app.use("/grades", gradesRouter);

app.listen(3000, () => {
  console.log("servidor rodando");
});

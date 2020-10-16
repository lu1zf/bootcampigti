import express from "express";
import accountsRouter from "./routes/accounts.js";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

global.filename = "accounts.json";

const app = express();
app.use(express.json());

app.use("/account", accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.filename);
    console.log("Servidor Iniciado");
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.filename, JSON.stringify(initialJson))
      .then(() => {
        console.log("Servidor Iniciado e JSON criado");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

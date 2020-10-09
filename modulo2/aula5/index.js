import { promises as fs } from "fs";

async function manipulateFile() {
  try {
    await fs.writeFile("teste.txt", "bla bla bla bla");
    await fs.appendFile("teste.txt", " append com async/await");
    const data = await fs.readFile("teste.txt", "utf-8");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function manipulateFileJson() {
  try {
    const arrayCarros = ["gol", "palio", "uno"];
    const obj = {
      carros: arrayCarros,
    };

    await fs.writeFile("teste.json", JSON.stringify(obj));

    const data = JSON.parse(await fs.readFile("teste.json"));
    data.carros.push("Sandero");
    console.log(data);

    await fs.writeFile("teste.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

manipulateFile();
manipulateFileJson();
/**
 * utilizando promises -> callback hell
 * 
 import { promises as fs } from "fs";
 
 fs.writeFile("teste.txt", "bla bla bla bla")
  .then(() => {
    fs.appendFile("teste.txt", " append com promises")
    .then(() => {
      fs.readFile("teste.txt", "utf-8")
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  })
  .catch((err) => {
    console.log(err);
  });
*/

/**
 * 
 * Utilizando forma assíncrona com callbacks
 * 
import fs from "fs";

fs.writeFile("teste.txt", "aaaaaaaaa", (err) => {
  // fs.writeFile substitui o conteúdo anterior, caso exista
  if (err) {
    console.log(err);
  } else {
    fs.appendFile("teste.txt", " teste appendfile", (err) => {
      if (err) console.log(err);
      else {
        fs.readFile("teste.txt", "utf-8", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
});
*/

// forma síncrona - não recomendada
// try {
//   console.log("1");
//   fs.writeFileSync("teste.txt", "bla bla bla");
//   console.log("2");
//   const data = fs.readFileSync("teste.txt", "utf-8");
//   console.log(data);
//   console.log("3");
// } catch (err) {
//   console.log(err);
// }

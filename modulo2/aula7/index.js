import express from "express";

const app = express();

app.use(express.json()); // habilita trabalhar com json no corpo da requisição

app
  .get("/", (req, res) => {
    res.send("hello world!");
  })
  .post("/", (req, res) => {
    res.send("Hello world POST");
  })
  .all("/testall", (req, res) => {
    // all
    res.send(req.method);
  })

  // caracteres especiais

  .get("/teste?", (req, res) => {
    // A ultima letra pode ser omitida (test)
    res.send("teste?");
  })
  .get("/buzz+", (_req, res) => {
    // A ultima letra pode ser duplicada (buzzzzz)
    res.send("buzz+");
  })
  .get("/one*blue", (_req, res) => {
    // entre one e blue pode ter qualquer coisa, mas sempre vai apontar pra essa rota
    res.send("one*blue");
  })
  .post("/test(ing)?", (_req, res) => {
    // o (ing) vira opcional, porém só aceita /test ou /testing
    res.send("/test(ing)?");
  })

  // parâmetros

  // via rota
  .get("/testparam/:id", (req, res) => {
    res.send(req.params.id);
    // .params pega os parâmetros declarados na rota
  })

  .get("/testquery", (req, res) => {
    // .query pega os parâmetros enviados via query
    res.send(req.query);
  })

  // next
  .get(
    "/testmultiplehandlers",
    (req, res, next) => {
      console.log("callback 1");
      next();
    },
    (req, res) => {
      console.log("callback 2");
      res.end();
    }
  );

// Route
app
  .route("/testroute")
  .get((req, res) => {
    res.send("/testroute GET");
  })
  .post((req, res) => {
    res.send("/testroute POST");
  })
  .delete((req, res) => {
    res.send("/testroute DELETE");
  });
app.listen(3000);

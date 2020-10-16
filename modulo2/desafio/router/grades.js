import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    res.send(data);
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    let grade = req.body;

    const timestamp = new Date();
    grade = { id: data.nextId++, ...grade, timestamp };

    data.grades.push(grade);

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.send(grade);
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let grade = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const gradeIndex = data.grades.findIndex(
      (grade) => grade.id === parseInt(req.params.id)
    );
    if (gradeIndex === -1) {
      res.status(400).send({ error: "Grade does not exists" });
    }

    data.grades[gradeIndex] = {
      id: parseInt(req.params.id),
      ...grade,
      timestamp: new Date(),
    };

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.send(data.grades[gradeIndex]);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    data.grades = data.grades.filter(
      (grade) => grade.id !== parseInt(req.params.id)
    );

    await writeFile(global.filename, JSON.stringify(data, null, 2));
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/search/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const gradeIndex = data.grades.findIndex(
      (grade) => grade.id === parseInt(req.params.id)
    );

    if (gradeIndex === -1) {
      res.status(400).send({ error: "Grade does not exists" });
    }

    res.send(data.grades[gradeIndex]);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// total grades
router.get("/total", async (req, res) => {
  try {
    let grade = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const totalGrades = data.grades.filter(
      (item) => item.student === grade.student && item.subject === grade.subject
    );

    const sum = totalGrades
      .map((item) => item.value)
      .reduce((acc, curr) => acc + curr);

    res.send({ total: sum });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// average grades
router.get("/average", async (req, res) => {
  try {
    let grade = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const filteredGrades = data.grades.filter(
      (item) => item.subject === grade.subject && item.type === grade.type
    );

    let average = filteredGrades
      .map((item) => item.value)
      .reduce((acc, curr) => acc + curr);

    average = average / filteredGrades.length;

    res.send({ average_grades: average });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/best", async (req, res) => {
  try {
    let grade = req.body;
    const data = JSON.parse(await readFile(global.filename));
    let filteredGrades = data.grades.filter(
      (item) => item.subject === grade.subject && item.type === grade.type
    );

    filteredGrades = filteredGrades.sort(sortByValue).slice(0, 3);

    res.send(filteredGrades);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

function sortByValue(a, b) {
  return a.value > b.value ? -1 : 1;
}

export default router;

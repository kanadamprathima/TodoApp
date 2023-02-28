import { PrismaClient } from "@prisma/client";
import express from "express";
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const PORT = 3000;
// async function main() {
//   const todo = await prisma.todo.create({
//     data: { title: "sally", description: "do this task", done: true },
//   });
//   console.log("name is", todo);
// }
// main()
//   .catch((e) => {
//     console.log(e.message);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
// GET /todos
// http ://localhost:3000/todos
app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});
//post tasks
// http :3000/todos title='prathima' description='learn prisma' done='true'

app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  const todo = await prisma.todo.create({
    data: { title, description },
  });
  res.json(todo);
});
// PUT /todos/:id
// http PUT :3000/todos/6 title='mybooks'
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, done } = req.body;
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { title, description, done },
  });
  res.json(todo);
});
//DELETE /todos/:id
//http DELETE :3000/todos/6
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.delete({
    where: { id: Number(id) },
  });
  res.json(todo);
});
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

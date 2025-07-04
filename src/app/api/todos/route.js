
import { connectDB } from "../../../lib/mongodb";
import Todo from "../../../models/Todo";

// POST: Add a new todo
export async function POST(req) {
  const { task } = await req.json();

  if (!task) {
    return new Response(JSON.stringify({ error: "Task is required" }), {
      status: 400,
    });
  }

  await connectDB();
  const newTodo = await Todo.create({ task, done: false });

  return new Response(JSON.stringify(newTodo), { status: 201 });
}

// GET: Get all todos
export async function GET() {
  await connectDB();
  const todos = await Todo.find();
  return new Response(JSON.stringify(todos), { status: 200 });
}

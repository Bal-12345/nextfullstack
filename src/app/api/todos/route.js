import { connectDB } from "../../lib/mongodb";
import Todo from "../../models/Todo";


export async function GET() {
  await connectDB();
  const todos = await Todo.find();
  return Response.json(todos);
}

export async function POST(req) {
  const { task } = await req.json();
  await connectDB();
  const newTodo = await Todo.create({ task });
  return Response.json(newTodo);
}

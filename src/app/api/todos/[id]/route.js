

import { connectDB } from "../../../../lib/mongodb";
import Todo from "../../../../models/Todo";

export async function DELETE(req, contextPromise) {
  const { params } = await contextPromise;
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing ID" }), { status: 400 });
  }

  await connectDB();
  await Todo.findByIdAndDelete(id);

  return new Response(JSON.stringify({ message: "Todo deleted" }), { status: 200 });
}

import {sql} from "@vercel/postgres"

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default async function Home() {
  let data = await sql`SELECT * FROM todos`
  const {rows: todos} = data
  return (
    <div className="h-screen w-full bg-white/80 px-3 pt-1 flex">
      <Sidebar />
      <main className="w-full h-full">
        <Navbar />
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button id={todo.id}>{todo.text}</button>
          </li>
        ))}
      </main>
    </div>
  );
}

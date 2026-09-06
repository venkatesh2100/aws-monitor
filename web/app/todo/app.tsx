
import { useEffect, useState } from "react";
import "../app.css";

interface Todo {
  id: number;
  title: string;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");

  const loadTodos = async (): Promise<void> => {
    const res = await fetch("http://localhost:8080/todos");
    const data: Todo[] = await res.json();

    setTodos(data);
  };

  const addTodo = async (): Promise<void> => {
    if (!title.trim()) return;

    await fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="bg-black text-white flex flex-col items-center">
      <h1>TODO APP</h1>

      <input
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        placeholder="Enter a todo"
      />

      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.id} - {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

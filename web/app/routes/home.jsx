// import type { Route } from "./+types/home";
// import { Welcome } from "../welcome/welcome";
import TodoApp from "../todo/app";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <TodoApp/>
}

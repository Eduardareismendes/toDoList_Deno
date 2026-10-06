import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { listarTarefas } from "../src/tarefas.js";
import TodoList from "../islands/TodoList.tsx";

export default define.page(async function Home() {
  const tarefas = await listarTarefas();

  return (
    <div>
      <Head>
        <title>Minhas tarefas</title>

        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Zen+Antique+Soft&display=swap');
        </style>
      </Head>

      <h1>Minhas tarefas</h1>

      <TodoList tarefas={tarefas} />
    </div>
  );
});

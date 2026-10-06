import { adicionarTarefa, listarTarefas } from "../../src/tarefas.js";

export default async function handler(ctx: { req: Request }) {
  if (ctx.req.method === "GET") {
    const tarefas = await listarTarefas();

    return Response.json(tarefas);
  }

  if (ctx.req.method === "POST") {
    const dados = await ctx.req.json();

    const novaTarefa = await adicionarTarefa(
      dados.titulo,
      dados.dataConclusao,
    );

    return Response.json(novaTarefa, {
      status: 201,
    });
  }

  return new Response("Método não permitido", {
    status: 405,
  });
}

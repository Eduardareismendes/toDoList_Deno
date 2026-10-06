import { editarTarefa, excluirTarefa } from "../../../../src/tarefas.js";

export default async function handler(
  ctx: { req: Request; params: { id: string } },
) {
  if (ctx.req.method === "PUT") {
    const id = Number(ctx.params.id);

    const dados = await ctx.req.json();

    const tarefa = await editarTarefa(id, dados.titulo, dados.dataConclusao);

    if (!tarefa) {
      return new Response("Tarefa não encontrada", {
        status: 404,
      });
    }

    return Response.json(tarefa);
  }

  if (ctx.req.method === "DELETE") {
    const id = Number(ctx.params.id);

    const excluida = await excluirTarefa(id);

    if (!excluida) {
      return new Response("Tarefa não encontrada", {
        status: 404,
      });
    }

    return new Response("Tarefa excluída com sucesso", {
      status: 200,
    });
  }

  return new Response("Método não permitido", {
    status: 405,
  });
}

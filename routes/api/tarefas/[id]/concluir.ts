import { concluirTarefa } from "../../../../src/tarefas.js";

export default async function handler(
  ctx: { req: Request; params: { id: string } },
) {
  if (ctx.req.method === "PUT") {
    const id = Number(ctx.params.id);

    const dados = await ctx.req.json();

    const tarefa = await concluirTarefa(id, dados.concluida);

    if (!tarefa) {
      return new Response("Tarefa não encontrada", {
        status: 404,
      });
    }

    return Response.json(tarefa);
  }

  return new Response("Método não permitido", {
    status: 405,
  });
}

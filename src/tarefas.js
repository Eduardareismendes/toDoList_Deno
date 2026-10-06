const caminhoArquivo = "./data/tarefas.json";

async function carregarTarefas() {
  const conteudo = await Deno.readTextFile(caminhoArquivo);
  return JSON.parse(conteudo); // transforma em objetos js manipulaveis
}

async function salvarTarefas(tarefas) {
  const conteudo = JSON.stringify(tarefas, null, 4);
  await Deno.writeTextFile(caminhoArquivo, conteudo);
}

async function adicionarTarefa(titulo, dataConclusao) {
  const tarefas = await carregarTarefas();

  const novaTarefa = {
    id: tarefas.length > 0
      ? Math.max(...tarefas.map((tarefa) => tarefa.id)) + 1
      : 1,
    titulo: titulo,
    concluida: false,
    dataConclusao: dataConclusao,
  };

  tarefas.push(novaTarefa);

  await salvarTarefas(tarefas);

  return novaTarefa;
}

async function listarTarefas() {
  return await carregarTarefas();
}

async function concluirTarefa(id, concluida) {
  const tarefas = await carregarTarefas();

  const tarefa = tarefas.find((tarefa) => tarefa.id === id);

  if (!tarefa) {
    return null;
  }

  tarefa.concluida = concluida;
  await salvarTarefas(tarefas);

  return tarefa;
}

async function editarTarefa(id, novoTitulo, novaData) {
  const tarefas = await carregarTarefas();

  const tarefa = tarefas.find((tarefa) => tarefa.id === id);

  if (!tarefa) {
    return null;
  }

  tarefa.titulo = novoTitulo;
  tarefa.dataConclusao = novaData;
  await salvarTarefas(tarefas);

  return tarefa;
}

async function excluirTarefa(id) {
  const tarefas = await carregarTarefas();

  const indice = tarefas.findIndex((tarefa) => tarefa.id === id);

  if (indice === -1) {
    return false;
  }

  tarefas.splice(indice, 1);
  await salvarTarefas(tarefas);

  return true;
}

export {
  adicionarTarefa,
  concluirTarefa,
  editarTarefa,
  excluirTarefa,
  listarTarefas,
};

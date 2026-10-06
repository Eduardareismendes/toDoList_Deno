import { useState } from "preact/hooks";

interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
  dataConclusao: string;
}

export default function TodoList({ tarefas = [] }: { tarefas: Tarefa[] }) {
  const [titulo, setTitulo] = useState("");
  const [dataConclusao, setDataConclusao] = useState("");
  const [listaTarefas, setListaTarefas] = useState<Tarefa[]>(tarefas);

  // para editar tarefa
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaData, setNovaData] = useState("");

  function formatarData(data: string) {
    if (!data) {
      return "";
    }

    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  async function adicionarTarefa() {
    const resposta = await fetch("/api/tarefas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: titulo,
        dataConclusao: dataConclusao,
      }),
    });

    const tarefa = await resposta.json();

    setTitulo("");
    setDataConclusao("");

    console.log(tarefa);
  }

  async function concluirTarefa(id: number, concluida: boolean) {
    const resposta = await fetch(`/api/tarefas/${id}/concluir`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        concluida: concluida,
      }),
    });

    const tarefaAtualizada = await resposta.json();

    setListaTarefas(
      listaTarefas.map((tarefa) =>
        tarefa.id === id ? tarefaAtualizada : tarefa
      ),
    );
  }

  async function editarTarefa(
    id: number,
    novoTitulo: string,
    novaData: string,
  ) {
    const resposta = await fetch(`/api/tarefas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: novoTitulo,
        dataConclusao: novaData,
      }),
    });

    const tarefaAtualizada = await resposta.json();

    setListaTarefas(
      listaTarefas.map((tarefa) =>
        tarefa.id === id ? tarefaAtualizada : tarefa
      ),
    );
  }

  async function excluirTarefa(id: number) {
    const resposta = await fetch(`/api/tarefas/${id}`, {
      method: "DELETE",
    });

    if (resposta.ok) {
      setListaTarefas(
        listaTarefas.filter((tarefa) => tarefa.id !== id),
      );
    }
  }

  return (
    <div class="todo-container">
      <div class="todo-form">
        <input
          type="text"
          value={titulo}
          onInput={(evento) => setTitulo(evento.currentTarget.value)}
          placeholder="Digite uma tarefa"
        />

        <input
          type="date"
          value={dataConclusao}
          onInput={(evento) => setDataConclusao(evento.currentTarget.value)}
        />

        <button type="button" onClick={adicionarTarefa}>
          Adicionar
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {[...listaTarefas]
          .sort((a, b) => Number(a.concluida) - Number(b.concluida))
          .map((tarefa) => (
            <li key={tarefa.id}>
              <input
                type="checkbox"
                class="todo-checkbox"
                checked={tarefa.concluida}
                onChange={(evento) =>
                  concluirTarefa(tarefa.id, evento.currentTarget.checked)}
              />

              {editandoId === tarefa.id
                ? (
                  <>
                    <input
                      type="text"
                      value={novoTitulo}
                      onInput={(evento) =>
                        setNovoTitulo(evento.currentTarget.value)}
                    />

                    <input
                      type="date"
                      value={novaData}
                      onInput={(evento) =>
                        setNovaData(evento.currentTarget.value)}
                    />
                  </>
                )
                : (
                  <div class="todo-info">
                    <span
                      style={{
                        textDecoration: tarefa.concluida
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {tarefa.titulo}
                    </span>

                    <small class="todo-date">
                      {formatarData(tarefa.dataConclusao)}
                    </small>
                  </div>
                )}

              {editandoId === tarefa.id
                ? (
                  <>
                    <button
                      type="button"
                      class="btn-salvar"
                      onClick={async () => {
                        if (!novoTitulo.trim()) {
                          return;
                        }

                        await editarTarefa(tarefa.id, novoTitulo, novaData);
                        setEditandoId(null);
                        setNovoTitulo("");
                        setNovaData("");
                      }}
                    >
                      Salvar
                    </button>

                    <button
                      type="button"
                      class="btn-cancelar"
                      onClick={() => {
                        setEditandoId(null);
                        setNovoTitulo("");
                      }}
                    >
                      Cancelar
                    </button>
                  </>
                )
                : (
                  <button
                    type="button"
                    class="btn-editar"
                    onClick={() => {
                      setEditandoId(tarefa.id);
                      setNovoTitulo(tarefa.titulo);
                      setNovaData(tarefa.dataConclusao);
                    }}
                  >
                    Editar
                  </button>
                )}

              <button
                type="button"
                class="btn-excluir"
                onClick={() => excluirTarefa(tarefa.id)}
              >
                Excluir
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

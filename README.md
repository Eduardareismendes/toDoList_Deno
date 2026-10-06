# Todo List — Deno + Fresh

Aplicação de lista de tarefas desenvolvida com **Deno**, **Fresh**,
**TypeScript** e **JavaScript**.

## Tecnologias

- Deno 2.9.7
- Fresh 2.3.3
- Preact
- Vite
- JSON

## Funcionalidades

- Adicionar tarefas
- Editar tarefas
- Concluir tarefas
- Excluir tarefas
- Definir data de conclusão
- Salvar tarefas em arquivo JSON

## Instalação

É necessário ter o **Deno** instalado. Usando o PowerShell para instalar
(Windows):

```bash
irm https://deno.land/install.ps1 | iex
```

Verifique a instalação:

```bash
deno --version
```

Clone o projeto e entre na pasta:

```bash
git clone URL_DO_REPOSITORIO
cd todo-deno
```

Não é necessário executar `npm install`, pois as dependências são gerenciadas
pelo Deno.

## Executar

Para iniciar o projeto:

```bash
deno task dev
```

Depois, acesse no navegador o endereço exibido pelo terminal.

## Testes e verificação

Para verificar a formatação, o lint e os tipos do projeto:

```bash
deno task check
```

O comando executa:

- `deno fmt --check`
- `deno lint`
- `deno check` Se todos os passos forem executados corretamente, o projeto está
  de acordo com as verificações configuradas.

Para gerar a versão de produção:

```bash
deno task build
```

Depois, a aplicação pode ser iniciada com:

```bash
deno task start
```

## Armazenamento

As tarefas são armazenadas no arquivo:

```text
data/tarefas.json
```

## Estrutura principal

```text
todo-deno/
├── data/
│   └── tarefas.json
├── islands/
│   └── TodoList.tsx
├── routes/
│   ├── index.tsx
│   └── api/
├── src/
│   └── tarefas.js
├── deno.json
└── vite.config.ts
```

## Objetivo

O projeto foi desenvolvido com finalidade acadêmica para demonstrar o uso do
Deno no desenvolvimento de uma aplicação web, explorando seus recursos de
execução, gerenciamento de tarefas, segurança, ferramentas de desenvolvimento e
integração com o Fresh.

## Autor

Eduarda dos Reis Mendes. Projeto desenvolvido para a disciplina de Tópicos em
Programação 3 — Ciência da Computação.

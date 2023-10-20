# geras-backend

Repositorio para armazenar o código backend do projeto Geras.

## Tecnologias utilizadas

- Typescript - 5.0.0
- Express - 4.18.2
- Nodejs - 18.18.2
- Bun - 1.0.0
- Prisma - 5.4.2
- Postgresql - 16.0
- Docker 23.0.3

</br>

Para instalar as dependências:

```bash
bun install
```

Para iniciar o banco de dados crie e preencha o arquivo .env usando o .env.example como base e rode o seguinte comando:

```bash
bun run start
```

Ou para iniciar o banco de dados em background:

```bash
bun run start:detach
```

Após o banco estiver criado e rodando execute o seguinte comando para rodar as "migrations" e criar as tabelas:

```bash
bun run migrate
```

Por fim rode o comando abaixo para iniciar o servidor:

```bash
bun run dev
```

Este projeto foi criado usando `bun init` na versão v1.0.0. [Bun](https://bun.sh) é um compilador JavaScript "all-in-one".

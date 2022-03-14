# API do BBB

# Introdução

A API do BBB possibilita que usuários do sistema possam votar para eliminar participantes do reality que estão no 'paredão'. Este documento explica como a API funciona, seu objetivo e como é possível se comunicar com ela.

# API feita em NodeJs usando banco de dados Postgres

A API do BBB foi feita em NodeJs, utilizando o gerenciador de pacote 'yarn'. Para rodar a API localmente, basta executar o comando 'yarn dev' que API será inicializada na porta localhost:3333. Além disso, é preciso subir o banco de dados através do docker, para isso, execute o comando 'docker-compose up -d'.

# Fazendo requisições

A API do BBB possui algumas rotas públicas, isto é, não é preciso que o usuário esteja autenticado para realizar requições, e outras onde é necessário que o usuário esteja logado. Abaixo, são descritas todas as rotas e seu funcionamento.

# Usuário

## Criar usuário

Para criar um usuário 'provider', isto é, um usuário que terá acesso à todos os endpoints da API, deve-se passar uma propriedade no objeto chamada provider, e seu valor sendo <b>true</b>. Para um usuário comum, que só poderá votar nos paredões, o provider deve ser <b>false<b>.

### Request:

POST / users

<b>Body:</b>

```node
{
  "name": "Wm Beatty,
  "email": "sDominique_Murray@yahoo.com,
  "password": "12345678",
  "provider": true
}
```

### Response:

```node
{
  "id": 5,
  "name": "Wm Beatty",
  "email": "Dominique_Murray@yahoo.com"
}
```

## Listar Usuários

Este endpoint listará todos os usuários cadastrados, somente os usuários com provider sendo <b>true</b> terão acesso à lista.

### Request:

GET / users

<b>Headers:</b>

```node
{
  "Authorization": "Bearer hash_token"
}
```

```
{
  "name": "seu nome
  "email": "seu@email.com
  "password": "12345678"
}
```

### Response:

```node
[
  {
    id: 1,
    name: "Andrea Rodriguez",
    email: "Tierra.Hackett@yahoo.com",
  },
  {
    id: 2,
    name: "Boyd Stroman",
    email: "Annetta34@yahoo.com",
  },
  {
    id: 3,
    name: "Ruben Brakus",
    email: "Adolf80@gmail.com",
  },
  {
    id: 4,
    name: "teste",
    email: "teste@teste.com",
  },
  {
    id: 5,
    name: "Wm Beatty",
    email: "Dominique_Murray@yahoo.com",
  },
];
```

# Paredão

## Votar em um paredão

Para votar em um paredão, o usuário precisará estar autenticado como 'provider' <b>true</b>.

### Request:

POST / votes

<b>Headers:</b>

```node
{
  "Authorization": "Bearer hash_token"
}
```

<b>Body:</b>

```node
{
  "house_guest_id": 3
}
```

### Response:

```node
{
  "ok": true
}
```

# Estatísticas de paredão

## Obter estatísticas de votação em um paredão

Para obter a quantidade de votos totais e a quantidade de votos por participante, o usuário precisará estar autenticado como 'provider' <b>true</b>.

### Request:

GET / eliminations/:id

<b>Headers:</b>

```node
{
  "Authorization": "Bearer hash_token"
}
```

### Response:

```node
{
  "id": 2,
  "date": "2022-03-23T00:00:00.000Z",
  "current": true,
  "total_votes": 98,
  "house_guests": [
    {
      "id": 3,
      "name": "Duncan",
      "votes": 46
    },
    {
      "id": 2,
      "name": "Rickey",
      "votes": 52
    }
  ]
}
```

# Erros

Abaixo estão listados alguns exemplos de erros que podem acontecer e as suas respectivas respostas:

### Autorização negada

O email ou senha estão incorretos ou o usuário não está autenticado, o status HTTP é 401 e o body é:

```node
{
    "error": "Not authorized"
}
```

### Recurso não encontrado

Algum recurso que foi buscado não foi encontrado, o status HTTP é 404 e o body é:

```node
{
    "error": "{Nome do Modelo} not found"
}
```

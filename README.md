# projet ramassage de dechets partie  (back-end)

## RUN DATABASE

install Docker

```zsh
docker compose up
```
### Troubleshoot

If your port 5432 are not free :
  - docker ps
  - docker stop <CONTAINER_ID>

Else if you have PostgresQL desktop, close him before run docker compose

## RUN SERVER

```sh
cd app
```

by default your database are empty when you run your server 

**For run in watch mode "nodemon"**

```zsh
npm run dev
```

**Else**

```zsh
npm start
```

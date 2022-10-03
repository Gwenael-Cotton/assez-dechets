# projet-06-ramassage-de-dechets-back

## RUN DATABASE

- install Docker
- if your port 5432 are not free :
  - docker ps
  - docker stop <CONTAINER_ID>

```zsh
docker compose up
```

## RUN SERVER

- cd app

**For run in watch mode "nodemon"**

```zsh
npm run develop
```

**Else**

```zsh
npm start
```

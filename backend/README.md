online shop backend. this use:
- [expressjs](https://expressjs.com)
- [prisma](https://prisma.io)

to run this, copy .env.example into .env, fill out all the
environment variable. and then

```
$ npm install
```

i use docker with mysql for dev database, if you have docker too, then

```
$ docker-compose up -d
```

after creating database, use prisma to migrate

```
$ npx prisma db push
```

and then, run the server

```
$ npm run dev
```
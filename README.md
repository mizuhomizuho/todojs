# TodoJs

[//]: # (npx create-expo-app@latest --template blank-typescript)
[//]: # (docker container exec -u root -it todojs_server bash)
[//]: # (docker run -e TZ=Europe/Moscow todojs_server)
[//]: # (npx prisma db push --force-reset)

## Technologies used:

- TypeScript
- React Native
- Expo
- Nginx
- Express
- MySQL

## Backend

### After building, you will get:

- Ubuntu
- Nginx
- MySQL
- SSH

### Links

```shell
# http://localhost:881/
# http://localhost:881/static/ - for static files
ssh -p 882 root@127.0.0.1 # password: 123
ssh -p 882 ubuntu@127.0.0.1 # password: 123
```

### Build

```shell
docker build -t todojs_server ./backend/image
make build
docker container exec -u root -it todojs_server bash
npx prisma db push
```

```shell
make dev
```

### Rebuild

```shell
make rebuild
```

```shell
make del
```

## Frontend

### Get started

1. Install dependencies

   ```bash
   cd todojs
   yarn install
   ```

2. Start

   ```bash
   make start
   ```

### Screenshots

<img src="https://github.com/mizuhomizuho/todojs/blob/master/screenshots/localhost_8081_.png" alt="">

<img src="https://github.com/mizuhomizuho/todojs/blob/master/screenshots/localhost_8081_(1).png" alt="">

<img src="https://github.com/mizuhomizuho/todojs/blob/master/screenshots/localhost_8081_(2).png" alt="">

<img src="https://github.com/mizuhomizuho/todojs/blob/master/screenshots/localhost_8081_(3).png" alt="">

### Movie

[![Watch the video](https://github.com/mizuhomizuho/todojs/blob/master/screenshots/movie/Vp2cE.png)](https://todojs-movie.surge.sh/888.mp4)




# TodoJs

[//]: # (npx create-expo-app@latest --template blank-typescript)

## Backend

To track file changes on Windows, the project needs to be run on WSL.

### After building, you will get:

- Ubuntu
- Nginx
- Express
- MySQL
- SSH

### Links:

```shell
# http://localhost:881/
# http://localhost:881/static/ - for static files
ssh -p 882 root@127.0.0.1 # password: 123
ssh -p 882 ubuntu@127.0.0.1 # password: 123
```

### Build:

```shell
sudo docker build -t todojs_server ./backend/image
```

```shell
sudo make build
```

```shell
sudo make del
```

```shell
sudo make rebuild
```

---

## Frontend

### Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```


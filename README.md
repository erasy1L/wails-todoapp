# Todo desktop app

This is repository for todo desktop app.
![tasks](https://i.imgur.com/uijx20Q.png)

## Used libraries

-  [Wails](https://github.com/wailsapp/wails) - main framework

-  [React](https://github.com/facebook/react) - main frontend framework

-  [Pocketbase](https://github.com/pocketbase/pocketbase) - embedded database (SQLite) with dashboard UI

## Usage

Cd into repository folder

### Start in development mode

```
wails dev
```

### Build manually
```
wails build
```

Open http://127.0.0.1:8080/_/ for [pocketbase](https://github.com/pocketbase/pocketbase) dashboard UI

Login with test credentials:
- test@example.com
- 1234567890

![pocketbase_dashboard](https://i.imgur.com/MQJsi8q.png)

## Features

### Adding tasks

![adding tasks](https://i.imgur.com/c1siGHi.png)

### Editing tasks, deleting and changing status(todo/done) of task with checkbox

![editing and changing status](https://i.imgur.com/W32MosH.png)

### Filtering tasks
![todo tasks](https://i.imgur.com/LJOeF88.png)

![done tasks](https://i.imgur.com/jBZ6bfo.png)

### Changing priority
![changing priority](https://i.imgur.com/dhoF9Oe.png)
